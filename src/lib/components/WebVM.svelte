<script>
	import { onMount } from 'svelte';
	import Nav from '$lib/components/NavBar.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import '$lib/global.css';
	import '@xterm/xterm/css/xterm.css'
	import '@fortawesome/fontawesome-free/css/all.min.css'
	import { networkInterface, startLogin } from '$lib/networks.js'
	import { cpuActivity, diskActivity, cpuPercentage, diskLatency } from '$lib/activities.js'
	import { introMessage, errorMessage, unexpectedErrorMessage } from '$lib/messages.js'

	/**
	 * @type {{ printIntro: any; diskImageType: any; diskImageUrl: string; cmd: any; args: any; opts: any; needsDisplay: any; } | null}
	 */
	 export let configObj = null;
	/**
	 * @type {((arg0: number) => void) | null}
	 */
	 export let processCallback = null;
	/**
	 * @type {null}
	 */
	 export let cacheId = null;
	/**
	 * @type {any[]}
	 */
	 export let cpuActivityEvents = [];
	/**
	 * @type {any[]}
	 */
	 export let diskLatencies = [];
	export let activityEventsInterval = 0;

	/**
	 * @type {{ write: (arg0: string | Uint8Array) => void; options: { fontSize: number; }; loadAddon: (arg0: any) => void; open: (arg0: HTMLElement | null) => void; scrollToTop: () => void; focus: () => void; onData: (arg0: (str: any) => void) => void; scrollToBottom: () => void; cols: any; rows: any; } | null}
	 */
	var term = null;
	/**
	 * @type {{ setKmsCanvas: (arg0: any, arg1: number, arg2: number) => void; registerCallback: (arg0: string, arg1: { (state: any): void; (state: any): void; (latency: any): void; (): void; }) => void; setCustomConsole: (arg0: (buf: any, vt: any) => void, arg1: any, arg2: any) => any; setActivateConsole: (arg0: (vt: any) => void) => void; run: (arg0: any, arg1: any, arg2: any) => any; networkLogin: () => any; } | null}
	 */
	var cx = null;
	/**
	 * @type {{ fit: () => void; } | null}
	 */
	var fitAddon = null;
	/**
	 * @type {((arg0: any) => void) | null}
	 */
	var cxReadFunc = null;
	/**
	 * @type {{ reset: () => any; } | null}
	 */
	var blockCache = null;
	var processCount = 0;
	var curVT = 0;
	/**
	 * @param {Iterable<number>} buf
	 * @param {number} vt
	 */
	function writeData(buf, vt)
	{
		if(vt != 1)
			return;
		// @ts-ignore
		term.write(new Uint8Array(buf));
	}
	/**
	 * @param {string} str
	 */
	function readData(str)
	{
		if(cxReadFunc == null)
			return;
		for(var i=0;i<str.length;i++)
			cxReadFunc(str.charCodeAt(i));
	}
	/**
	 * @param {string | any[]} msg
	 */
	function printMessage(msg)
	{
		for(var i=0;i<msg.length;i++)
			// @ts-ignore
			term.write(msg[i] + "\n");
	}
	/**
	 * @param {any[]} list
	 * @param {number} curTime
	 * @param {number} limitTime
	 */
	function expireEvents(list, curTime, limitTime)
	{
		while(list.length > 1)
		{
			if(list[1].t < limitTime)
			{
				list.shift();
			}
			else
			{
				break;
			}
		}
	}
	function cleanupEvents()
	{
		var curTime = Date.now();
		var limitTime = curTime - 10000;
		expireEvents(cpuActivityEvents, curTime, limitTime);
		computeCpuActivity(curTime, limitTime);
		if(cpuActivityEvents.length == 0)
		{
			clearInterval(activityEventsInterval);
			activityEventsInterval = 0;
		}
	}
	/**
	 * @param {number} curTime
	 * @param {number} limitTime
	 */
	function computeCpuActivity(curTime, limitTime)
	{
		var totalActiveTime = 0;
		var lastActiveTime = limitTime;
		var lastWasActive = false;
		for(var i=0;i<cpuActivityEvents.length;i++)
		{
			var e = cpuActivityEvents[i];
			// NOTE: The first event could be before the limit,
			//       we need at least one event to correctly mark
			//       active time when there is long time under load
			var eTime = e.t;
			if(eTime < limitTime)
				eTime = limitTime;
			if(e.state == "ready")
			{
				// Inactive state, add the time frome lastActiveTime
				totalActiveTime += (eTime - lastActiveTime);
				lastWasActive = false;
			}
			else
			{
				// Active state
				lastActiveTime = eTime;
				lastWasActive = true;
			}
		}
		// Add the last interval if needed
		if(lastWasActive)
		{
			totalActiveTime += (curTime - lastActiveTime);
		}
		cpuPercentage.set(Math.ceil((totalActiveTime / 10000) * 100));
	}
	/**
	 * @param {string} state
	 */
	function hddCallback(state)
	{
		diskActivity.set(state != "ready");
	}
	/**
	 * @param {any} latency
	 */
	function latencyCallback(latency)
	{
		diskLatencies.push(latency);
		if(diskLatencies.length > 30)
			diskLatencies.shift();
		// Average the latency over at most 30 blocks
		var total = 0;
		for(var i=0;i<diskLatencies.length;i++)
			total += diskLatencies[i];
		var avg = total / diskLatencies.length;
		diskLatency.set(Math.ceil(avg));
	}
	/**
	 * @param {string} state
	 */
	function cpuCallback(state)
	{
		cpuActivity.set(state != "ready");
		var curTime = Date.now();
		var limitTime = curTime - 10000;
		expireEvents(cpuActivityEvents, curTime, limitTime);
		cpuActivityEvents.push({t: curTime, state: state});
		computeCpuActivity(curTime, limitTime);
		// Start an interval timer to cleanup old samples when no further activity is received
		if(activityEventsInterval != 0)
			clearInterval(activityEventsInterval);
		// @ts-ignore
		activityEventsInterval = setInterval(cleanupEvents, 2000);
	}
	function computeXTermFontSize()
	{
		return parseInt(getComputedStyle(document.body).fontSize);
	}
	/**
	 * @param {HTMLElement} display
	 */
	function setScreenSize(display)
	{
		var mult = 1.0;
		var displayWidth = display.offsetWidth;
		var displayHeight = display.offsetHeight;
		var minWidth = 1024;
		var minHeight = 768;
		if(displayWidth < minWidth)
			mult = minWidth / displayWidth;
		if(displayHeight < minHeight)
			mult = Math.max(mult, minHeight / displayHeight);
		cx.setKmsCanvas(display, displayWidth * mult, displayHeight * mult);
	}
	var curInnerWidth = 0;
	var curInnerHeight = 0;
	function handleResize()
	{
		// Avoid spurious resize events caused by the soft keyboard
		if(curInnerWidth == window.innerWidth && curInnerHeight == window.innerHeight)
			return;
		curInnerWidth = window.innerWidth;
		curInnerHeight = window.innerHeight;
		term.options.fontSize = computeXTermFontSize();
		fitAddon.fit();
		const display = document.getElementById("display");
		if(display)
			setScreenSize(display);
	}
	async function initTerminal()
	{
		const { Terminal } = await import('@xterm/xterm');
		const { FitAddon } = await import('@xterm/addon-fit');
		const { WebLinksAddon } = await import('@xterm/addon-web-links');
		term = new Terminal({cursorBlink:true, convertEol:true, fontFamily:"monospace", fontWeight: 400, fontWeightBold: 700, fontSize: computeXTermFontSize()});
		fitAddon = new FitAddon();
		term.loadAddon(fitAddon);
		var linkAddon = new WebLinksAddon();
		term.loadAddon(linkAddon);
		const consoleDiv = document.getElementById("console");
		term.open(consoleDiv);
		term.scrollToTop();
		fitAddon.fit();
		window.addEventListener("resize", handleResize);
		term.focus();
		term.onData(readData);
		// Avoid undesired default DnD handling
		function preventDefaults (e) {
			e.preventDefault()
			e.stopPropagation()
		}
		// @ts-ignore
		consoleDiv.addEventListener("dragover", preventDefaults, false);
		// @ts-ignore
		// @ts-ignore
		consoleDiv.addEventListener("dragenter", preventDefaults, false);
		// @ts-ignore
		consoleDiv.addEventListener("dragleave", preventDefaults, false);
		// @ts-ignore
		consoleDiv.addEventListener("drop", preventDefaults, false);
		curInnerWidth = window.innerWidth;
		curInnerHeight = window.innerHeight;
		// @ts-ignore
		if(configObj.printIntro)
			printMessage(introMessage);
		try
		{
			await initCheerpX();
		}
		catch(e)
		{
			printMessage(unexpectedErrorMessage);
			printMessage([e.toString()]);
			return;
		}
	}
	function handleActivateConsole(vt)
	{
		if(curVT == vt)
			return;
		curVT = vt;
		if(vt != 7)
			return;
		// Raise the display to the foreground
		const display = document.getElementById("display");
		// @ts-ignore
		display.parentElement.style.zIndex = 5;
		// @ts-ignore
		plausible("Display activated");
	}
	function handleProcessCreated()
	{
		processCount++;
		if(processCallback)
			processCallback(processCount);
	}
	async function initCheerpX()
	{
		const CheerpX = await import('@leaningtech/cheerpx');
		var blockDevice = null;
		switch(configObj.diskImageType)
		{
			case "cloud":
				try
				{
					blockDevice = await CheerpX.CloudDevice.create(configObj.diskImageUrl);
				}
				catch(e)
				{
					// Report the failure and try again with plain HTTP
					var wssProtocol = "wss:";
					if(configObj.diskImageUrl.startsWith(wssProtocol))
					{
						// WebSocket protocol failed, try agin using plain HTTP
						plausible("WS Disk failure");
						blockDevice = await CheerpX.CloudDevice.create("https:" + configObj.diskImageUrl.substr(wssProtocol.length));
					}
					else
					{
						// No other recovery option
						throw e;
					}
				}
				break;
			case "bytes":
				blockDevice = await CheerpX.HttpBytesDevice.create(configObj.diskImageUrl);
				break;
			case "github":
				blockDevice = await CheerpX.GitHubDevice.create(configObj.diskImageUrl);
				break;
			default:
				throw new Error("Unrecognized device type");
		}
		blockCache = await CheerpX.IDBDevice.create(cacheId);
		var overlayDevice = await CheerpX.OverlayDevice.create(blockDevice, blockCache);
		var webDevice = await CheerpX.WebDevice.create("");
		var documentsDevice = await CheerpX.WebDevice.create("documents");
		var dataDevice = await CheerpX.DataDevice.create();
		var mountPoints = [
			// The root filesystem, as an Ext2 image
			{type:"ext2", dev:overlayDevice, path:"/"},
			// Access to files on the Web server, relative to the current page
			{type:"dir", dev:webDevice, path:"/web"},
			// Access to read-only data coming from JavaScript
			{type:"dir", dev:dataDevice, path:"/data"},
			// Automatically created device files
			{type:"devs", path:"/dev"},
			// Pseudo-terminals
			{type:"devpts", path:"/dev/pts"},
			// The Linux 'proc' filesystem which provides information about running processes
			{type:"proc", path:"/proc"},
			// Convenient access to sample documents in the user directory
			{type:"dir", dev:documentsDevice, path:"/home/user/documents"}
		];
		try
		{
			cx = await CheerpX.Linux.create({mounts: mountPoints, networkInterface: networkInterface});
		}
		catch(e)
		{
			printMessage(errorMessage);
			printMessage([e.toString()]);
			return;
		}
		cx.registerCallback("cpuActivity", cpuCallback);
		cx.registerCallback("diskActivity", hddCallback);
		cx.registerCallback("diskLatency", latencyCallback);
		cx.registerCallback("processCreated", handleProcessCreated);
		term.scrollToBottom();
		cxReadFunc = cx.setCustomConsole(writeData, term.cols, term.rows);
		const display = document.getElementById("display");
		if(display)
		{
			setScreenSize(display);
			cx.setActivateConsole(handleActivateConsole);
		}
		// Run the command in a loop, in case the user exits
		while (true)
		{
			await cx.run(configObj.cmd, configObj.args, configObj.opts);
		}
	}
	onMount(initTerminal);
	async function handleConnect()
	{
		const w = window.open("login.html", "_blank");
		await cx.networkLogin();
		w.location.href = await startLogin();
	}
	async function handleReset()
	{
		// Be robust before initialization
		if(blockCache == null)
			return;
		await blockCache.reset();
		location.reload();
	}
</script>

<main class="relative w-full h-full">
	<Nav />
	<div class="absolute top-10 bottom-0 left-0 right-0">
		<SideBar on:connect={handleConnect} on:reset={handleReset}>
			<slot></slot>
		</SideBar>
		{#if configObj.needsDisplay}
			<div class="absolute top-0 bottom-0 left-14 right-0">
				<canvas class="w-full h-full cursor-none" id="display"></canvas>
			</div>
		{/if}
		<div class="absolute top-0 bottom-0 left-14 right-0 p-1 scrollbar" id="console">
		</div>
	</div>
</main>

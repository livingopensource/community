import { writable } from 'svelte/store';
import { browser } from '$app/environment'

let authKey = undefined;
let controlUrl = undefined;
if(browser)
{
	let params = new URLSearchParams("?"+window.location.hash.substr(1));
	authKey = params.get("authKey") || undefined;
	controlUrl = params.get("controlUrl") || undefined;
}
let dashboardUrl = controlUrl ? null : "https://login.tailscale.com/admin/machines";
/**
 * @type {((value: any) => void) | null}
 */
let resolveLogin = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let loginPromise = new Promise((f,r) => {
	resolveLogin = f;
});
let connectionState = writable("DISCONNECTED");
let exitNode = writable(false);

/**
 * @param {any} url
 */
function loginUrlCb(url)
{
	connectionState.set("LOGINREADY");
	if (resolveLogin) {
		resolveLogin(url);
	}
}

/**
 * @param {any} state
 */
function stateUpdateCb(state)
{
	switch(state)
	{
		case 6 /*Running*/:
		{
			connectionState.set("CONNECTED");
			break;
		}
	}
}

/**
 * @param {{ self: { addresses: null[]; }; peers: string | any[]; }} map
 */
function netmapUpdateCb(map)
{
	networkData.currentIp = map.self.addresses[0];
	var exitNodeFound = false;
	for(var i=0;map.peers.length;i++)
	{
		if(map.peers[i].exitNode)
		{
			exitNodeFound = true;
			break;
		}
	}
	if(exitNodeFound)
	{
		exitNode.set(true);
	}
}

export async function startLogin()
{
	connectionState.set("LOGINSTARTING");
	const url = await loginPromise;
	networkData.loginUrl = url;
	return url;
}

export const networkInterface = { authKey: authKey, controlUrl: controlUrl, loginUrlCb: loginUrlCb, stateUpdateCb: stateUpdateCb, netmapUpdateCb: netmapUpdateCb };

export const networkData = { currentIp: null, connectionState: connectionState, exitNode: exitNode, loginUrl: null, dashboardUrl: dashboardUrl }

<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    export let data;

    function startStream() {
        const domain = `${data.streamURL}`;
        const options = {
            roomName: `${$page.params.name}`,
            //width: 700,
            height: 700,
            parentNode: document.querySelector('#meet'),
            lang: 'en',
            interfaceConfigOverwrite: {
                SHOW_JITSI_WATERMARK: false,
            }
        };
        // @ts-ignore
        const api = new JitsiMeetExternalAPI(domain, options);
        api.executeCommand('toggleAudio', [])
        api.executeCommand('toggleVideo', [])
        api.executeCommand('displayName', "AK")
        api.on('readyToClose', (/** @type {any} */ evt) => {
          window.history.go(-1)
        })
        
    }

    onMount(() => {
        startStream();
    })
</script>

<svelte:head>
  <title> LOSF Conference {$page.params.name} Stream</title>
  <script src="https://{data.streamURL}/external_api.js"></script>
</svelte:head>

<h1  class="text-xl text-gray-900 dark:text-white">{$page.params.name} Stream</h1>

<div>
    <div id="meet" class="grid content-place-center">
    </div>
</div>
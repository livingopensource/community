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
            configOverwrite: {
                enableWelcomePage: false,
                disableDeepLinking: true, // Disables the mobile app prompt
                mobileAppPromo: false, // Disables the mobile app promotion banner,
                welcomePage: {
                    disabled: true,
                    customUrl: '/conference'
                }
            },
            interfaceConfigOverwrite: {
                // Disables the invite button in the toolbar
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'desktop', 'fullscreen', 'fodeviceselection', 'hangup', 'chat',
                    'recording', 'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'tileview', 'download', 'help'
                ],
                SHOW_JITSI_WATERMARK: false, // Removes the Jitsi logo watermark
                SHOW_WATERMARK_FOR_GUESTS: false, // Ensures no watermark for guests
                SHOW_BRAND_WATERMARK: false, // Removes brand watermark
                BRAND_WATERMARK_LINK: '', // Removes the click action from the watermark
            },
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
  <title> {$page.params.name} Stream |  | LOSF Community</title>
  <script src="https://{data.streamURL}/external_api.js"></script>
</svelte:head>

<h1  class="text-xl text-gray-900 dark:text-white">{$page.params.name} Stream</h1>

<div>
    <div id="meet" class="grid content-place-center">
    </div>
</div>
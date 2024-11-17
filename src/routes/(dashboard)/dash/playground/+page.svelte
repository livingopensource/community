<script>
    import WebVM from '$lib/components/WebVM.svelte';
    // @ts-ignore
    import * as configObj from '/config_terminal'
    /**
	 * @param {number} processCount
	 */
    function handleProcessCreated(processCount)
    {
    	// Log the first 5 processes, to get an idea of the level of interaction from the public
    	if(processCount <= 5)
    	{
    		// @ts-ignore
    		plausible(`Process started: ${processCount}`);
    	}
    }
</script>

<svelte:head>
  <script src="/serviceWorker.js"></script>
  <title> LOSF Conference | Dashboard Meet Ups</title>
</svelte:head>

<div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0 h-full">
        <h1 class="mx-10 p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
          Playground (Experimental)
        </h1>
        <WebVM configObj={configObj} processCallback={handleProcessCreated} cacheId="blocks_terminal" />
    </div>
</div>
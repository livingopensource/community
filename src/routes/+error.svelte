<script>
	import { page } from '$app/stores';
    import { Button } from 'flowbite-svelte';
</script>

<div class="flex-grow">
    <div class="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0">
        <p class="mt-15 mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
            Page {$page.error?.message}
        </p>
		<div class="block md:max-w-lg">
			{#if $page.status == 404}
                <enhanced:img src="/src/lib/assets/images/404.svg" alt="error" />
            {:else}
                <enhanced:img src="/src/lib/assets/images/500.svg" alt="error" />
            {/if}
		</div>
		<div class="text-center xl:max-w-4x">
			<h1 class="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
				{$page.status} Error
			</h1>
			<Button onclick={() => window.history.go(-1)}>
				Go Back
			</Button>
		</div>
	</div>
</div>
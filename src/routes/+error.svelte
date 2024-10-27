<script>
	import '../app.css';
	import { page } from '$app/stores';
    import { Button, Footer, FooterBrand, FooterLinkGroup, FooterLink, FooterCopyright } from 'flowbite-svelte';
	import logoImg from '$lib/assets/images/LOSF Orange.png';
</script>

<svelte:head>
  <title> Error {$page.status} | LOSF Community</title>
</svelte:head>

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

<Footer footerType="logo" class="align-bottom">
	<div class="sm:flex sm:items-center sm:justify-between">
	<FooterBrand href="https://livingopensource.org" target="_blank" src={logoImg} alt="Logo" name="Living Open Source Foundation" spanClass="wrap-text dark:text-white" />
	  <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
		<FooterLink href="https://livingopensource.org" target="_blank">Living Open Source Website</FooterLink>
		<FooterLink href="https://livingopensource.org/contact-us/" target="_blank">Contact</FooterLink>
	  </FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<FooterCopyright href="https://livingopensource.org" target="_blank" by="Living Open Source Foundation" year={new Date().getFullYear()} />
</Footer>
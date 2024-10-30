<script lang="ts">
	import '../../app.css';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	let { children, data }: {children: Snippet<[]>, data: LayoutData} = $props();
	import logoImg from '$lib/assets/images/LOSF Orange.png';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	function urlPath(index: number) {
		const fullURL = $page.url.pathname;
		const parts = fullURL.split("/").slice(0, index + 1);
		const path = parts.join("/");
		return path;
	}
</script>

<Navbar class="shadow-2xl">
  <NavBrand href="/">
    <img src={logoImg} class="me-3 h-6 sm:h-9" alt="LOSF Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Community</span>
  </NavBrand>
  <NavHamburger  />
  <NavUl>
    <NavLi>{data?.user.User.firstName ?? 'User'}</NavLi>
  </NavUl>
</Navbar>

<div class="mx-10">
	<Breadcrumb>
		{#each $page.url.pathname.toString().split("/") as path, index}
			{#if index === 0}
				<BreadcrumbItem href="/" home>{path}</BreadcrumbItem>
			{:else}
				<BreadcrumbItem href={urlPath(index)}>{path}</BreadcrumbItem>
			{/if}
		{/each}
	</Breadcrumb>
</div>

{@render children()}

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

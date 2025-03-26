<script lang="ts">
	import '../../app.css';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	let { children, data }: {children: Snippet<[]>, data: LayoutData} = $props();
	import logoImg from '$lib/assets/images/LOSF Orange.png';
	import { Navbar, NavBrand, Dropdown, DropdownItem, DropdownDivider, Button, DropdownHeader, Avatar, Modal } from 'flowbite-svelte';
	import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { ArrowRightToBracketOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';


	function urlPath(index: number) {
		const fullURL = $page.url.pathname;
		const parts = fullURL.split("/").slice(0, index + 1);
		return parts.join("/");
	}

	let logOutModal: boolean = $state(false)
</script>

<Navbar class="shadow-2xl">
  <NavBrand href="/">
    <img src={logoImg} class="me-3 h-6 sm:h-9" alt="LOSF Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Community</span>
  </NavBrand>
  {#if data?.user.image != null}
  <Avatar alt={data?.user.name ?? "user"} src={data?.user.image ?? "NA"} border class="cursor-pointer"/>
  {:else}
  <Avatar alt={data?.user.name ?? "user"} border class="cursor-pointer"/>
  {/if}
  <Dropdown>
	<DropdownHeader onclick={() => window.location.href = "/dash/user"} class="cursor-pointer">
		<div class="px-4 py-2">
			<span class="block text-sm text-gray-900 dark:text-white">{data?.user.name ?? "NA"}</span>
			<span class="block truncate text-sm font-medium">{data?.user.email ?? "NA"}</span>
		</div>
	</DropdownHeader>
	<DropdownItem onclick={() => logOutModal = true}>
		<Button pill outline>Sign Out  &nbsp;<ArrowRightToBracketOutline /> </Button>
	</DropdownItem>
  </Dropdown>
</Navbar>

<Modal bind:open={logOutModal} size="xs">
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to log out of this account?</h3>
    <form action="/signout" method="POST">
		<Button pill type="submit" class="me-2">Yes, I'm sure</Button>
	</form>
  </div>
</Modal>

<div class="mx-10">
	<Breadcrumb class="bg-gray-50 py-3 my-10 px-5 dark:bg-gray-900">
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

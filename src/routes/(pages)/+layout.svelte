<script lang="ts">
	import '../../app.css';
	let { children } = $props();
	//import logo from '$lib/assets/images/LOSF Orange.png?enhanced';
	import logoImg from '$lib/assets/images/LOSF Orange.png';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle class="shadow-2xl">
  <NavBrand href="/">
    <img src={logoImg} class="me-3 h-6 sm:h-9" alt="LOSF Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Community</span>
  </NavBrand>
  <NavHamburger  />
  <NavUl {hidden}>
    <NavLi href="/" onclick={toggle}>Home</NavLi>
    <NavLi href="/certifications" onclick={toggle}>Certifications</NavLi>
    <NavLi href="/membership" onclick={toggle}>Membership</NavLi>
	<NavLi href="/dash" onclick={toggle}>Portal</NavLi>
  </NavUl>
</Navbar>

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

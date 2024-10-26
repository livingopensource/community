<script lang="ts">
	import '../app.css';
	let { children } = $props();
	//import logo from '$lib/assets/images/LOSF Orange.png?enhanced';
	import logoImg from '$lib/assets/images/LOSF Orange.png';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from 'flowbite-svelte';
	let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
</script>

<Navbar class="shadow-2xl">
  <NavBrand href="/">
    <img src={logoImg} class="me-3 h-6 sm:h-9" alt="LOSF Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Community</span>
  </NavBrand>
  <NavHamburger  />
  <NavUl >
    <NavLi href="/">Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
	<NavLi><DarkMode {btnClass}/></NavLi>
  </NavUl>
</Navbar>

{@render children()}

<Footer footerType="logo" class="align-bottom">
	<div class="sm:flex sm:items-center sm:justify-between">
	<FooterBrand href="https://livingopensource.org" src={logoImg} alt="Logo" name="Living Open Source Foundation" />
	  <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
		<FooterLink href="/about">About</FooterLink>
		<FooterLink href="/pricing">Privacy Policy</FooterLink>
		<FooterLink href="/license">Licensing</FooterLink>
		<FooterLink href="/contact">Contact</FooterLink>
	  </FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<FooterCopyright href="/" by="Living Open Source Foundation" year={new Date().getFullYear()} />
</Footer>

<script>
    import { Carousel } from "flowbite-svelte";
    import { scale } from 'svelte/transition';
    import { Timeline, TimelineItem } from 'flowbite-svelte';
    import { quintOut } from 'svelte/easing';
    const scaleAnimation = (/** @type {Element} */ x) => scale(x, { duration: 500, easing: quintOut });
    export const images = [
    {
      alt: 'Team Work',
      src: 'https://i0.wp.com/livingopensource.org/wp-content/uploads/2024/06/Living-Open-Source-Event-Kenya-2019-scaled.jpg?fit=2560%2C1920&ssl=1',
      title: 'Colaboration',
    },
    {
      alt: 'Team Work',
      src: 'https://i0.wp.com/livingopensource.org/wp-content/uploads/2024/05/IMG-20181221-WA0077.jpg?fit=1600%2C1200&ssl=1',
      title: 'Togetherness'
    }
  ];
  import '../app.css';
	let { children } = $props();
	//import logo from '$lib/assets/images/LOSF Orange.png?enhanced';
	import logoImg from '$lib/assets/images/LOSF Orange.png';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from 'flowbite-svelte';
	let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
</script>

<svelte:head>
  <title> LOSF Conference Home</title>
</svelte:head>

<Navbar class="shadow-2xl">
  <NavBrand href="/">
    <img src={logoImg} class="me-3 h-6 sm:h-9" alt="LOSF Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Community</span>
  </NavBrand>
  <NavHamburger  />
  <NavUl >
    <NavLi href="/">Home</NavLi>
    <NavLi href="/certifications">Certifications</NavLi>
    <NavLi href="/membership">Membership</NavLi>
	<NavLi><DarkMode {btnClass}/></NavLi>
  </NavUl>
</Navbar>

<div class="flex-grow">
  <div class="grid grid-cols-1 place-content-center backdrop-blur-sm bg-white/30">
    <Carousel transition={scaleAnimation} {images} duration={15000} imgClass="grayscale" />
  </div>

  <div class="container grid place-content-center p-10">
    <div>
      <h1 class="text-2xl font-bold dark:text-white">What We Do.</h1>
    </div>
    
    <Timeline>
      <TimelineItem title="Stimulate Local Economies" date="01">
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">By developing local Open Source expertise, we enable communities to save money on software and invest in other critical areas like infrastructure, education, and healthcare. This helps to stimulate economic growth and create sustainable development opportunities.</p>
      </TimelineItem>
      <TimelineItem title="Promoting Inclusive Software" date="02">
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Open Source software does not discriminate and provides equal opportunities for everyone. It allows individuals from all backgrounds to contribute, learn, and grow, thereby promoting inclusivity and diversity in the tech community.</p>
      </TimelineItem>
      <TimelineItem title="Guided Training Process" date="03">
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">We follow a structured three-step approach to training. Starting with basic education at large events, we move on to more advanced certification for experienced participants, and finally, we establish local knowledge centers to provide ongoing, affordable training.</p>
      </TimelineItem>
      <TimelineItem title="Community Building" date="04">
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">We establish local communities through on-site events where we teach the basics of Open Source software. These events help create a network of local enthusiasts and professionals who continue to meet and grow together, ensuring sustained development and support.</p>
      </TimelineItem>
      <TimelineItem title="International Collaboration" date="05">
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">We partner with international organizations like ITGilde to bring global expertise to local communities. This collaboration enhances our training programs and ensures that local talent can participate in the worldwide Open Source ecosystem on an equal footing.</p>
      </TimelineItem>
      <TimelineItem title="Open Source Consultation" date="06">
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Our local knowledge centers serve as one-stop shops for all things Open Source. They offer consulting services to local enterprises, governments, and non-profit organizations, helping them transition to and benefit from Open Source solutions.</p>
      </TimelineItem>
    </Timeline>
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



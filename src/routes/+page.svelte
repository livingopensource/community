<script>
    import { Carousel } from "flowbite-svelte";
    import { scale } from 'svelte/transition';
    import { Timeline, TimelineItem, Button, Activity, ActivityItem, Group, GroupItem } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
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
</script>

<svelte:head>
  <title> LOSF Conference Home</title>
</svelte:head>

<div class="flex-grow">
  <div class="grid grid-cols-1 place-content-center backdrop-blur-sm bg-white/30">
    <Carousel transition={scaleAnimation} {images} duration={15000} imgClass="grayscale" />
</div>

<div class="container grid place-content-center">
    
<Timeline>
  <TimelineItem title="Ansible Training" date="February 2022">
    <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
    <Button href="/conference/ansible" color="alternative">Learn more<ArrowRightOutline class="ms-2 w-5 h-5" /></Button>
  </TimelineItem>
  <TimelineItem title="Application UI code in Tailwind CSS" date="March 2022">
    <p class="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
  </TimelineItem>
  <TimelineItem title="Application UI code in Tailwind CSS" date="April 2022">
    <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
  </TimelineItem>
</Timeline>

</div>
</div>


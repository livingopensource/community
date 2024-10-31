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
</script>

<svelte:head>
  <title> Home  | LOSF Community </title>
</svelte:head>

<div class="flex-grow">
  <Carousel transition={scaleAnimation} {images} duration={15000} imgClass="grayscale" />
  <div class="flex flex-col justify-center items-center px-6 mx-auto xl:px-0">
  
    <div class="container p-10">
      <div>
        <h1 class="text-2xl font-bold dark:text-white">What We Do.</h1>
      </div>
      
      <div class="flex justify-evenly">
        <Timeline order="horizontal" class="md:flex content-evently">
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
  </div>
</div>
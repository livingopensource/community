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
        <!-- <Timeline order="horizontal" class="md:flex content-evently">
          <TimelineItem title="Stimulate Local Economies" date="01">
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Our task is to develop and foster growth of the local digital ecosystem through the use of open source software..</p>
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
        </Timeline> -->

<ol class="items-center md:flex">
  <li class="relative mb-6 sm:mb-0">
      <div class="flex items-center">
          <div class="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-orange-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <svg class="w-2.5 h-2.5 text-orange-800 dark:text-orange-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
          </div>
          <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
      </div>
      <div class="mt-3 sm:pe-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Stimulate Local Economies</h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">01</time>
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">Our task is to develop and foster growth of the local digital ecosystem through the use of open source software..</p>
      </div>
  </li>
  <li class="relative mb-6 sm:mb-0">
      <div class="flex items-center">
          <div class="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-orange-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <svg class="w-2.5 h-2.5 text-orange-800 dark:text-orange-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
          </div>
          <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
      </div>
      <div class="mt-3 sm:pe-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Promoting Inclusive Software</h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">02</time>
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">Open Source software does not discriminate and provides equal opportunities for everyone. It allows individuals from all backgrounds to contribute, learn, and grow, thereby promoting inclusivity and diversity in the tech community.</p>
      </div>
  </li>
  <li class="relative mb-6 sm:mb-0">
      <div class="flex items-center">
          <div class="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-orange-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <svg class="w-2.5 h-2.5 text-orange-800 dark:text-orange-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
          </div>
          <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
      </div>
      <div class="mt-3 sm:pe-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Guided Training Process</h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">03</time>
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">We follow a structured three-step approach to training. Starting with basic education at large events, we move on to more advanced certification for experienced participants, and finally, we establish local knowledge centers to provide ongoing, affordable training.</p>
      </div>
  </li>
  <li class="relative mb-6 sm:mb-0">
    <div class="flex items-center">
        <div class="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-orange-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            <svg class="w-2.5 h-2.5 text-orange-800 dark:text-orange-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </div>
        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
    </div>
    <div class="mt-3 sm:pe-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Community Building</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">04</time>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">We establish local communities through on-site events where we teach the basics of Open Source software. These events help create a network of local enthusiasts and professionals who continue to meet and grow together, ensuring sustained development and support.</p>
    </div>
  </li>
  <li class="relative mb-6 sm:mb-0">
    <div class="flex items-center">
        <div class="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-orange-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            <svg class="w-2.5 h-2.5 text-orange-800 dark:text-orange-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </div>
        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
    </div>
    <div class="mt-3 sm:pe-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">International Collaboration</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">05</time>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">We partner with international organizations like ITGilde to bring global expertise to local communities. This collaboration enhances our training programs and ensures that local talent can participate in the worldwide Open Source ecosystem on an equal footing.</p>
    </div>
  </li>
  <li class="relative mb-6 sm:mb-0">
    <div class="flex items-center">
        <div class="z-10 flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full ring-0 ring-white dark:bg-orange-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            <svg class="w-2.5 h-2.5 text-orange-800 dark:text-orange-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </div>
        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
    </div>
    <div class="mt-3 sm:pe-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Open Source Consultation</h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">06</time>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Our local knowledge centers serve as one-stop shops for all things Open Source. They offer consulting services to local enterprises, governments, and non-profit organizations, helping them transition to and benefit from Open Source solutions.</p>
    </div>
  </li>
</ol>


      </div>
    </div>
  </div>
</div>
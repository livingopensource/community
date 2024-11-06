<script>
    import { Carousel, Card } from "flowbite-svelte";
    import { scale } from 'svelte/transition';
    import { LayersOutline } from 'flowbite-svelte-icons';
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
      
      <div class="flex flex-wrap justify-center gap-3 p-5 text-center">
        <Card>
          <LayersOutline size="xl" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Stimulate Local Economies
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            Our task is to develop and foster growth of the local digital ecosystem through the use of open source software
          </p>
        </Card>
        <Card>
          <LayersOutline size="xl" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Promoting Inclusive Software
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            Open Source software does not discriminate and provides equal opportunities for everyone. It allows individuals from all backgrounds to contribute, learn, and grow, thereby promoting inclusivity and diversity in the tech community
          </p>
        </Card>
        <Card>
          <LayersOutline size="xl" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Guided Training Process
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            We follow a structured three-step approach to training. Starting with basic education at large events, we move on to more advanced certification for experienced participants, and finally, we establish local knowledge centers to provide ongoing, affordable training.
          </p>
        </Card>
        <Card>
          <LayersOutline size="xl" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Community Building
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            We establish local communities through on-site events where we teach the basics of Open Source software. These events help create a network of local enthusiasts and professionals who continue to meet and grow together, ensuring sustained development and support.
          </p>
        </Card>
        <Card>
          <LayersOutline size="xl" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            International Collaboration
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            We partner with international organizations like ITGilde to bring global expertise to local communities. This collaboration enhances our training programs and ensures that local talent can participate in the worldwide Open Source ecosystem on an equal footing.
          </p>
        </Card>
        <Card>
          <LayersOutline size="xl" />
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Open Source Consultation
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            OOur local knowledge centers serve as one-stop shops for all things Open Source. They offer consulting services to local enterprises, governments, and non-profit organizations, helping them transition to and benefit from Open Source solutions.
          </p>
        </Card>
      </div>
    </div>
  </div>
</div>
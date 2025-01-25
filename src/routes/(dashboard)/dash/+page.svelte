<script>
  import { Card } from 'flowbite-svelte';
</script>
<svelte:head>
  <title> LOSF Conference | Dashboard</title>
</svelte:head>

<div class="flex-grow">
  <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
    <h1 class="mx-10 p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
      Get Connected. Get Trained. Get Certified
    </h1>
    <div class="flex flex-wrap justify-center gap-3 p-5 text-center">
      <Card href="/dash/membership">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             Membership
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
              Be a part of a vibrant community of open source technology enthusiats shaping the technology landscape in Africa and beyond.
          </p>
      </Card>
      <Card href="/dash/certifications">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             Certifications
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
              Get certified in different fields and show off your skills to the rest of the world.
          </p>
      </Card>
      <Card href="/dash/trainings">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             Trainings
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
              Get the best in training materials for Open Source, from a wide variety of sources in one place
          </p>
      </Card>
      <Card href="/dash/meet-ups">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             Meet Ups
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
              Get to network and connect with the rest of the community during and after meet ups
          </p>
      </Card>
    </div>
  </div>
</div>
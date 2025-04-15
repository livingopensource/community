<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
    import {
      Table,
      TableBody,
      TableBodyCell,
      TableBodyRow,
      TableHead,
      TableHeadCell,
      Card,
      Button
    } from 'flowbite-svelte';
    const certifications: {
        image: string;
        title: string;
        description: string;
    }[] = [
      {
            "image": "/certifications/Certified-Linux-Associate.webp",
            "title": "Certified Linux Associate",
            "description": "This certification validates fundamental Linux skills, including basic installation, configuration, and maintenance tasks. It demonstrates competency in working with Linux command line utilities, understanding file systems, managing users and groups, and performing basic system administration tasks."
        },
        {
            "image": "/certifications/Linux-Foundation-Certified-System-Administrator.webp",
            "title": "Linux Foundation Certified System Administrator",
            "description": "This certification goes beyond the basics and focuses on practical skills required for Linux system administration in professional environments. It covers topics such as system architecture, system installation and package management, GNU and Unix commands, devices, file systems, and security."
        },
        {
            "image": "/certifications/KCNA_badge.webp",
            "title": "Kubernetes and Cloud Native Certified Associate",
            "description": "This certification focuses on cloud-native technologies with a particular emphasis on Kubernetes. It covers core concepts of Kubernetes, container orchestration, deploying applications, and managing containers in cloud environments. It validates proficiency in deploying and managing containerized applications using Kubernetes."
        },
        {
            "image": "/certifications/kubernetes-ckad-color-1024x1003-1.webp",
            "title": "Certified Kubernetes Application Developer",
            "description": "This certification is aimed at developers who work with Kubernetes. It validates skills in designing, building, configuring, and exposing cloud-native applications for Kubernetes. It covers topics such as containerizing applications, configuring networking, managing application lifecycle, and troubleshooting."
        },
        {
            "image": "/certifications/Certified-Kubernetes-Administrator.webp",
            "title": "Certified Kubernetes Administrator",
            "description": "This certification is designed for system administrators who deploy, maintain, and troubleshoot Kubernetes clusters. It validates skills in various aspects of Kubernetes administration, including cluster architecture, installation and configuration, networking, security, and troubleshooting. It demonstrates expertise in managing production Kubernetes environments."
        }
    ];

    let openRow: number | null = $state(null);

    const toggleRow = (i: number) => {
      openRow = openRow === i ? null : i;
    }
    import {
      ArrowRightOutline,
      PlusOutline
    } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';

    onMount(() => {
    const typeParam = page.url.searchParams.get('type');
    if (typeParam) {
      const foundCertification = certifications.find(item => item.title === typeParam);
      if (foundCertification) {
        toggleRow(certifications.indexOf(foundCertification));
      }
    }
  });

</script>
<svelte:head>
  <title> LOSF Conference | Dashboard Certifications</title>
</svelte:head>

<div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <h1 class="mx-10 p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
        Certifications Details
      </h1>
      <div class="flex flex-wrap justify-center gap-4 p-5 text-center">
        <div class="flex-auto sm:w-max md:w-max">
          <h1 class="dark:text-white">Certifications / Voucher</h1>
          <br />
          <Table>
            <TableHead>
              <TableHeadCell>Certification name</TableHeadCell>
              <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
              {#each certifications as item, i}
                <TableBodyRow on:click={() => toggleRow(i)}>
                  <TableBodyCell class="text-wrap">{item.title}</TableBodyCell>
                  <TableBodyCell class="text-wrap"><PlusOutline class="w-6 h-6 ms-2" /></TableBodyCell>
                </TableBodyRow>
                {#if openRow === i}
                  <TableBodyRow>
                    <TableBodyCell colspan={4} class="p-0">
                      <div class="px-2 py-3" transition:slide={{ duration: 300, axis: 'y' }}>
                        <Card img={item.image} horizontal size="md" reverse={false}>
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-wrap">{item.title}</h5>
                          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-wrap">{item.description}</p>
                          <Button pill size="sm" disabled>
                            Coming Soon <!-- <ArrowRightOutline class="w-6 h-6 ms-2 text-white" /> -->
                          </Button>
                        </Card>
                      </div>
                    </TableBodyCell>
                  </TableBodyRow>
                {/if}
              {/each}
            </TableBody>
          </Table>
        </div>
        <div class="flex-auto w-14">
          <h1 class="dark:text-white">
            You don't have any certifications
          </h1>
          <br />
            <div class="flex justify-center">
              <enhanced:img src="/src/lib/assets/images/404.svg" alt="error" />
            </div>
        </div>
      </div>
    </div>
</div>
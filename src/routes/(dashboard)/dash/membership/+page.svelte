<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    ImagePlaceholder,
    Modal,
    Card,
    Button
  } from 'flowbite-svelte';
  import {
    ArrowRightOutline,
    PlusOutline
  } from 'flowbite-svelte-icons';
  import { slide } from 'svelte/transition';
	import type { PageServerLoad } from './$types';
  const membership: {
      amount: string;
      title: string;
      brief: string;
      description: string[];
  }[] = [
        {
            "amount": "$ 20/year",
            "title": "Explorer",
            "brief": "This tier is perfect for those starting their journey in the open-source world or looking to stay informed about industry developments.",
            "description": [
                "Access to open-source resources and repositories",
                "Monthly updates on industry news and trends",
                "Participation in professional online forums",
                "Discounts on training courses, webinars, and events",
                "Opportunity to join live sessions on requested topics"
            ]
        },
        {
            "amount": "$ 50/year",
            "title": "Developer",
            "brief": "Ideal for professionals seeking to deepen their expertise and expand their network within the open-source community.",
            "description": [
                "All Explorer tier benefits",
                "Access to exclusive webinars and virtual workshops",
                "Free or discounted entry to conferences and networking events",
                "Priority access to new open-source project releases",
                "Opportunities to contribute to high-profile open-source projects",
                "Reduced rates for Linux certification courses "
            ]
        },
        {
            "amount": "$ 100/year",
            "title": "Professional",
            "brief": "This tier is designed for individuals aiming for significant career advancement, offering tailored support and recognition.",
            "description": [
                "All Professional benefits",
                "One-on-one mentorship sessions with experienced IT professionals",
                "Personalized career development plans and guidance",
                "Recognition as a Premium Member on the LOS website "
            ]
        },
        {
            "amount": "$ 200/year",
            "title": "Executive",
            "brief": "For those who seek an elite experience, this tier offers unmatched access to premium resources, top-tier networking opportunities, and direct engagement with industry pioneers.",
            "description": [
                "All Executive tier benefits",
                "Exclusive live sessions with renowned instructor Sander Van Vugt",
                "Early access to high-level training and certification programs",
                "VIP invitations to global open-source conferences and events",
                "Personalized introductions to industry leaders and experts",
                "Priority support and direct access to the Foundation's leadership team"
            ]
        }
    ];
  let openRow: number | null = $state(null);
  let details: {
      amount: string;
      title: string;
      brief: string;
      description: string[];
  } = $state(membership[0]);
  let doubleClickModal = $state(false);

  const toggleRow = (i: number) => {
    openRow = openRow === i ? null : i;
  }

  let data: {data: PageServerLoad} = $props();

  onMount(() => {
    const typeParam = $page.url.searchParams.get('type');
    if (typeParam) {
      const foundMembership = membership.find(item => item.title === typeParam);
      if (foundMembership) {
        details = foundMembership;
        toggleRow(membership.indexOf(foundMembership));
      }
    }
  });
</script>
<svelte:head>
  <title> LOSF Conference | Dashboard Membership</title>
</svelte:head>

<div class="flex-grow">
  <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
    <h1 class="p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
      Membership Details
    </h1>
    <div class="flex flex-wrap justify-center gap-4 p-5 text-center">
      <div class="flex-auto sm:w-max md:w-max">
        <h1 class="dark:text-white">Membership Subscriptions</h1>
        <br />
        <Table>
          <TableHead>
            <TableHeadCell>Membership name</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {#each membership as item, i}
              <TableBodyRow on:click={() => toggleRow(i)}>
                <TableBodyCell>{item.title}</TableBodyCell>
                <TableBodyCell>{item.amount}</TableBodyCell>
                <TableBodyCell><PlusOutline /></TableBodyCell>
              </TableBodyRow>
              {#if openRow === i}
                <TableBodyRow on:dblclick={() => {
                  doubleClickModal = true;
                  details = item;
                }}>
                  <TableBodyCell colspan={4} class="p-0">
                    <div class="px-2 py-3" transition:slide={{ duration: 300, axis: 'y' }}>
                      <Card img="/LOSF Orange.png" horizontal size="md" reverse={false}>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-wrap">{item.title}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-wrap">{item.brief}</p>
                        <Button size="sm" pill>
                          Subscribe <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
                        </Button>
                      </Card>
                    </div>
                  </TableBodyCell>
                </TableBodyRow>
              {/if}
            {/each}
          </TableBody>
        </Table>
        <Modal title={details?.title} bind:open={doubleClickModal} autoclose outsideclose>
          <ImagePlaceholder />
        </Modal>
      </div>
      <div class="flex-auto w-14">
        {#if data.data.subscriptions == 0}
        <h1 class="dark:text-white">
          You don't have an active membership subscription
        </h1>
        <br />
          <div class="flex justify-center">
            <enhanced:img src="/src/lib/assets/images/404.svg" alt="error" />
          </div>
        {:else}
          <div class="flex justify-center">
           
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
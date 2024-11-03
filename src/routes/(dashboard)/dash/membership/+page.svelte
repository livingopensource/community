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
    PlusOutline,
    ExclamationCircleOutline
  } from 'flowbite-svelte-icons';
  import { slide } from 'svelte/transition';
  import moment from 'moment';
	import type { PageServerLoad } from './$types';
  let data: {data: PageServerLoad} = $props();
  const membership = data.data.memberships;
  const userSubscriptions = data.data.userSubscriptions;
  let openRow: number | null = $state(null);
  let openSubscriptionRow: number | null = $state(null);
  let details: {
      name: string
      amount: string;
      subTitle: string;
      description: string;
  } = $state(membership[0]);
  let doubleClickModal = $state(false);
  let paymentConfirmationModal: boolean = $state(false);

  const toggleRow = (i: number) => {
    openRow = openRow === i ? null : i;
  }

  const toggleSubscriptionRow = (i: number) => {
    openSubscriptionRow = openSubscriptionRow === i ? null : i;
  }

  onMount(() => {
    const typeParam = $page.url.searchParams.get('type');
    if (typeParam) {
      const foundMembership = membership.find((item: { name: string; }) => item.name === typeParam);
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
        <h1 class="dark:text-white">Membership Options</h1>
        <br />
        <Table>
          <TableHead>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {#each membership as item, i}
              <TableBodyRow on:click={() => toggleRow(i)}>
                <TableBodyCell>{item.name}</TableBodyCell>
                <TableBodyCell>{item.currency} {item.amount} / Annual</TableBodyCell>
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
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-wrap">{item.name}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-wrap">{item.subTitle}</p>
                        <Button size="sm" pill onclick={() => paymentConfirmationModal = true}>
                          Subscribe <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
                        </Button>
                        <Modal bind:open={paymentConfirmationModal}>
                          <div class="text-center">
                            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-wrap">You are about to make a payment of {item.currency} {item.amount} for your {item.name} membership subscription</h3>
                            <form method="POST">
                              <input type="hidden" value={item.name} name="type" />
                              <input type="hidden" value={item.id} name="id" />
                              <Button pill type="submit" color="red" class="me-2">Proceed</Button>
                            </form>
                          </div>
                        </Modal>
                      </Card>
                    </div>
                  </TableBodyCell>
                </TableBodyRow>
              {/if}
            {/each}
          </TableBody>
        </Table>
        <Modal title={details?.name} bind:open={doubleClickModal} autoclose outsideclose>
          <ImagePlaceholder />
        </Modal>
      </div>
      <div class="flex-auto sm:w-max md:w-max">
        <h1 class="dark:text-white">Your subscription history</h1>
        <br />
        <Table>
          <TableHead>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Paid</TableHeadCell>
            <TableHeadCell>Validity</TableHeadCell>
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {#each userSubscriptions as item, i}
              <TableBodyRow on:click={() => toggleSubscriptionRow(i)}>
                <TableBodyCell>{item.Membership.name}</TableBodyCell>
                <TableBodyCell>
                  {#if item.paid}
                    Yes
                  {:else}
                    No
                  {/if}
                </TableBodyCell>
                <TableBodyCell>{moment(item.createdAt).format("MMM Do, YYYY")} - {moment(item.createdAt).add(12, 'months').format("MMM Do, YYYY")}</TableBodyCell>
              </TableBodyRow>
              {#if openSubscriptionRow === i}
                <TableBodyRow>
                  <TableBodyCell colspan={4} class="p-0">
                    <div class="px-2 py-3" transition:slide={{ duration: 300, axis: 'y' }}>
                      <Card img="/LOSF Orange.png" horizontal size="md" reverse={false}>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-wrap">{item.Membership.name}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-wrap">{item.Membership.subTitle}</p>
                        {#if item.paid == false}
                          <Button size="sm" pill outline disabled>
                            payment {item.status} but not completed
                          </Button>
                        {/if}
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
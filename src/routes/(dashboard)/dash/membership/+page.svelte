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
  import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
  import { slide } from 'svelte/transition';
  import moment from 'moment';
	import MembershipCertificate from '$lib/components/membership-certificate.svelte';

  let { data, form } = $props();

  const membership = data.memberships;
  const userSubscriptions = data.userSubscriptions;
  let openRow: number | null = $state(null);
  let openSubscriptionRow: number | null = $state(null);

  let details: {
    name: string;
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

  const errorToast = (p0: HTMLDivElement, message: string) => {
    toasts.add({
      title: 'Unable to process payment',
      description: message,
      duration: 16000, // 0 or negative to avoid auto-remove
      placement: 'center-center',
      type: 'error',
			showProgress: true,
      onClick: () => {},
      onRemove: () => {},
      // component: BootstrapToast, // allows to override toast component/template per toast
    });

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

<ToastContainer let:data={data}>
  <FlatToast {data}  />
</ToastContainer>

<div class="flex-grow">
  <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
    {#if form != null}
      {#if form.status != 200}
          <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
            <p class="dark:text-amber-500">{form?.body.message}</p>
           </div>
          <input type="hidden" use:errorToast={form.body.message} />
      {/if}
    {/if}
    <div class="flex flex-cols-2 justify-end ml-10 mr-10">
      <!-- Membership Details -->
       <div></div>
       <div>
        {#if !data.isAdmin}
        <Button size="sm" pill href="/dash/membership/details">
          Membership Details
        </Button>
        {/if}
       </div>
    </div>
    <div class="flex flex-wrap justify-center gap-4 p-5 text-center">
      <div class="flex-auto sm:w-max md:w-max">
        <h1 class="dark:text-white">
          {#if data.isAdmin}
            Applicants
          {:else}
            Membership Options
          {/if}
        </h1>
        <br />
        {#if data.isAdmin}
        <Table>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Job Title</TableHeadCell>
            <TableHeadCell>Organisation</TableHeadCell>
            <TableHeadCell>Experience</TableHeadCell>
            <TableHeadCell>Country</TableHeadCell>
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {#each data.applicants as item, i}
            <TableBodyRow on:click={() => toggleRow(i)}>
              <TableBodyCell>{item.user.name} <br /> ({item.user.email})</TableBodyCell>
              <TableBodyCell> {item.jobTitle} </TableBodyCell>
              <TableBodyCell> {item.organisation} </TableBodyCell>
              <TableBodyCell> {item.workExperience} Years </TableBodyCell>
              <TableBodyCell>{item.country}</TableBodyCell>
            </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
        {:else}
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
                <TableBodyRow>
                  <TableBodyCell colspan={4} class="p-0">
                    <div class="px-2 py-3" transition:slide={{ duration: 300, axis: 'y' }}>
                      <Card img="/LOSF Orange.png" horizontal size="md" reverse={false}>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-wrap">{item.name}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-wrap">{item.subTitle}</p>
                        <Button size="sm" pill onclick={() => paymentConfirmationModal = true} disabled>
                          Subscribe <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
                        </Button>
                        <Modal bind:open={paymentConfirmationModal}>
                          <div class="text-center">
                            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-wrap">You are about to make a payment of {item.currency} {item.amount} for your {item.name} membership subscription</h3>
                            <form method="POST">
                              <input type="hidden" value={item.name} name="type" />
                              <input type="hidden" value={item.id} name="id" />
                              <Button pill type="submit" class="me-2">Proceed</Button>
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
        {/if}
      </div>
      <div class="flex-auto sm:w-max md:w-max">
        <h1 class="dark:text-white">
          {#if data.isAdmin}
            Active Subscription (Members)
          {:else}
            Subscription History
          {/if}
        </h1>
        <br />
        <Table>
          <TableHead>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Paid</TableHeadCell>
            <TableHeadCell>Validity</TableHeadCell>
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {/* @ts-ignore */ null }
            {#each userSubscriptions.subscriptions as item, i}
              <TableBodyRow on:click={() => toggleSubscriptionRow(i)}>
                {/* @ts-ignore */ null }
                <TableBodyCell>{item.memberships.name}</TableBodyCell>
                <TableBodyCell>
                  {#if item.paid}
                    Yes
                  {:else}
                    No
                  {/if}
                </TableBodyCell>
                <TableBodyCell>{moment(item.createdAt).format("MMM Do, YY")} - {moment(item.createdAt).add(12, 'months').format("YY")}</TableBodyCell>
              </TableBodyRow>
              {#if openSubscriptionRow === i}
                <TableBodyRow>
                  <TableBodyCell colspan={4} class="p-0">
                    <div class="px-2 py-3" transition:slide={{ duration: 300, axis: 'y' }}>
                      <Card img="/LOSF Orange.png" horizontal size="md" reverse={false}>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-wrap">{item.memberships.name}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-wrap">{item.memberships.subTitle}</p>
                        {#if item.status == "initialised"}
                          <Button size="sm" pill outline onclick={() => {
                            window.location.href = data.dpoHostedPage+"?ID="+item.externalTransactionId
                          }}>
                            continue to complete payment
                          </Button>
                        {:else if item.status == 'failed'}
                          <Button size="sm" pill outline disabled>
                            payment {item.status}
                          </Button>
                        {/if}
                      </Card>
                    </div>
                  </TableBodyCell>
                </TableBodyRow>
              {/if}
              {#if item.paid}
                {/* @ts-ignore */ null }
                <MembershipCertificate  name={data.user.name} date={moment(item.createdAt).format("MMM Do, YYYY")} membership={item.memberships.name} membershipID={item.id} />
              {/if}
              {/each}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</div>
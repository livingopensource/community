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
    Button,
    Select,
    Label
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
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema.js';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

  let { data } = $props();

  const formData = superForm(data.form, {
    validators: zodClient(formSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(f.message);
        /* setTimeout(() => {
          goto("/dash/membership")
        }, 3000); */
      } else {
        toast.error(f.message);
      }
    }
  });

  const { form, enhance, errors} = formData;

  const membership = data.memberships;
  const userSubscriptions = data.userSubscriptions;
  let openRow: number | null = $state(null);
  let openSubscriptionRow: number | null = $state(null);

  let details: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    subTitle: string | null;
    description: string | null;
    currency: string;
    period: number;
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

<ToastContainer let:data={data}>
  <FlatToast {data}  />
</ToastContainer>

<div class="flex-grow">
  <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
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
            <TableBodyRow on:click={() => toggleRow(i)} class="cursor-pointer">
              <TableBodyCell>{item.user?.name} <br /> ({item.user?.email}) <br /> {item.membership?.name}</TableBodyCell>
              <TableBodyCell>{item.jobTitle}</TableBodyCell>
              <TableBodyCell>{item.organisation}</TableBodyCell>
              <TableBodyCell>{item.workExperience} Years</TableBodyCell>
              <TableBodyCell>{item.country}</TableBodyCell>
            </TableBodyRow>
            <Modal title="{item.user?.name}'s Membership" open={openRow === i}>
              <form method="post" action="?/assign">
                <div class="flex flex-col gap-4">
                  <Label for="name">{item.membership?.name ?? ""} Membership Tier</Label>
                  <Select required placeholder={item.membership?.name ? "Change Membership type"  : "Assign Membership type"} name="membership" bind:value={$form.membership}>
                    {#each membership as item}
                      <option value="{item.id}">{item.name}</option>
                    {/each}
                  </Select>
                  <input type="hidden" name="user" value="{item.user?.id}" />
                  <Button type="submit" pill>Submit</Button>
              </form>
            </Modal>
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
                        {#if item.name == data.user?.applicant[0].membership?.name}
                          <Button size="sm" pill onclick={() => paymentConfirmationModal = true} disabled = {data.disablePayment}>
                            Pay <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
                          </Button>
                        {:else}
                          <Button size="sm" pill disabled>
                            Pay <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
                          </Button>
                        {/if}
                        <Modal bind:open={paymentConfirmationModal}>
                          <div class="text-center">
                            <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-wrap">You are about to make a payment of {item.currency} {item.amount} for your {item.name} membership subscription</h3>
                            <form method="POST" action="?/payment">
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
            {#each userSubscriptions.subscriptions as item, i}
              <TableBodyRow on:click={() => toggleSubscriptionRow(i)}>
                <TableBodyCell>{item.membership?.name}</TableBodyCell>
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
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-wrap">{item.membership?.name}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight text-wrap">{item.membership?.subTitle}</p>
                        {#if item.status == "initialised" || item.status == "pending"}
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
                  {#if item.paid}
                    <MembershipCertificate  name={data.user?.name ?? ""} date={moment(item.createdAt).format("MMM Do, YYYY")} membership={item.membership?.name} membershipID={item.id} />
                  {/if}
                </TableBodyRow>
              {/if}
              {/each}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</div>
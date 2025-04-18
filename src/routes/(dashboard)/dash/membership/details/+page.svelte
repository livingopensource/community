<script lang="ts">
    import { formSchema } from "./schema";
    import SuperDebug, {
      superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import {
      Card,
      Label,
      Input,
      Textarea,
      Helper,
      Button,
      Select,
      Popover
    } from 'flowbite-svelte';
    import {
      UserOutline,
      MailBoxOutline
    } from 'flowbite-svelte-icons';
	import { goto } from "$app/navigation";
	import { toast } from "svelte-sonner";
	import { formatDateToYYYYMMDD, isSubscriptionValid } from "$lib/utils";
    
  let {data} = $props()

  const formData = superForm(data.form, {
    validators: zodClient(formSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(f.message);
        setTimeout(() => {
          goto("/dash/membership")
        }, 3000);
      } else {
        toast.error(f.message);
      }
    }
  });

  const { form, enhance, errors} = formData;

</script>
<svelte:head>
  <title> LOSF Conference | Membership Application</title>
</svelte:head>

<div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <div class="flex flex-wrap gap-4 p-5 text-center">
        <div class="flex-auto sm:w-max md:w-max">
          <h1 class="dark:text-white">
            Membership Form
            <br />
            {#if data.user.applicant?.length === 1 && data.user.applicant[0].membershipId == null}
              (Pending Subscription assignment, we'll notify you via email when a tier is assigned to you)
            {:else if data.user.applicant?.length === 1 && data.user.applicant[0]?.membership != null}
              {#if data.user.subscriptions.length == 0}
               <a href="/dash/membership?type={data.user.applicant[0].membership?.name}">(Click here to make payment for your {data.user.applicant[0].membership?.name} membership)</a>
              {:else}
                {#each data.user.subscriptions as subscription}
                  {#if subscription.status == "succeeded" && isSubscriptionValid(formatDateToYYYYMMDD(subscription.createdAt))}
                    You have an active {subscription.membership?.name} membership
                  {/if}
                {/each}
              {/if}
            {/if}
          </h1>
          <br />
          <Card size={'lg'} class="container mx-auto">
            <div>
                {data?.user.name}
            </div>
            <div class="m-1 flex flex-col justify-start max-w-xl">
                <form method="post" use:enhance>
                    <div class="mb-6">
                        <Label for="title" class="block mb-2 text-left">Job Title</Label>
                        <Input name="title" type="text" placeholder="Current job title" required bind:value={$form.title}>
                          <UserOutline slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Input>
                        {#if $errors.title}
                          <Helper class='mt-2' color='red'><span class="font-medium">Error: </span> {$errors.title}</Helper>
                        {:else}
                          <Helper class='mt-2'>Current job title</Helper>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <Label for="organisation" class="block mb-2 text-left">Organisation</Label>
                        <Input name="organisation" type="text" placeholder="Name of organisation you currently work for" required bind:value={$form.organisation}>
                          <UserOutline slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Input>
                        {#if $errors.organisation}
                          <Helper class='mt-2' color='red'><span class="font-medium">Error: </span> {$errors.organisation}</Helper>
                        {:else}
                          <Helper class='mt-2'>Name of organisation you currently work for</Helper>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <Label for="experience" class="block mb-2 text-left">Work Experience</Label>
                        <Input name="experience" type="number" placeholder="Number of years of work experience" required bind:value={$form.experience}>
                          <UserOutline slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Input>
                        {#if $errors.experience}
                          <Helper class='mt-2' color='red'><span class="font-medium">Error: </span> {$errors.experience}</Helper>
                        {:else}
                          <Helper class='mt-2'>Number of years of work experience</Helper>
                        {/if}
                    </div>
                    <div class="mb-6">
                      <Label for="country" class="block mb-2 text-left">Country</Label>
                      <Select name="country" placeholder="Choose country of origin" required bind:value={$form.country}>
                        {#each data.countries as country}
                          <option value={country.code}>{country.name}</option>
                        {/each}
                      </Select>
                      {#if $errors.country}
                        <Helper class='mt-2' color='red'><span class="font-medium">Error: </span> {$errors.country}</Helper>
                      {:else}
                        <Helper class='mt-2'>Country of residence</Helper>
                      {/if}
                  </div>
                    <div class="mb-6">
                        <Label for="specialisation" class="block mb-2 text-left">Specialisation</Label>
                        <Textarea name="specialisation" placeholder="Areas of specialization or interest" required bind:value={$form.specialisation} />
                        {#if $errors.experience}
                          <Helper class='mt-2' color='red'><span class="font-medium">Error: </span> {$errors.experience}</Helper>
                        {:else}
                          <Helper class='mt-2'>Areas of specialization or interest</Helper>
                        {/if}
                    </div>
                      <Button type="submit" pill>Submit</Button>
                    <br />
                    <br />
                </form>
            </div>
          </Card>
    
        </div>
        <div class="flex-auto w-14">
          <h1 class="dark:text-white">
            Make sure your details are correct
          </h1>
          <br />
            <div class="flex justify-center">
              <enhanced:img src="/src/lib/assets/images/404.svg" alt="error" />
            </div>
        </div>
      </div>
    </div>
</div>
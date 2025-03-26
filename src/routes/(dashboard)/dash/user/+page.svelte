<script lang="ts">
    import {
      Card,
      Label,
      Input,
      Helper,
      Button
    } from 'flowbite-svelte';
    import {
      UserOutline,
      MailBoxOutline
    } from 'flowbite-svelte-icons';
    import type { ActionData } from './$types';
    import type { LayoutServerData } from '../../$types';
    let {data, form}: {data: LayoutServerData, form: ActionData} = $props();

</script>
<svelte:head>
  <title> LOSF Conference | Dashboard User Profile</title>
</svelte:head>

<div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <h1 class="p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
        {data?.user.name ?? ""}
      </h1>
      <div class="flex flex-wrap gap-4 p-5 text-center">
        <div class="flex-auto sm:w-max md:w-max">
          <h1 class="dark:text-white">Profile Details</h1>
          <br />
          <Card size={'lg'} class="container mx-auto">
            {#if form?.status == 200}
            <div class="error">
                {form.body.message}
            </div>
            {:else if form?.status == 400}
            <div class="error">
                {form.body.message}
            </div>
            {/if}
            <div class="m-1 flex flex-col justify-start max-w-xl">
                <form method="post">
                    <div class="mb-6">
                        <Label for="name" class="block mb-2 text-left">Full Name</Label>
                        <Input name="name" type="text" placeholder="Full Name" required value={data.user.name}>
                          <UserOutline slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Input>
                        {#if data?.user.name === null}
                        <Helper class='mt-2' color='red'><span class="font-medium">Full Name is required!</span> Please provide your full name to use this platform.</Helper>
                        {/if}
                    </div>
                    <div class="mb-6">
                        <Label for="email" class="block mb-2 text-left">Email</Label>
                        <Input name="email" type="email" placeholder="email@eample.com" required value={data.user.email}>
                          <MailBoxOutline slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Input>
                    </div>
                      <Button type="submit" pill>Update</Button>
                    <br />
                    <br />
                </form>
            </div>
          </Card>
    
        </div>
        <div class="flex-auto w-14">
          <h1 class="dark:text-white">
            Make sure your setaails are correct
          </h1>
          <br />
            <div class="flex justify-center">
              <enhanced:img src="/src/lib/assets/images/404.svg" alt="error" />
            </div>
        </div>
      </div>
    </div>
</div>
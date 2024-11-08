<script lang="ts">
    import {
      Card,
      Label,
      Input,
      Helper,
      Button
    } from 'flowbite-svelte';
    import {
      LockSolid,
    } from 'flowbite-svelte-icons';
    import type { ActionData } from './$types';
    import type { LayoutServerData } from '../../$types';
    let {data, form}: {data: LayoutServerData, form: ActionData} = $props();


    let password = $state(null)
    let repeatPassword = $state(null)

</script>
<svelte:head>
  <title> LOSF Conference | Dashboard User Profile</title>
</svelte:head>

<div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <h1 class="p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
        {data?.user.User.firstName ?? ""} {data.user.User.lastName}
      </h1>
      <div class="flex flex-wrap gap-4 p-5 text-center">
        <div class="flex-auto sm:w-max md:w-max">
          <h1 class="dark:text-white">Change Password</h1>
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
                        <Label for="input-group-1" class="block mb-2 text-left">Current Password</Label>
                        <Input name="current-password" type="password" placeholder="password" required >
                          <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Input>
                    </div>
                    <div class="mb-6">
                        <Label for="input-group-1" class="block mb-2 text-left">Password</Label>
                        <Input name="password" type="password" placeholder="password" required bind:value={password}>
                          <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Input>
                    </div>
                    <div class="mb-6">
                        <Label for="input-group-1" class="block mb-2 text-left">Repeat Password</Label>
                        <Input name="repeat-password" type="password" placeholder="password" required bind:value={repeatPassword}>
                          <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Input>
                        {#if password !== repeatPassword}
                          <Helper class='mt-2' color='red'><span class="font-medium">Passwords mismatch!</span> make sure the two passwords are the same.</Helper>
                        {/if}
                    </div>
                    {#if password !== repeatPassword}
                      <Button disabled pill>Change Password</Button>
                    {:else}
                      <Button type="submit" pill>Change Password</Button>
                    {/if}
                    <br />
                    <br />
                </form>
            </div>
          </Card>
    
        </div>
        <div class="flex-auto w-14">
          <h1 class="dark:text-white">
            Make sure your password is secure
          </h1>
          <br />
            <div class="flex justify-center">
              <enhanced:img src="/src/lib/assets/images/404.svg" alt="error" />
            </div>
        </div>
      </div>
    </div>
</div>
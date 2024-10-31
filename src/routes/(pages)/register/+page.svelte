<script lang="ts">
  import {
      Label,
      Input,
      Button,
      Helper,
      A,
      Card
  } from 'flowbite-svelte'

  import {
      EnvelopeSolid,
      UserAddSolid,
      LockSolid
  } from 'flowbite-svelte-icons';

  import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
  let password: string | null = $state(null)
  let repeatPassword: string | null = $state(null)
</script>

<svelte:head>
  <title> Register  | LOSF Community </title>
</svelte:head>

<div class="flex-grow">
  <Card size={'lg'} class="container mx-auto">
    <div class="m-10  flex flex-col justify-center max-w-xl">
        {#if form?.body?.errors}
          <div class="error">
            {#each form.body.errors as error}
              <div class="error">
                <p class="dark:text-red-600">{error.message}</p>
              </div>
            {/each}
          </div>
        {/if}
        <form method="post">
            <div class="mb-6">
                <Label for="input-group-1" class="block mb-2">Full Name</Label>
                <Input name="name" type="text" placeholder="name@flowbite.com" required value={form?.body?.name}>
                  <UserAddSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </Input>
            </div>
            <div class="mb-6">
                <Label for="input-group-1" class="block mb-2">Your Email</Label>
                <Input name="email" type="email" placeholder="name@flowbite.com" required value={form?.body?.email}>
                  <EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </Input>
            </div>
            <div class="mb-6">
                <Label for="input-group-1" class="block mb-2">Password</Label>
                <Input name="password" type="password" placeholder="name@flowbite.com" required bind:value={password}>
                  <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </Input>
            </div>
            <div class="mb-6">
                <Label for="input-group-1" class="block mb-2">Repeat Password</Label>
                <Input name="repeat-password" type="password" placeholder="name@flowbite.com" required bind:value={repeatPassword}>
                  <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </Input>
                {#if password !== repeatPassword}
                  <Helper class='mt-2' color='red'><span class="font-medium">Passwords mismatch!</span> make sure the two passwords are the same.</Helper>
                {/if}
            </div>
            {#if password !== repeatPassword}
              <Button disabled pill>Create Account</Button>
            {:else}
              <Button type="submit" pill>Create Account</Button>
            {/if}
            <br />
            <br />
            <div class="mb-6"> 
              <A href="/login">Or Login</A>
            </div>
        </form>
    </div>
  </Card>
</div>
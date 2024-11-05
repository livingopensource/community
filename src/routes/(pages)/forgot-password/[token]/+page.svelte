<script lang="ts">
    import {
        Label,
        Input,
        Button,
        Card,
        A,
        Helper
    } from 'flowbite-svelte'

    import {
      LockSolid
  } from 'flowbite-svelte-icons';
  
    import type { ActionData } from './$types';
  
    let { form }: { form: ActionData } = $props();
    let password: string | null = $state(null)
    let repeatPassword: string | null = $state(null)
  </script>
  
  <svelte:head>
    <title> Reset Password  | LOSF Community </title>
  </svelte:head>
  
  <div class="flex-grow">
    <br />
    <Card size={'lg'} class="container mx-auto">
      <div class="m-10  flex flex-col justify-center max-w-xl">
      <h2 class="justify-center"> Reset Password </h2>
      <br />
      <form method="POST">
          {#if form?.body?.message}
            {#if form?.status == 200}
            <div class="error">
                <p class="text-amber-600">{form?.body?.message}</p>
            </div>
            {:else}
            <div class="error">
                <p class="text-amber-600">{form?.body?.message}</p>
            </div>
            {/if}
          {/if}
          <br />
          <div class="mb-6">
            <Label for="input-group-1" class="block mb-2">Password</Label>
            <Input name="password" type="password" placeholder="password" required bind:value={password}>
              <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </Input>
        </div>
        <div class="mb-6">
            <Label for="input-group-1" class="block mb-2">Repeat Password</Label>
            <Input name="repeat-password" type="password" placeholder="password" required bind:value={repeatPassword}>
              <LockSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </Input>
            {#if password !== repeatPassword}
              <Helper class='mt-2' color='red'><span class="font-medium">Passwords mismatch!</span> make sure the two passwords are the same.</Helper>
            {/if}
        </div>
        {#if password !== repeatPassword}
          <Button disabled pill>Update Password</Button>
        {:else}
          <Button type="submit" pill>Update Password</Button>
        {/if}
      </form>
      <br />
      <div class="mb-6"> 
        <A href="/login">Login</A>
        <br />
        <A href="/register">Register</A>
      </div>
      </div>
    </Card>
  </div>
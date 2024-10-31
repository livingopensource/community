<script lang="ts">
  import {
      Label,
      Input,
      Button,
      Card,
      A
  } from 'flowbite-svelte'

  import {
      EnvelopeSolid,
      UserAddSolid,
      LockSolid
  } from 'flowbite-svelte-icons';

  import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title> Log In  | LOSF Community </title>
</svelte:head>

<div class="flex-grow">
  <br />
  <Card size={'lg'} class="container mx-auto">
    <h2 class="justify-center"> Sign In </h2>
    <form method="POST">
        <div class="mb-6">
          <Label for="email" class="mb-2">Email address</Label>
          <Input type="email" name="email" value={form?.body.email} placeholder="john.mbili@company.com" required />
        </div>
        <div class="mb-6">
          <Label for="password" class="mb-2">Password</Label>
          <Input type="password" name="password" placeholder="•••••••••" required />
        </div>
        {#if form?.body?.messages}
          <div class="error">
            {#each form.body.messages as error}
              <div class="error">
                <p class="dark:text-red-600">{error}</p>
              </div>
            {/each}
          </div>
        {/if}
        <Button pill size="sm" type="submit">
          Sign In
        </Button>
    </form>
    <br />
    <div class="mb-6"> 
      <A href="/register">Or Register</A>
    </div>
</Card>
</div>
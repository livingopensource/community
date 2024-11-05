<script lang="ts">
    import {
        Label,
        Input,
        Button,
        Card,
        A
    } from 'flowbite-svelte'
  
    import type { ActionData } from './$types';
  
      let { form }: { form: ActionData } = $props();
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
          <div class="mb-6">
            <Label for="email" class="mb-2">Email address</Label>
            <Input type="email" name="email" value={form?.body.email} placeholder="john.mbili@company.com" required />
          </div>
          {#if form?.body?.messages}
            {#if form?.status == 200}
            <div class="error">
              {#each form.body.messages as message}
                <div class="success">
                  <p class="text-amber-600">{message}</p>
                </div>
                <br />
              {/each}
            </div>
            {:else}
            <div class="error">
              {#each form.body.messages as message}
                <div class="error">
                  <p class="text-amber-600">{message}</p>
                </div>
                <br />
              {/each}
            </div>
            {/if}
          {/if}
          <Button pill size="sm" type="submit">
            Reset
          </Button>
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
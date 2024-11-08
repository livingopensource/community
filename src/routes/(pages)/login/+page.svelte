<script lang="ts">
  import {
      Label,
      Input,
      Button,
      Card,
      A
  } from 'flowbite-svelte'

  import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";

  import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

  const errorToast = (p0: HTMLDivElement, message: string) => {
    toasts.add({
      title: 'Invalid Credentials',
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
</script>

<svelte:head>
  <title> Log In  | LOSF Community </title>
</svelte:head>

<ToastContainer let:data={data}>
  <FlatToast {data}  />
</ToastContainer>

<div class="flex-grow">
  <br />
  <Card size={'lg'} class="container mx-auto">
    <div class="m-10  flex flex-col justify-center max-w-xl">
    <h2 class="justify-center"> Sign In </h2>
    <br />
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
              <div class="error" use:errorToast={error}>
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
      <br />
      <A href="/forgot-password">Forgot password?</A>
    </div>
    </div>
  </Card>
</div>
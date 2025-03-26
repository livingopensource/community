<script lang="ts">
	import { SignIn } from "@auth/sveltekit/components";
  import { Button, Card, Input, Label } from "flowbite-svelte";

  let email: string = $state("");
</script>

<div class="flex items-center justify-center min-h-screen">
    <Card size={'lg'} class="container mx-auto">
      <div class="m-10  flex flex-col justify-center max-w-xl">
      <h2 class="justify-center mb-10"> Sign In </h2>
      <div class="grid gap-4">
        <div class="mb-6 col-span-2">
          <Input type="email" name="email" bind:value={email} placeholder="user@livingopensource.org" />
          <SignIn provider="nodemailer" class="p-4">
            <span slot="submitButton">
              <input type="hidden" name="email"  bind:value={email} />
              {#if email == null || email == ""}
                <Button pill disabled >Sign In with Email</Button>
              {:else}
                <Button pill>Sign In with Email</Button>
              {/if}
            </span>
          </SignIn>
        </div>
        <div class="grid grid-cols-3 justify-content-center">
            <div>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="h-5 w-5 mr-2">
                <SignIn provider="google" />
            </div>
             <div> Or</div>
            <div>
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" class="h-5 w-5 mr-2">
                <SignIn provider="github" />
            </div>
        </div>
      </div>
    </Card>
</div>

  
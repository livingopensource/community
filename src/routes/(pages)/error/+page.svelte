<script lang="ts">
    import { Button, Card } from "flowbite-svelte";
    import { page } from "$app/state"
  </script>
  
  <div class="flex items-center justify-center min-h-screen">
      <Card size={'lg'} class="container mx-auto">
        <div class="m-10  flex flex-col justify-center max-w-xl">
        <h2 class="justify-center mb-10"> Sign In Error </h2>
        <div class="grid gap-4">
          <h2 class="mt-4 text-xl font-semibold">Verification Failed</h2>
          <p class="mt-2">
            There was a problem when trying to authenticate. Please contact us if this error persists.
            <br />
            {#if page.url.searchParams.get("error") != null}
            <br />
              Error code: {page.url.searchParams.get("error")}
            <br />
              Timestamp: {new Date()}
            {/if}
          </p>
    
          <Button
            class="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Button>
    
          <a href="/signin" class="mt-3 text-sm text-orange-600 hover:underline">Back to Login</a>
        </div>
      </Card>
  </div>
  
<script lang="ts">
  import { Button, Card } from "flowbite-svelte";
</script>

<div class="flex items-center justify-center min-h-screen">
    <Card size={'lg'} class="container mx-auto">
      <div class="m-10  flex flex-col justify-center max-w-xl">
      <h2 class="justify-center mb-10"> Sign In Verification </h2>
      <div class="grid gap-4">
        <h2 class="mt-4 text-xl font-semibold">Check your email</h2>
        <p class="mt-2">
          We've sent a magic link to the email you provided. Click the
          link in your email to log in.
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

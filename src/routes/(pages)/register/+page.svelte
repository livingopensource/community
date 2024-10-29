<script>
    import {
        Label,
        Input,
    } from 'flowbite-svelte'

    import {
        EnvelopeSolid
    } from 'flowbite-svelte-icons';
</script>
<svelte:head>
  <title> Register  | LOSF Community </title>
</svelte:head>

<div class="flex-grow">
    <div class="m-10  flex flex-col justify-center items-center">
        <div class="mb-6">
            <Label for="input-group-1" class="block mb-2">Your Email</Label>
            <Input id="email" type="email" placeholder="name@flowbite.com">
              <EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </Input>
        </div>
    </div>
</div>
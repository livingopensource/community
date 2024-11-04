<script lang="ts">
  import {
    Card
  } from 'flowbite-svelte';
  import type { PageServerData } from './$types'; 
  let {data}: {data: PageServerData} = $props();
  import Editor from '@tinymce/tinymce-svelte';
  let conf = {
    height: 500,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
  }
</script>
  <svelte:head>
    <title> LOSF Conference | Dashboard Membership</title>
  </svelte:head>
  
  <div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <h1 class="p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
        {data.membership.name} Membership Details
      </h1>
      <div class="flex flex-wrap justify-center gap-4 p-5 text-center">
        <div class="flex-auto sm:w-max md:w-max w-full">
          <h1 class="dark:text-white">Membership Subscriptions</h1>
          <br />
          <Editor
            licenseKey='gpl'
            scriptSrc='/tinymce/tinymce.min.js'
            value={data.membership.description}
            {conf}
          />
        </div>
        <div class="flex-auto w-14">
          <h1 class="dark:text-white">
            You don't have an active membership subscription
          </h1>
          <br />
            <div class="flex justify-center">
              <enhanced:img src="/src/lib/assets/images/404.svg" alt="error" />
            </div>
        </div>
      </div>
    </div>
  </div>

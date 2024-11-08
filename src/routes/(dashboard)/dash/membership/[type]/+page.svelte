<script lang="ts">
  import {
    Card,
    Badge
  } from 'flowbite-svelte';
  import {
    EditOutline
  } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte'; 
  import type { PageServerData } from './$types'; 
  let {data}: {data: PageServerData} = $props();
  import Editor from '@tinymce/tinymce-svelte';
  let conf = {
    skin: 'oxide-dark',
    height: 500,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
      'emoticons', 'table'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | table alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | emoticons | fullscreen'
  }

  let content = $state(null)
  let title = $state(null)
  let description = $state(null)
  let amount = $state(null)
  let name = $state(null)

  onMount(() => {
    name = data.membership.name
    title = data.membership.subTitle
    description = data.membership.description
    amount = data.membership.amount
    content = data.membership.name
  })

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
            cssClass="material-classic"
            licenseKey='gpl'
            scriptSrc='/tinymce/tinymce.min.js'
            bind:value={content}
            {conf}
          />
          
        </div>
        <div class="flex-auto w-14">
          <Card class="text-left">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {@html name}
                  <EditOutline onclick={()=> {
                    content = name
                  }}/>
              </h5>
              
              <p class="mb-5 p-5 font-xs text-gray-700 dark:text-gray-400">
                  {@html title}
                  <EditOutline onclick={()=> {
                    content = title
                  }}/>
              </p>
              
              <Badge rounded large color="dark" class="text-2xl font-bold">{amount}</Badge>
              <EditOutline onclick={()=> {
                content = amount
              }}/>
              <p class="mt-5 font-normal text-gray-700 dark:text-gray-400">
                  {@html description}
                  <EditOutline onclick={()=> {
                    content = description
                  }}/>
              </p>
              <br />
          </Card>
        </div>
      </div>
    </div>
  </div>

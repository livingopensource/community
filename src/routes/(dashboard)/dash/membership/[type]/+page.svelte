<script lang="ts">
  import {
    Card,
    Badge
  } from 'flowbite-svelte';
  import {
    EditOutline
  } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte'; 

  let {data}  = $props();
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

  let content = $state(data.membership?.subTitle)
  let type = $state("title")
  let title = $state(data.membership?.subTitle)
  let description = $state(data.membership?.description)
  let amount = $state(data.membership?.amount.toString())
  let name = $state(data.membership?.name)

  onMount(() => {
    name = data.membership?.name
    title = data.membership?.subTitle
    description = data.membership?.description
    amount = data.membership?.amount.toString()
    content = data.membership?.subTitle
  })

  $effect(() => {
    switch (type) {
      case "title":
        title = content
        break;
      case "description":
        description = content
        break;
      case "amount":
        amount = content
        break;
      case "name":
        name = content
        break;
      default:
        break;
    }
  })

</script>
  <svelte:head>
    <title> LOSF Conference | Dashboard Membership</title>
  </svelte:head>
  
  <div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <h1 class="mx-10 p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
        {data.membership?.name} Membership Details
      </h1>
      <div class="mx-10 flex flex-wrap justify-center gap-4 p-5 text-center">
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
                    type = "name"
                    content = name
                  }}/>
              </h5>
              
              <p class="mb-5 p-5 font-xs text-gray-700 dark:text-gray-400">
                  {@html title}
                  <EditOutline onclick={()=> {
                    type = "title"
                    content = title
                  }}/>
              </p>
              
              <Badge rounded large color="dark" class="text-2xl font-bold">{amount}</Badge>
              <EditOutline onclick={()=> {
                type = "amount"
                content = amount
              }}/>
              <p class="mt-5 font-normal text-gray-700 dark:text-gray-400">
                  {@html description}
                  <EditOutline onclick={()=> {
                    type = "description"
                    content = description
                  }}/>
              </p>
              <br />
          </Card>
        </div>
      </div>
    </div>
  </div>

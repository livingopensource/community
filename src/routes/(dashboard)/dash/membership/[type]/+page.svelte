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
  let membershipData: {
    editingObject: string,
    name: string,
    title: string,
    description: string,
    amount: number
  } = $state({
    editingObject: 'secription',
    name: data.membership.name,
    title: data.membership.subTitle,
    description: data.membership.description,
    amount: data.membership.amount,
  });
  let content = $state(data.membership.content);
  onMount(() => {
    membershipData = {
    editingObject: 'secription',
    name: data.membership.name,
    title: data.membership.subTitle,
    description: data.membership.description,
    amount: data.membership.amount,
  }
  })

  function debounceEdit(data: string) {
   switch (membershipData.editingObject) {
     case 'name':
       membershipData.name = data;
       console.log(data+" "+membershipData.name+" "+membershipData.editingObject);
       return membershipData
     case 'title':
       membershipData.title = data;
       return membershipData
     case 'description':
       membershipData.description = data;
       return membershipData
     default:
       return membershipData;
   }
  }

  // membershipData = $derived(debounceEdit(content))
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
            value={content}
            {conf}
          />
        </div>
        <div class="flex-auto w-14">
          <Card class="text-left">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {membershipData.name}
                  <EditOutline onclick={()=> {
                    content = membershipData.name;
                    membershipData.editingObject = 'name';
                  }}/>
              </h5>
              
              <p class="mb-5 p-5 font-xs text-gray-700 dark:text-gray-400">
                  {membershipData.title}
                  <EditOutline onclick={()=> {
                    content = membershipData.title
                    membershipData.editingObject = 'title';
                  }}/>
              </p>
              
              <Badge rounded large color="dark" class="text-2xl font-bold">{membershipData.amount}</Badge>
              <EditOutline onclick={()=> {
                content = membershipData.amount
                membershipData.editingObject = 'amount';
              }}/>
              <p class="mt-5 font-normal text-gray-700 dark:text-gray-400">
                  {membershipData.description}
                  <EditOutline onclick={()=> {
                    content = membershipData.description
                    membershipData.editingObject = 'description';
                  }}/>
              </p>
              <br />
          </Card>
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

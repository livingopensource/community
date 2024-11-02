<script lang="ts">
    import { page } from '$app/stores';
    import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
    import { onMount, onDestroy } from 'svelte';
    import {
      Table,
      TableBody,
      TableBodyCell,
      TableBodyRow,
      TableHead,
      TableHeadCell,
      ImagePlaceholder,
      Modal,
      Card,
      Button
    } from 'flowbite-svelte';
    import {
      ArrowRightOutline,
      PlusOutline
    } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';
      import type { PageServerLoad } from './$types';
    let data: {data: PageServerLoad} = $props();
    console.log(data)
    let element: any;
	let editor: Editor;
    onMount(() => {
        editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: data.data.membership.description,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
		});
    });

    onDestroy(() => {
        if (editor) {
			editor.destroy();
		}
    });
  </script>
  <svelte:head>
    <title> LOSF Conference | Dashboard Membership</title>
  </svelte:head>
  
  <div class="flex-grow">
    <div class="flex flex-col justify-center px-6 mx-auto xl:px-0">
      <h1 class="p-5 mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-xl dark:text-white">
        {data.data.membership.name} Membership Details
      </h1>
      <div class="flex flex-wrap justify-center gap-4 p-5 text-center">
        <div class="flex-auto sm:w-max md:w-max">
          <h1 class="dark:text-white">Membership Subscriptions</h1>
          <br />
          <Card>
            <div bind:this={element}></div>
          </Card>
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
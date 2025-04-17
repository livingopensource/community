<script>
    import NavigationLoader from "$lib/components/NavigationLoader.svelte";
	  import { Toaster } from 'svelte-sonner'
</script>
<NavigationLoader 
	animationDuration={250} 
	color="#FF8C00" 
	height={3} 
/>

<Toaster richColors />

<slot />
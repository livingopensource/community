<script>
    import NavigationLoader from "$lib/components/NavigationLoader.svelte";
	import { Toasts } from 'svoast';

</script>
<NavigationLoader 
	animationDuration={250} 
	color="#FF8C00" 
	height={3} 
/>

<Toasts position="bottom-right" />
<slot />
<script lang="ts">
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';

	export let animationDuration = 250;
	export let color: string = '#7fffd4';
	export let height = 4;

	let currentState: 'waiting' | 'loading' | 'doneLoading' | 'cleanupLoading' = 'waiting';

	let resetTimeout: number | undefined = undefined;

	onMount(() => {
		navigating.subscribe((n) => {
			if (n) {
				currentState = 'loading';
			} else {
				if (currentState == 'loading') {
					currentState = 'doneLoading';

					if (resetTimeout) {
						clearTimeout(resetTimeout);
						resetTimeout = undefined;
					}

					// Start cleanup animation
					resetTimeout = window.setTimeout(() => {
						currentState = 'cleanupLoading';
						resetTimeout = window.setTimeout(() => {
							currentState = 'waiting';
						}, animationDuration);
					}, animationDuration);
				}
			}
		});
	});
</script>

<div class="navigation-loader-container" style="--height: {height}px">
	<div
		class="navigation-loader-loading-bar {currentState}"
		style="background-color: {color}; --duration: {animationDuration}ms">
    </div>
</div>

<style lang="scss">
	.navigation-loader-container {
		z-index: 99999;
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		min-width: 100vw;
		width: 100%;
		height: var(--height);

		.navigation-loader-loading-bar {
			display: block;
			height: 100%;
			transition: opacity ease-in-out var(--duration);

			&.waiting {
				width: 0;
				opacity: 0;
			}

			&.loading {
				transition: width cubic-bezier(0, 0.55, 0.45, 1) 20s;
				width: 50%;
				opacity: 1;
			}

			&.doneLoading {
				transition: width ease-in-out var(--duration);
				width: 100%;
				opacity: 1;
			}

			&.cleanupLoading {
				transition: opacity ease-in-out var(--duration);
				opacity: 0;
				width: 100%;
			}
		}
	}
</style>
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
	plugins: [
		enhancedImages(),
		viteStaticCopy({
		  targets: [
		    { src: 'node_modules/tinymce/*', dest: 'static/tinymce' }
		  ]
		}),
		sveltekit()
	],
	server: {
		host: '0.0.0.0'
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

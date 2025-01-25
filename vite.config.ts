import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
	build: {
		target: "es2022"
	},
	plugins: [
		enhancedImages(),
		viteStaticCopy({
		  targets: [
		    { src: 'node_modules/tinymce/*', dest: 'static/tinymce' },
		  ]
		}),
		sveltekit()
	],
	server: {
		host: '0.0.0.0',
		port: 3000
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

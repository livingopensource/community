import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
	plugins: [
		enhancedImages(),
		viteStaticCopy({
		  targets: [
		    { src: 'node_modules/tinymce/*', dest: 'static/tinymce' },
			{ src: 'scrollbar.css', dest: '' },
			{ src: 'serviceWorker.js', dest: '' },
			{ src: 'login.html', dest: '' },
			{ src: 'assets/', dest: '' },
			{ src: 'documents/', dest: '' }
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

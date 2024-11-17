import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
	resolve: {
		alias: {
			'/config_terminal': process.env.WEBVM_MODE == "github" ? 'config_github_terminal.js' : 'config_public_terminal.js',
			"@leaningtech/cheerpx": process.env.CX_URL ? process.env.CX_URL : "@leaningtech/cheerpx"
		}
	},
	build: {
		target: "es2022"
	},
	plugins: [
		enhancedImages(),
		viteStaticCopy({
		  targets: [
		    { src: 'node_modules/tinymce/*', dest: 'static/tinymce' },
			{ src: 'scrollbar.css', dest: '' },
			{ src: 'serviceWorker.js', dest: '' },
			{ src: 'login.html', dest: '' }
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

import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import svgr from "vite-plugin-svgr";

export default defineConfig({
	mode: "development",
	base: "/",
	build: {
		outDir: "../build",
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "src"),
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	plugins: [
		react(),
		svgr({ include: "**/*.svg" }),
		createHtmlPlugin({
			minify: true,
			pages: [
				{
					entry: "src/index.tsx",
					filename: "index.html",
					template: "/index.html",
				},
			],
		}),
	],
	css: {
		modules: {
			localsConvention: "camelCase",
		},
	},
});

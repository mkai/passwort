import path from "node:path"
import { writeFileSync } from "node:fs"
import { defineConfig, type Plugin } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

const loaderPlugin = (): Plugin => {
  return {
    name: "generate-loader",
    writeBundle(options, bundle) {
      // Find the main entry point JS file
      const mainEntry = Object.entries(bundle).find(
        ([name]) => name.startsWith("assets/index-") && name.endsWith(".js"),
      )

      if (!mainEntry) {
        return
      }

      // Create loader script content
      const loaderContent = `
        (function(){
          const currentScript = document.currentScript;
          const baseUrl = currentScript ? new URL('.', currentScript.src).href : '/';
          const script = document.createElement('script');
          script.type = 'module';
          script.src = baseUrl + '${mainEntry[0]}';
          document.head.appendChild(script);
        })();
      `

      // Write loader file to dist
      writeFileSync(
        path.join(options.dir || "dist", "loader.js"),
        loaderContent,
      )
    },
  }
}

export default defineConfig({
  plugins: [svelte(), loaderPlugin()],
})

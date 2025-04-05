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
        throw new Error("failed to generate loader: main entry not found")
      }

      const [mainEntrySrc] = mainEntry

      // Generate the content of the loader script. Uses `document.currentScript`
      // to determine its own absolute URL dynamically at runtime, so that it can
      // refer to the correct main entry point hosted on the same domain.
      const loaderContent = `
        (function(){
          const currentScript = document.currentScript;
          const baseUrl = currentScript ? new URL('.', currentScript.src).href : '/';
          const script = document.createElement('script');
          script.type = 'module';
          script.src = baseUrl + '${mainEntrySrc}';
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

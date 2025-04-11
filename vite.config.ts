import path from "node:path"
import { writeFileSync } from "node:fs"
import { defineConfig, type Plugin } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

const loaderPlugin = (): Plugin => {
  return {
    name: "loader-plugin",
    writeBundle(options, bundle) {
      const generatorEntry = Object.entries(bundle).find(
        ([name]) =>
          name.startsWith("assets/generator-") && name.endsWith(".js"),
      )
      if (!generatorEntry) {
        throw new Error("failed to generate loader: entry not found")
      }

      const [generatorEntrySrc] = generatorEntry

      // Generate the content of the loader script. Uses `document.currentScript`
      // to determine its own absolute URL dynamically at runtime, so that it can
      // refer to the correct script file hosted on the same domain.
      const loaderContent = `
        (function(){
          const currentScript = document.currentScript;
          const baseUrl = currentScript ? new URL('.', currentScript.src).href : '/';
          const script = document.createElement('script');
          script.type = 'module';
          script.src = baseUrl + '${generatorEntrySrc}';
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
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src", "main.ts"),
        generator: path.resolve(__dirname, "src", "PasswordGenerator.svelte"),
      },
    },
  },
})

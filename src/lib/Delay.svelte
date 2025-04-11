<script lang="ts">
  import { onDestroy } from "svelte"

  export let timeout: number

  let show = false
  const timeoutId = setTimeout(() => (show = true), timeout)

  onDestroy(() => clearTimeout(timeoutId))
</script>

{#if show}
  <slot />
{/if}

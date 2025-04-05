<script>
  export let variant = "primary"
  export let onclick
</script>

<button class={variant} {onclick}>
  <slot />
</button>

<style>
  button {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }

  button.primary {
    background-color: blue;
    color: white;
  }

  button.secondary {
    background-color: gray;
    color: white;
  }
</style>

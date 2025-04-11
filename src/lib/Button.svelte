<script lang="ts">
  type ButtonVariant = "primary" | "secondary"

  export let variant: ButtonVariant = "primary"
  export let onclick
</script>

<button class="btn btn-{variant}" {onclick}>
  <slot />
</button>

<style>
  .btn {
    width: 100%;
    display: inline-block;
    font-family: var(--font-display, sans-serif);
    border-radius: 0.5rem;
    max-width: 100%;
    padding: 0.75rem 1.5rem;
    -webkit-font-smoothing: antialiased;
    transition: all 150ms ease-in-out;
    user-select: none;
    text-align: center;
  }

  .btn:disabled {
    background-color: #e5e7eb;
    color: #6b7280;
  }

  .btn-primary {
    font-weight: 600;
    background-color: #60a5fa;
    color: black;
  }

  .btn-primary:hover {
    background-color: #3b82f6;
  }

  .btn-primary:active {
    background-color: #2563eb;
  }

  .btn-secondary {
    font-weight: 600;
    background-color: #9ca3af;
    color: black;
  }

  .btn-secondary:hover {
    background-color: #6b7280;
  }

  .btn-secondary:active {
    background-color: #2563eb;
  }
</style>

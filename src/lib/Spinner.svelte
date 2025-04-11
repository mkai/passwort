<script lang="ts">
  export let trackColor = "#ffffff"
  export let strokeColor = "#000000"
</script>

<div class="animate-spin">
  <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
    <path
      d="M18 34C26.8366 34 34 26.8366 34 18C34 9.16344 26.8366 2 18 2C9.16344 2 2 9.16344 2 18C2 26.8366 9.16344 34 18 34Z"
      stroke={trackColor}
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      d="M18 34C9.16344 34 2 26.8366 2 18"
      stroke={strokeColor}
      stroke-width="4"
    />
  </svg>
</div>

<style>
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<script lang="ts">
  import { generatePassword } from "./generatePassword"

  type Props = {
    wordlist: string[]
    numWords?: number
  }

  let { wordlist, numWords = 4 }: Props = $props()

  let password: string = $state("")

  const onGenerateClicked = (event: MouseEvent) => {
    event.preventDefault()

    password = generatePassword({ wordlist, numWords })
  }
</script>

<div>
  <button onclick={onGenerateClicked}>Generate password</button>
  <div class="result">
    {#if password}
      <output>
        <pre>{password}</pre>
      </output>
    {/if}
  </div>
</div>

<style>
  .result {
    margin-top: 1em;
    padding: 0 1em;
    min-height: 3em;
    background: aliceblue;
    display: flex;
    align-items: center;
  }
</style>

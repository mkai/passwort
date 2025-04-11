<svelte:options
  customElement={{
    tag: "password-generator",
    props: {
      numWords: { type: "Number", attribute: "words", reflect: true },
      wordlistName: { attribute: "wordlist", reflect: true },
      language: { reflect: true },
    },
  }}
/>

<script lang="ts">
  import { getWordlist } from "./lib/getWordlist"
  import { generatePassword } from "./lib/generatePassword"
  import Delay from "./lib/Delay.svelte"
  import Spinner from "./lib/Spinner.svelte"
  import Button from "./lib/Button.svelte"
  import { type WordlistName, type LanguageCode } from "./types"

  type Props = {
    wordlistName: WordlistName
    language: LanguageCode
    numWords?: number
  }

  let { wordlistName, language, numWords = 4 }: Props = $props()

  let wordlist: string[] | undefined = $state<string[]>()
  let password: string | undefined = $state()

  async function initialize() {
    wordlist = await getWordlist({
      name: wordlistName,
      language,
      minLength: 7776,
    })

    // Generate a password when the component is first loaded
    password = generatePassword({ wordlist, numWords })
  }

  function onGenerateClicked(event: MouseEvent) {
    event.preventDefault()

    if (wordlist) {
      password = generatePassword({ wordlist, numWords })
    }
  }

  async function onCopyClicked(event: MouseEvent) {
    event.preventDefault()

    if (password) {
      try {
        await navigator.clipboard.writeText(password)
      } catch (err: unknown) {
        console.error("Could not copy password: ", err)
      }
    }
  }
</script>

<div class="container">
  {#await initialize()}
    <div class="spinner-container">
      <Delay timeout={1000}>
        <div class="spinner-wrapper">
          <Spinner />
        </div>
      </Delay>
    </div>
  {:then}
    <output class="password-output">
      <pre>{password}</pre>
    </output>

    <div class="button-container">
      <div class="button-wrapper">
        <Button onclick={onGenerateClicked}>Refresh</Button>
      </div>
      <div class="button-wrapper">
        <Button variant="secondary" onclick={onCopyClicked}>Copy</Button>
      </div>
    </div>
  {:catch err}
    <p>Error loading wordlist: {err.message}</p>
  {/await}
</div>

<style>
  .container {
    min-height: 200px;
    background-color: #f3f4f6;
  }

  .spinner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .spinner-wrapper {
    height: 2rem;
    width: 2rem;
  }

  .password-output {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.125rem;
    background-color: #f3f4f6;
    padding: 1rem;
    border: 1px solid #d1d5db;
  }

  .button-container {
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    gap: 0.5rem;
  }

  .button-wrapper {
    flex: 1;
  }
</style>

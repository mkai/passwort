<script lang="ts">
  import { getWordlist } from "./getWordlist"
  import { generatePassword } from "./generatePassword"
  import Headline from "./Headline.svelte"
  import Button from "./Button.svelte"
  import { type WordlistName, type LanguageCode } from "../types"

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
      minLength: 800, // FIXME: bigger word lists (not enough entropy)
    })

    // Generate a password when the component is first loaded
    password = generatePassword({ wordlist, numWords })
  }

  function onGenerateClicked(event: MouseEvent) {
    event.preventDefault()

    if (!wordlist) {
      return
    }

    password = generatePassword({ wordlist, numWords })
  }

  async function onCopyClicked(event: MouseEvent) {
    event.preventDefault()

    if (!password) {
      return
    }

    try {
      await navigator.clipboard.writeText(password)
    } catch (err: unknown) {
      console.error("Could not copy password: ", err)
    }
  }
</script>

{#await initialize()}
  <p>Loading…</p>
{:then}
  <Headline>Generated password</Headline>
  <output>
    <pre>{password}</pre>
  </output>
  <div class="toolbar">
    <Button onclick={onGenerateClicked}>Refresh</Button>
    <Button variant="secondary" onclick={onCopyClicked}>Copy</Button>
  </div>
{:catch err}
  <p>Error loading wordlist: {err.message}</p>
{/await}

<style>
</style>

<svelte:options customElement="password-generator" />

<script lang="ts">
  import { type ChangeEventHandler } from "svelte/elements"
  import PasswordGenerator from "./lib/PasswordGenerator.svelte"
  import { getWordlist } from "./lib/getWordlist"
  import {
    languages,
    wordlists,
    isSupportedLanguageCode,
    isSupportedWordlistName,
    type LanguageCode,
    type WordlistName,
  } from "./types"

  let language: LanguageCode = $state<LanguageCode>("en")
  let numWords: number = $state<number>(4)
  let wordlistName: WordlistName = $state<WordlistName>("1000-common")

  const handleLanguageChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const selectElement = event.currentTarget
    const value = selectElement?.value
    if (isSupportedLanguageCode(value)) {
      language = value
    }
  }

  const handleNumWordsChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const selectElement = event.currentTarget
    const value = selectElement?.value
    if (["3", "4", "5", "6"].includes(value)) {
      numWords = Number(value)
    }
  }

  const handleWordlistNameChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const selectElement = event.currentTarget
    const value = selectElement?.value
    if (isSupportedWordlistName(value)) {
      wordlistName = value
    }
  }
</script>

<main>
  <section class="generator">
    {#await getWordlist({ name: wordlistName, language, minLength: 1000 })}
      <p>Loading wordlist...</p>
    {:then wordlist}
      <PasswordGenerator {wordlist} {numWords} />
    {:catch err}
      <p>Error loading wordlist: {err.message}</p>
    {/await}
  </section>

  <section class="controls">
    <select name="language" onchange={handleLanguageChange}>
      {#each Object.entries(languages) as [languageCode, name]}
        <option value={languageCode}>{name}</option>
      {/each}
    </select>

    <select name="num-words" onchange={handleNumWordsChange}>
      {#each [4, 5, 6] as numWords}
        <option value={numWords}>{numWords} words</option>
      {/each}
    </select>

    <select name="wordlist" onchange={handleWordlistNameChange}>
      {#each Object.entries(wordlists) as [key, name]}
        <option value={key}>{name}</option>
      {/each}
    </select>
  </section>
</main>

<style>
  .generator {
    min-height: 100px;
  }
</style>

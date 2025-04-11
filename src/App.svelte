<script lang="ts">
  import { type ChangeEventHandler } from "svelte/elements"
  import Heading1 from "./lib/Heading1.svelte"
  import PasswordGenerator from "./PasswordGenerator.svelte"
  import {
    languages,
    wordlists,
    isSupportedLanguageCode,
    isSupportedWordlistName,
    type LanguageCode,
    type WordlistName,
  } from "./types"

  let language: LanguageCode = $state<LanguageCode>("de")
  let numWords: number = $state<number>(5)
  let wordlistName: WordlistName = $state<WordlistName>("diceware")

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
  <Heading1>Password Generator</Heading1>
  <section class="generator">
    <PasswordGenerator {wordlistName} {language} {numWords} />
  </section>

  <section class="controls">
    <select name="language" onchange={handleLanguageChange}>
      {#each Object.entries(languages) as [languageCode, name]}
        <option value={languageCode} selected={languageCode === language}
          >{name}</option
        >
      {/each}
    </select>

    <select name="num-words" onchange={handleNumWordsChange}>
      {#each [4, 5, 6] as numWordsChoice}
        <option value={numWordsChoice} selected={numWordsChoice === numWords}
          >{numWordsChoice} words</option
        >
      {/each}
    </select>

    <select name="wordlist" onchange={handleWordlistNameChange}>
      {#each Object.entries(wordlists) as [key, name]}
        <option value={key} selected={key === wordlistName}>{name}</option>
      {/each}
    </select>
  </section>
</main>

<style>
  main {
    max-width: 992px;
  }
</style>

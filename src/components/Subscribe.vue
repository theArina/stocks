<script>
  import Button from './Button.vue'
  import { store } from '../store.js'

  export default {
    components: {
      Button
    },
    data() {
      return {
        isin: '',
        isInvalid: false,
        warning: false
      }
    },
    methods: {
      async subscribe(e) {
        e.preventDefault()
        try {
          store.validateISIN(this.isin)
        } catch (e) {
          this.isInvalid = true
          return
        }
        try {
          store.checkISINPresence(this.isin)
        } catch (e) {
          this.warning = e.message
          return
        }
        await store.subscribe(this.isin)
        this.isin = ''
      },
      onChange({ target: { value } }) {
        const isValid = /^\w{0,12}$/.test(value)
        this.isInvalid = !isValid
        this.warning = false
      }
    }
  }
</script>

<template>
  <form @submit="subscribe">
    <h3>Add new subscription:</h3>
    <label for="isin-text-field">ISIN:</label>
    <input
        type="text"
        class="text-field"
        id="isin-text-field"
        placeholder="e.g. US0378331005"
        autocomplete="off"
        name="isin"
        v-model="isin"
        @input="onChange"
    />
    <Button type="submit" text="Subscribe" :disabled="isInvalid"/>
    <sub v-if="warning" class="warning-sub">
      {{ warning }}
    </sub>
    <sub v-if="isInvalid" class="invalid-sub">
      Please, enter valid ISIN.
      <br/>
      Example: US0378331005
    </sub>
  </form>
</template>

<style>
  .text-field {
    display: block;
    margin: 0 0 12px 0;
    padding: 12px 0;
    border: none;
    border-bottom: 1px solid;
    border-color: var(--color-foreground3);
    background: transparent;
    color: var(--color-foreground3);
  }

  .text-field:focus {
    outline: none;
    border-bottom: 2px solid;
  }

  .invalid-sub {
    color: crimson;
  }

  .warning-sub {
    color: brown;
  }
</style>

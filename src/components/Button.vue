<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      // type: { // TODO: colors
      //   type: String
      // },
      onClick: {
        type: Function
      }
    }
  }
</script>

<template>
  <button v-bind="$attrs" class="button" @click="this.onClick">
    <span class="button-content">
      {{ text }}
    </span>
  </button>
</template>

<style>
  .button {
    display: block;
    padding: 4px 12px;
    border: none;
    border-radius: 2px;
    background: var(--color-primary-blue2);
    color: var(--color-foreground3);
  }

  .button:hover {
    background: var(--color-primary-blue3);
  }

  .button:active {
    background: var(--color-primary-blue1);
  }

  .button:disabled {
    background: var(--color-primary-blue1);
  }

  .button:disabled .button-content {
    color: var(--app-foreground1);
    cursor: not-allowed;
  }
</style>

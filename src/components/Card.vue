<template>
  <div class="card">
    <slot/>
  </div>
</template>

<style>
  :root {
    --shadow-card: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }

  .card {
    padding: 12px;
    border: 1px solid var(--color-foreground4);
    border-radius: 6px;
    box-shadow: var(--shadow-card);
  }
</style>

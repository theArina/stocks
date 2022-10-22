<script>
  import Card from './Card.vue'
  import Button from './Button.vue'
  import '../index.css'
  import { store } from '../store.js'

  export default {
    components: {
      Card,
      Button
    },
    data() {
      return {
        store
      }
    }
  }
</script>

<template>
  <h3>
    Watch list{{ Object.keys(store.subscriptions).length ? ':':' will be displayed here' }}
  </h3>
  <ul class="list" v-for="(price, isin) in store.subscriptions">
    <Card>
      <h5>{{ isin }}</h5>
      <p>
        <strong>Price:</strong>
        {{ price || 'OUT OF DATE' }}
      </p>
      <Button text="Unsubscribe" @click="() => store.unsubscribe(isin)"/>
    </Card>
  </ul>
</template>

<style>
  .list {
    padding: 0;
  }

  h5 {
    margin: 0 auto;
  }
</style>

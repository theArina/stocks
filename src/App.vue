<script>
  import './index.css'
  import Header from './components/Header.vue'
  import Subscribe from './components/Subscribe.vue'
  import WatchList from './components/WatchList.vue'
  import { addSocketEventListener, removeSocketEventListener, closeConnection } from './web-socket'
  import { store } from './store.js'

  export default {
    components: {
      Header,
      Subscribe,
      WatchList
    },
    methods: {
      onMessage(event) {
        store.onMessage(event.data)
      },
      onOpenConnection() {
        this.setWSListeners()
      },
      onCloseConnection() {
        this.setWSListeners()
        store.onCloseConnection()
      },
      setWSListeners() {
        addSocketEventListener('message', this.onMessage)
        addSocketEventListener('open', this.onOpenConnection)
        addSocketEventListener('close', this.onCloseConnection)
      }
    },
    mounted() {
      this.setWSListeners()
    },
    unmounted() {
      removeSocketEventListener('message', this.onMessage)
      removeSocketEventListener('open', this.onOpenConnection)
      removeSocketEventListener('close', this.onCloseConnection)
      closeConnection()
    }
  }
</script>

<template>
  <Header/>
  <main class="main">
    <div class="flex-box">
      <div class="column">
        <Subscribe/>
      </div>
      <div class="column">
        <WatchList/>
      </div>
    </div>
  </main>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .main {
    max-width: var(--max-width);
    margin: 0 5%;
  }

  .flex-box {
    display: flex;
    margin: 0;
    flex-wrap: wrap;
  }

  .column {
    padding: 10px;
    flex: 45%;
  }

  @media (max-width: 700px) {
    .column {
      flex: 100%;
    }
  }
</style>

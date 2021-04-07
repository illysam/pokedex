<template>
  <Header :email="config.email" :about="config.about" />
</template>

<script>
import Header from './components/Header.vue'
import config from './config.json'

export default {
  name: 'App',
  data(){
    return {
      config,
    }
  },
  components: {
    Header
  }
}
</script>

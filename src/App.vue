<template>
  <Header :email="config.email" :about="config.header.about" />
  <Footer :text="config.footer.text"></Footer>
</template>

<script>
import Footer from './components/Footer.vue'
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
    Header,
    Footer,
  }
}
</script>

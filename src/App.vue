<template>
  <Header :about="config.header.about" :email="config.email" :title="config.title" />
  <Main :title="config.title" :text="config.main.text" :pokemons=this.$store.getters.pokemonsOnPage />
  <Footer :text="config.footer.text"></Footer>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import config from './config.json'

export default {
  name: 'App',
  data(){
    return {
      config,
    }
  },
  components: {
    Footer,
    Header,
    Main,
  },
}
</script>

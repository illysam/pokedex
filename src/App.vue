<template>
<div>
  <Header :about="content.header.about" :email="content.email" :title="content.title" />
  <router-view />
  <Footer :text="content.footer.text"></Footer>
</div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import content from './content.json'

export default {
  name: 'App',
  data () {
    return {
      content
    }
  },
  components: {
    Footer,
    Header
  }
}
</script>

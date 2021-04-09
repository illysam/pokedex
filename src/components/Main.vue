<template>
  <main role="main">
    <section class="jumbotron text-center">
      <div class="container">
        <p>
          <img class="image-fluid" alt="Pokémon logo" src="../assets/International_Pokémon_logo.svg" />
        </p>
        <h1 class="jumbotron-heading">{{ title }}</h1>
        <p class="lead text-muted">{{ text }}</p>
      </div>
    </section>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <Card v-for="pokemon in pokemonsOnPage" :key="pokemon.name" :name=pokemon.name />
        </div>
      </div>
      <Pagination 
        :currentPage=this.$store.state.page
        :next=this.$store.state.next
        :previous=this.$store.state.previous
        :totalNumberOfPages=this.$store.state.totalNumberOfPages 
      />
    </div>
  </main>
</template>

<script>
import Card from './Card.vue'
import Pagination from './Pagination.vue'

export default {
  name: 'Main',
  props: {
    pokemonsOnPage: {
      type: Array,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  created: function(){
    this.$store.dispatch('initializePokemonPage')
  },
  components: {
    Card,
    Pagination,
  },
}
</script>

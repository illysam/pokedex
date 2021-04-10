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
          <Card v-for="pokemon in pokemonsOnPage" :key="pokemon.name" :pokemon=$store.state.pokemons[pokemon.name] />
        </div>
      </div>
      <Pagination 
        :currentPage=this.$store.state.page
        :hasNext=!!this.$store.state.next
        :hasPrevious=!!this.$store.state.previous
        :limit=this.$store.state.limit
        :totalNumberOfPages=this.$store.state.totalNumberOfPages 
      />
    </div>
  </main>
</template>

<script>
import Card from '../components/Card.vue'
import Pagination from '../components/Pagination.vue'

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
    const params = new URLSearchParams(document.location.search);

    let page = params.get('page')
    if(!page) {
      page = 1
      params.set('page', page)
      window.history.replaceState({}, '', `${location.pathname}?${params}`);
    }
    this.$store.dispatch('setPage', Number(page))
  },
  components: {
    Card,
    Pagination,
  },
  watch: {
    $route(to, _) {
      this.$store.dispatch('setPage', Number(to.query.page) )
    }
  }
}
</script>

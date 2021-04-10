<template>
  <main role="main">
    <section class="jumbotron text-center">
      <div class="container">
        <p>
          <img class="image-fluid jumbotron-image-small border border-dark rounded" :src="pokemon?.sprites?.front_default" :alt="pokemon?.name" />
        </p>
        <h1 class="jumbotron-heading text-uppercase">{{ pokemon?.name }}</h1>
        <p class="lead text-muted">{{ pokemon?.name }}</p>
      </div>
    </section>
  </main>
</template>

<script>

export default {
  name: 'Pokemon',
  created: function(){
    this.$store.commit('setPokemon', this.$route.params.name)
  },
  computed: {
    pokemon(){
      return this.$store.state.pokemons.get(this.$route.params.name)
    }
  },
}
</script>

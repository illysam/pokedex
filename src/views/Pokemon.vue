<template>
  <main role="main">
    <section class="jumbotron text-center mb-0">
      <div class="container">
        <p>
          <img class="image-fluid jumbotron-image-small border border-dark rounded" :src="pokemon?.sprites?.front_default" :alt="pokemon?.name" />
        </p>
        <h1 class="jumbotron-heading text-uppercase">{{ pokemon?.name }}</h1>
        <p class="lead text-muted" v-if="!!pokemonSpecies?.evolves_from_species">
          Evolves from <router-link class="text-capitalize" :to="{name: 'pokemon', params: { name: pokemonSpecies.evolves_from_species.name }}">{{ pokemonSpecies.evolves_from_species.name }}</router-link>
        </p>
        <!-- <p class="lead text-muted" v-else>{{ pokemonSpecies.evolves_from_species.name }}</p> -->
        <div class="container w-50 d-flex justify-content-between">
          <table class="table table-sm  table-striped">
            <thead>
              <tr>
                <th scope="col">Property</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Species</th>
                <td class="text-capitalize">{{ pokemon?.species.name }}</td>
              </tr>
              <tr>
                <th scope="row">HP</th>
                <td>{{ getStat('hp') }}</td>
              </tr>
              <tr>
                <th scope="row">Attack</th>
                <td>{{ getStat('attack') }}</td>
              </tr>
              <tr>
                <th scope="row">Defense</th>
                <td>{{ getStat('defense') }}</td>
              </tr>
              <tr>
                <th scope="row">Height</th>
                <td>{{ pokemon?.height }}</td>
              </tr>
              <tr>
                <th scope="row">Weight</th>
                <td>{{ pokemon?.weight }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-5">
          <router-link class="btn btn-primary" role="button" :to="{name:'main', query: {page: 1}}">Back to list</router-link>
        </div>
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
    },
    pokemonSpecies(){
      return this.$store.state.pokemonSpecies.get(this.pokemon?.species.name)
    },
  },
  methods: {
    getStat: function(name){
      return this.pokemon?.stats.find((stat) => stat.stat.name === name).base_stat ?? 'na'
    }
  },
  watch: {
    pokemon: function (){
      if(!!this.pokemon){
        this.$store.commit('setPokemonSpecies', this.pokemon.species.name)
      }
    },
    $route(to, _) {
      this.$store.dispatch('setPage', Number(to.query.page) )
    },
  }
}
</script>

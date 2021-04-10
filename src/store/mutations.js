export default {
  addPokemon (state, payload) {
    state.pokemons.set(payload.name, payload.data)
  },
  addPokemonSpecies (state, payload) {
    state.pokemonSpecies.set(payload.name, payload.data)
  },
  setPage (state, page) {
    state.page = page
  },
  setPagination (state, pokemonPage) {
    state.totalNumberOfPages = Math.ceil(pokemonPage.count / state.limit)
    state.next = pokemonPage.next
    state.previous = pokemonPage.previous
  },
  setPokemonPage (state, pokemonPage) {
    state.pages.set(state.page, pokemonPage)
  },
  async setPokemon (state, pokemon) {
    state.pokemon = pokemon
  },
  async setPokemons (state, pokemons) {
    for (const pokemon of pokemons) {
      if (!state.pokemons.has(pokemon.name)) {
        const data = await this.$pokeApiClient.get(pokemon.url)
        state.pokemons.set(pokemon.name, data)
      }
    }
  },
  setSpecies (state, species) {
    state.species = species
  }
}

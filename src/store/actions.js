const apiUrl = 'https://pokeapi.co/api/v2/'

export default {
  async setPage ({ dispatch, commit }, page) {
    commit('setPage', page)
    await dispatch('setPokemonPage')
  },
  async setPokemon ({ commit, state }, name) {
    state.pokemonName = name
    if (!state.pokemons.has(name)) {
      const url = `${apiUrl}pokemon/${name}/`
      const data = await this.$pokeApiClient.get(url)

      commit('setPokemon', data)
      commit('addPokemon', { name, data })
    } else {
      commit('setPokemon', state.pokemons.get(name))
    }
    if (!state.pokemonSpecies.has(state.pokemon.species.name)) {
      const data = await this.$pokeApiClient.get(state.pokemon.species.url)

      commit('setSpecies', data)
      commit('addPokemonSpecies', { name, data })
    } else {
      commit('setSpecies', state.pokemonSpecies.get(state.pokemon.species.name))
    }
  },
  async setPokemonPage ({ commit, state }) {
    if (!state.pages.has(state.page)) {
      const offset = (state.page - 1) * state.limit
      const url = `${apiUrl}pokemon?limit=${state.limit}&offset=${offset}`
      const pokemonPage = await this.$pokeApiClient.get(url)

      commit('setPokemonPage', pokemonPage)
      commit('setPokemons', pokemonPage.results)
    }
    commit('setPagination', state.pages.get(state.page))
  }
}

import { createStore } from 'vuex'
import PokeApiClient from './client/PokeApiClient'

const pokeApiClient = new PokeApiClient()
const apiUrl = 'https://pokeapi.co/api/v2/'
const limit = 15

const store = createStore({
  state: {
    limit,
    next: null,
    page: 1,
    pages: new Map(),
    pokemon: null,
    pokemonName: '',
    pokemons: new Map(),
    pokemonSpecies: new Map(),
    previous: null,
    species: null,
    totalNumberOfPages: 0
  },
  actions: {
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
  },
  getters: {
    pokemonsOnPage: function (state) {
      return state.pages.has(state.page) ? state.pages.get(state.page).results : []
    }
  },
  mutations: {
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
})

store.$pokeApiClient = pokeApiClient

export default store

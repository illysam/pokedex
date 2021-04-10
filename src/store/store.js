import { createStore } from 'vuex'
import PokeApiClient from '../client/PokeApiClient'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const pokeApiClient = new PokeApiClient()
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
  actions,
  getters,
  mutations
})

store.$pokeApiClient = pokeApiClient

export default store

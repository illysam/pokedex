import { createStore } from 'vuex'
import PokeApiClient from '../client/PokeApiClient'

const pokeApiClient = new PokeApiClient()
const apiUrl = 'https://pokeapi.co/api/v2/'
const limit = 15

const store = createStore({
   state:{
      limit,
      page: 1,
      pages: {},
      pokemons: {},
   },
   actions: {
      async initializePokemonPage({ commit, state }){
         const offset = (state.page - 1) * state.limit
         const url = `${apiUrl}pokemon?limit=${state.limit}&offset=${offset}`
         const pokemonPage = await this.$pokeApiClient.get(url)
    
         commit('setPokemonPage', { page: state.page, pokemons: pokemonPage.results, })
         commit('setPokemons', pokemonPage.results)
      },
   },
   getters: {
      pokemonsOnPage: function(state){
         return !!state.pages[state.page] ? state.pages[state.page] : []
      }
   },
   mutations: {
      setPokemonPage(state, payload){
         state.page = payload.page
         state.pages[payload.page] = payload.pokemons
      },
      async setPokemons(state, payload){
         for (const pokemon of payload) {
            if(!state.pokemons[pokemon.name]){
               state.pokemons[pokemon.name] = () => this.$pokeApiClient.get(pokemon.url)
            }
         }
      },
   },
})

store.$pokeApiClient = pokeApiClient

export default store
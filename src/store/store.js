import { createStore } from 'vuex'
import PokeApiClient from '../client/PokeApiClient'

const pokeApiClient = new PokeApiClient()

const store = createStore({
   state:{
      page: 1,
      pages: {},
      pokemons: {},
   },
   actions: {
      async initializePokemonPage({ commit, state }){
         const pokemonPage = await this.$pokeApiClient.getPokemonsByPage(state.page)
    
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
      setPokemons(state, payload){
         console.log('setting pokemons', state, payload)
         // state.page = payload
      },
   },
})

store.$pokeApiClient = pokeApiClient

export default store
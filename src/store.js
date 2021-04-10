import { createStore } from 'vuex'
import PokeApiClient from './client/PokeApiClient'

const pokeApiClient = new PokeApiClient()
const apiUrl = 'https://pokeapi.co/api/v2/'
const limit = 15

const store = createStore({
   state:{
      limit,
      next: null,
      page: 1,
      pages: {},
      pokemons: {},
      previous: null,
      totalNumberOfPages: 0,
   },
   actions: {
      async setPage({ dispatch, commit }, page){
         commit('setPage', page)
         await dispatch('setPokemonPage')
      },
      async setPokemonPage({ commit, state }){
         const offset = (state.page - 1) * state.limit
         const url = `${apiUrl}pokemon?limit=${state.limit}&offset=${offset}`
         const pokemonPage = await this.$pokeApiClient.get(url)
    
         commit('setPagination', pokemonPage)
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
      setPage(state, payload){
         state.page = payload.page
      },
      setPagination(state, payload){
         state.totalNumberOfPages = Math.ceil(payload.count / state.limit)
         state.next = payload.next
         state.previous = payload.previous
      },
      setPokemonPage(state, payload){
         state.page = payload.page
         state.pages[payload.page] = payload.pokemons
      },
      async setPokemons(state, payload){
         for (const pokemon of payload) {
            if(!state.pokemons[pokemon.name]){
               state.pokemons[pokemon.name] = await this.$pokeApiClient.get(pokemon.url)
            }
         }
      },
   },
})

store.$pokeApiClient = pokeApiClient

export default store
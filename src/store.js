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
      async setPokemonPage({ dispatch, commit, state }){
         if(!state.pages[state.page]){
            const offset = (state.page - 1) * state.limit
            const url = `${apiUrl}pokemon?limit=${state.limit}&offset=${offset}`
            const pokemonPage = await this.$pokeApiClient.get(url)
            commit('setPokemonPage', pokemonPage)
            commit('setPokemons', pokemonPage.results)
         }
         commit('setPagination', state.pages[state.page])
      },
   },
   getters: {
      pokemonsOnPage: function(state){
         return !!state.pages[state.page] ? state.pages[state.page].results : []
      },
   },
   mutations: {
      setPage(state, page){
         state.page = page
      },
      setPagination(state, pokemonPage){
         state.totalNumberOfPages = Math.ceil(pokemonPage.count / state.limit)
         state.next = pokemonPage.next
         state.previous = pokemonPage.previous
      },
      setPokemonPage(state, pokemonPage){
         state.pages[state.page] = pokemonPage
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
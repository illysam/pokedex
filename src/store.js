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
      pages: new Map(),
      pokemons: new Map(),
      previous: null,
      totalNumberOfPages: 0,
   },
   actions: {
      async setPage({ dispatch, commit }, page){
         commit('setPage', page)
         await dispatch('setPokemonPage')
      },
      async setPokemonPage({ dispatch, commit, state }){
         if(!state.pages.has(state.page)){
            const offset = (state.page - 1) * state.limit
            const url = `${apiUrl}pokemon?limit=${state.limit}&offset=${offset}`
            const pokemonPage = await this.$pokeApiClient.get(url)
            commit('setPokemonPage', pokemonPage)
            commit('setPokemons', pokemonPage.results)
         }
         commit('setPagination', state.pages.get(state.page))
      },
   },
   getters: {
      pokemon: function(state, name){
         if(state.pokemons.has(name)){
            return state.pokemons.get(name)
         }
         return null
      },
      pokemonsOnPage: function(state){
         return state.pages.has(state.page) ? state.pages.get(state.page).results : []
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
         state.pages.set(state.page, pokemonPage)
      },
      async setPokemon(state, name){
         if(!state.pokemons.has(name)){
            const pokemonUrl = `${apiUrl}pokemon/${name}/`
            const pokemonData = await this.$pokeApiClient.get(pokemonUrl)
            state.pokemons.set(name, pokemonData)
         }
      },
      async setPokemons(state, pokemons){
         for (const pokemon of pokemons) {
            if(!state.pokemons.has(pokemon.name)){
               const pokemonData = await this.$pokeApiClient.get(pokemon.url)
               state.pokemons.set(pokemon.name, pokemonData)
            }
         }
      },
   },
})

store.$pokeApiClient = pokeApiClient

export default store
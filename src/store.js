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
      pokemonSpecies: new Map(),
      previous: null,
      totalNumberOfPages: 0,
   },
   actions: {
      async setPage({ dispatch, commit }, page){
         commit('setPage', page)
         await dispatch('setPokemonPage')
      },
      async setPokemonPage({ commit, state }){
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
      pokemonSpecies: function(state, name){
         if(state.pokemonSpecies.has(name)){
            return state.pokemonSpecies.get(name)
         }
         return null
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
            const url = `${apiUrl}pokemon/${name}/`
            const pokemonData = await this.$pokeApiClient.get(url)
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
      async setPokemonSpecies(state, pokemonName){
         if(state.pokemons.has(pokemonName)){
            const pokemon = state.pokemons.get(pokemonName)
            if(!state.pokemonSpecies.has(pokemon.species.name)){
               const url = `${apiUrl}pokemon-species/${pokemon.species.name}/`
               const speciesData = await this.$pokeApiClient.get(url)
               state.pokemonSpecies.set(pokemon.species.name, speciesData)
            }
         }
         return null
      },
   },
})

store.$pokeApiClient = pokeApiClient

export default store
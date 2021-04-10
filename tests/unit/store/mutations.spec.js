/* eslint-disable no-undef */

import mutations from '../../../src/store/mutations'

describe('store mutations', () => {
  describe('addPokemon', () => {
    it('should add the first pokemon', () => {
      const name = 'bulbasaur'
      const payload = {
        name,
        data: {
          name,
          height: 7,
          held_items: [],
          id: 1,
          is_default: true
        }
      }
      const state = {
        pokemons: new Map()
      }

      mutations.addPokemon(state, payload)
      expect(state.pokemons.size).toEqual(1)
      expect(state.pokemons.has(name)).toBe(true)
      expect(state.pokemons.get(name)).toEqual(payload.data)
    })
  })

  describe('setPagination', () => {
    it('should set the pagination', () => {
      const limit = 15
      const pokemonPage = {
        count: 151,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
        previous: null
      }

      const state = {
        limit,
        next: null,
        previous: null,
        totalNumberOfPages: 0
      }

      mutations.setPagination(state, pokemonPage)
      expect(state.totalNumberOfPages).toEqual(11)
      expect(state.next).toEqual(pokemonPage.next)
      expect(state.previous).toEqual(pokemonPage.previous)
    })
  })
})

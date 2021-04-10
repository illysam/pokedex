/* eslint-disable no-undef */

import getters from '../../../src/store/getters'

describe('store getters', () => {
  it('should return an empty array', () => {
    const state = {
      page: 1,
      pages: new Map()
    }

    expect(getters.pokemonsOnPage(state)).toEqual([])
  })

  it('should return an array with 2 pokemons', () => {
    const page = 1
    const pokemonsOnPage = {
      count: 1118,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/'
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/'
        }
      ]
    }

    const pages = new Map()
    pages.set(page, pokemonsOnPage)

    const state = {
      page,
      pages
    }

    expect(getters.pokemonsOnPage(state)).toEqual(pokemonsOnPage.results)
  })
})


describe('Pokédex e2e tests', () => {
  describe('main page', () => {
    const pageToVisit = 3

    it('visit the pokedex', () => {
      cy.visit('http://localhost:3000')

      cy.location().should((location) => {
        expect(location.search).to.equal('?page=1')
      })

      cy.get('[data-cy=title]').should('have.text', 'Pokédex')
    })

    it(`visit page ${pageToVisit} of the pokedex`, () => {
      cy.visit('http://localhost:3000')

      cy.get(`[data-cy=link-${pageToVisit}]`).click()

      cy.location().should((location) => {
        expect(location.search).to.equal(`?page=${pageToVisit}`)
      })
    })
  })

  describe('pokemon page', () => {
    const pokemonName = 'bulbasaur'
    const pokemonNameEvolves = 'ivysaur'

    it(`visit individual page for ${pokemonName}`, () => {
      cy.visit('http://localhost:3000')

      console.log(`a[data-cy=pokemon-${pokemonName}]`)

      cy.get(`[data-cy=pokemon-${pokemonName}]`).click()

      cy.get('[data-cy=title]').should('have.text', pokemonName)

      cy.location().should((location) => {
        expect(location.pathname).to.equal(`/pokemon/${pokemonName}/`)
      })
    })

    it(`visit individual page for ${pokemonNameEvolves} with link to 'evolves from'`, () => {
      cy.visit('http://localhost:3000')

      console.log(`a[data-cy=pokemon-${pokemonNameEvolves}]`)

      cy.get(`[data-cy=pokemon-${pokemonNameEvolves}]`).click()

      cy.get('[data-cy=title]').should('have.text', pokemonNameEvolves)

      cy.get('[data-cy=evolvesFrom]').should('have.text', pokemonName)

      cy.location().should((location) => {
        expect(location.pathname).to.equal(`/pokemon/${pokemonNameEvolves}/`)
      })
    })
  })
})


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
  })
})

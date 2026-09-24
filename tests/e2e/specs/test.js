// https://docs.cypress.io/api/table-of-contents

describe('Inicio', () => {
  it('muestra la portada de BookList', () => {
    cy.visit('/')
    cy.contains('h1', 'Editorial Nova')
  })
})

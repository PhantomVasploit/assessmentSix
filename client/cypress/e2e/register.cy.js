describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/client/index.html')
    cy.get('#firstName').type('Sanga')
    cy.get("#lastName").type("Paul")
    cy.get("#email").type("phantom@gmail.com")
    cy.get("#password").type("pajoy9903")
    cy.get("#number").type(17)
    cy.get("[type='submit']").click()
  })
})
describe('My account page', function () {
  const page = 'http://127.0.0.1:3000/account'

  beforeEach(function () {
    cy.visit(page)
  })

  it('There should be correct title', () => {
    cy.title().should('include', 'dApp')
  })

  it('document should have utf8 charset defined', function () {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
  })

  it('viewports', function () {
    cy.viewport(320, 480)
    cy.viewport(2999, 2999)
    cy.viewport('macbook-15')
    cy.wait(200)
    cy.viewport('macbook-13')
    cy.wait(200)
    cy.viewport('macbook-11')
    cy.wait(200)
    cy.viewport('ipad-2')
    cy.wait(200)
    cy.viewport('ipad-mini')
    cy.wait(200)
    cy.viewport('iphone-6+')
    cy.wait(200)
    cy.viewport('iphone-6')
    cy.wait(200)
    cy.viewport('iphone-5')
    cy.wait(200)
    cy.viewport('iphone-4')
    cy.wait(200)
    cy.viewport('iphone-3')
    cy.wait(200)
    cy.viewport('ipad-2', 'portrait')
    cy.wait(200)
    cy.viewport('iphone-4', 'landscape')
    cy.wait(200)
  })

  it('location should be correct', function () {
    cy.location().should(function (location) {
      expect(location.href).to.eq(page)
      // expect(location.host).to.eq()
      // expect(location.hostname).to.eq()
      //expect(location.origin).to.eq(page)
      expect(location.pathname).to.eq('/account')
      // expect(location.port).to.eq('')
      expect(location.protocol).to.eq('http:')
      expect(location.search).to.be.empty
    })
  })
})

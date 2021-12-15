
// Teht. 5.17
describe('Blog app tehtävät', function() {
    
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Kari P',
        username: 'kari1',
        password: 'salainen'
      }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    
    cy.visit('http://localhost:3000')

    })
    
    it('Login form is shown', function() {
        cy.get('#login-1st').click()
        //cy.contains('username')
    })

    //describe('Login',function() {
        /*
        beforeEach(function() {
            cy.visit('http://localhost:3000')
        })
        */
        it('succeeds with correct credentials', function() {
          cy.get('#login-1st').click()
          cy.get('#username').type('kari1')
          cy.get('#password').type('salainen')
          cy.get('#login-button').click()
    
          cy.contains('Kari P logged in')
        })
    
        it('fails with wrong credentials', function() {
          // teht 5.18
          cy.get('#login-1st').click()
          cy.get('#username').type('kari1')
          cy.get('#password').type('vaara')
          cy.get('#login-button').click()
    
          cy.contains('wrong username or password')
        })
    //})
})
describe('Login', () => {
    it('Tentativa de Login com email invalido', () => {
        cy.visit("http://www.automationpractice.pl/index.php?controller=authentication&back=my-account")
        
        
        cy.get('#email').type("usertesting@@email.com")
        cy.get('#passwd').type("12345678")
        cy.get('#SubmitLogin > span').click()

        cy.get('#center_column > :nth-child(2)')
        .should('exist')

    });

    it('Tentativa de recuperaçao de senha com email inexistente', () => {
        cy.visit("http://www.automationpractice.pl/index.php?controller=authentication&back=my-account")

        cy.get('.lost_password > a').click()
        cy.get('#email').type("emailtesting1@gmail.com")
        cy.get('.submit > .btn > span').click()

        cy.get('ol > li')
        .should("have.text", "There is no account registered for this email address.")

    });

    describe('Cadastro', () => {
        it('Tentativa de criação de usuario com senha insuficiente', () => {
            cy.visit("http://www.automationpractice.pl/index.php?controller=authentication&back=my-account")

            cy.get('#email_create').type('testinguser123@email.com')
            cy.get('#SubmitCreate > span').click()

            cy.get('#id_gender1').click()
            cy.get('#customer_firstname').type('user')
            cy.get('#customer_lastname').type('test')
            cy.get('#passwd').type('1234')

            cy.get('#days').select('14')
            cy.get('#months').select('10')
            cy.get('#years').select('1990')


            cy.get('#submitAccount > span').click()
            
            cy.get('ol > li')
            .should("have.text", "passwd is invalid.")

            cy.get('.pull-right > span')
            .should("have.text", "*Required field")
        });
    });
});

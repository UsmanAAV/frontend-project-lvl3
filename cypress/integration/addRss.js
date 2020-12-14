/// <reference types="cypress" />

context('add rss form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('controls rendered successfully', () => {
    cy.get('[data-test="input"]');
    cy.get('[data-test="submit-button"]');
  });
});

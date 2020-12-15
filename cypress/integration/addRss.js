/// <reference types="cypress" />
const INCORRECT_URL = 'htps://ru.hexlet.io/lessons.rss';

context('add rss form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('controls rendered successfully', () => {
    cy.get('[data-test="input"]');
    cy.get('[data-test="submit-button"]');
  });

  it('show error to an incorrent url', () => {
    cy.get('[data-test="input"]').type(INCORRECT_URL);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="error"').contains('Please enter a valid url');
  });
});

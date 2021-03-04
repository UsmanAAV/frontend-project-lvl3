/// <reference types="cypress" />
const INCORRECT_URL = 'htps://ru.hexlet.io/lessons.rss';
const CORRECT_URL = 'https://ru.hexlet.io/lessons.rss';

context('add rss form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('controls rendered successfully', () => {
    cy.get('[data-test="input"]');
    cy.get('[data-test="submit-button"]');
  });

  it('clear form after successful request', () => {
    cy.get('[data-test="input"]').type(CORRECT_URL);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="feedback"').should('have.class', 'text-success');
    cy.get('[data-test="feedback"').contains('RSS успешно загружен');
  });

  it('show error to an incorrent url', () => {
    cy.get('[data-test="input"]').type(INCORRECT_URL);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="feedback"]').should('have.class', 'text-danger');
    cy.get('[data-test="feedback"]').contains('Пожалуйста, введите валидный url-адрес');
  });

  it('show error if add duplicate feed', () => {
    cy.get('[data-test="input"]').type(CORRECT_URL);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="input"]').type(CORRECT_URL);
    cy.get('[data-test="submit-button"]').click();
    cy.get('[data-test="feedback"').should('have.class', 'text-danger');
    cy.get('[data-test="feedback"').contains('RSS уже существует');
  });
});

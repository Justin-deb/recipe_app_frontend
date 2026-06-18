/// <reference types="cypress" />

const BASE_URL = "http://localhost:5173";
const API_URL = "https://recipe-backend-v5.onrender.com/api";

function mockLogin() {
  cy.intercept("OPTIONS", `${API_URL}/user/login`, {
    statusCode: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  }).as("loginOptions");

  cy.intercept("POST", `${API_URL}/user/login`, {
    statusCode: 200,
    body: {
      userId: 1,
      username: "Test User",
      email: "test@mail.com",
      avatar: "",
      last_session: new Date().toISOString(),
    },
  }).as("login");
}

function doLogin() {
  mockLogin();

  cy.visit(`${BASE_URL}/login`);

  cy.get("#form-rhf-input-email").should("be.visible").type("test@mail.com");

  cy.get("#form-rhf-input-password").should("be.visible").type("12345678");

  cy.contains("button", "Iniciar Sesion").click();

  cy.wait("@login");
  cy.location("pathname").should("not.eq", "/login");
}

describe("Recipe App E2E", () => {
  it("redirects unauthenticated users to login", () => {
    cy.visit(`${BASE_URL}/crear`);
    cy.location("pathname").should("eq", "/login");
    cy.contains("Iniciar Sesión").should("be.visible");
  });

  it("logs in successfully", () => {
    doLogin();
  });

  it('creates a recipe after logging in', () => {
    cy.intercept('POST', `${API_URL}/user/login`, {
      statusCode: 200,
      body: {
        userId: 1,
        username: 'Test User',
        email: 'test@mail.com',
        avatar: '',
        last_session: new Date().toISOString(),
      },
    }).as('login');

    cy.intercept('GET', `${API_URL}/user`, {
      statusCode: 200,
      body: [
        {
          id: 1,
          username: 'Test User',
          email: 'test@mail.com',
          avatar: '',
        },
      ],
    }).as('users');

    cy.intercept('POST', `${API_URL}/recipe`, {
      statusCode: 201,
      body: {
        id: 1,
        name: 'Gallo Pinto',
      },
    }).as('createRecipe');

    cy.visit(`${BASE_URL}/login`);

    cy.get('#form-rhf-input-email').type('test@mail.com');
    cy.get('#form-rhf-input-password').type('12345678');
    cy.contains('button', 'Iniciar Sesion').click();

    cy.wait('@login');

    cy.visit(`${BASE_URL}/crear`);

    cy.get('#input-name').type('Gallo Pinto');
    cy.get('#input-description').type(
      'Traditional Costa Rican breakfast recipe.'
    );
    cy.get('#input-image').type('https://example.com/gallo.jpg');

    cy.get('#select-country')
      .should('be.visible')
      .select('1')
      .should('have.value', '1');

    cy.get('#select-ingredients option').should('have.length.at.least', 2);

    cy.get('#select-ingredients')
      .should('be.visible')
      .select(['4', '2']);

    cy.get('#select-ingredients')
      .invoke('val')
      .should('deep.equal', ['4', '2']);

    cy.contains('button', 'Publicar Receta').click();

    cy.wait('@users');
    cy.wait('@createRecipe');

    cy.location('pathname').should('include', '/recetas');
  });
});

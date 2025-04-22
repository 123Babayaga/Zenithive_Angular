import { LoginPage } from '../page-objects/login-page.po';
import { DashboardPage } from '../page-objects/dashboard-page.po';

describe('Login Flow', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should display login form', () => {
    cy.get('[data-cy=email-input]').should('be.visible');
    cy.get('[data-cy=password-input]').should('be.visible');
    cy.get('[data-cy=login-button]').should('be.visible');
  });

  it('should require both email and password', () => {
   
    cy.get('[data-cy=login-button]').should('be.disabled');
    
 
    loginPage.fillEmail('test@example.com');
    cy.get('[data-cy=login-button]').should('be.disabled');
    

    cy.get('[data-cy=email-input]').clear();
    loginPage.fillPassword('password');
    cy.get('[data-cy=login-button]').should('be.disabled');
    

    loginPage.fillEmail('test@example.com');
    cy.get('[data-cy=login-button]').should('not.be.disabled');
  });

  it('should login with valid credentials', () => {
    loginPage.login('test@example.com', 'password123');
    

    dashboardPage.checkUrl('/dashboard');
    dashboardPage.shouldContainUserName('Test User');
  });

  it('should show error with invalid credentials', () => {
    loginPage.login('wrong@example.com', 'wrongpassword');
    
    loginPage.checkUrl('/login');
    loginPage.shouldShowErrorMessage();
  });
});

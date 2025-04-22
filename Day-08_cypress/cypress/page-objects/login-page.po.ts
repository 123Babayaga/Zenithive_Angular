import { BasePage } from './base-page.po';

export class LoginPage extends BasePage {
  // Selectors
  private emailInput = '[data-cy=email-input]';
  private passwordInput = '[data-cy=password-input]';
  private loginButton = '[data-cy=login-button]';
  private errorMessage = '.error';

  // Actions
  override visit(): void {
    cy.visit('/login'); 
  }

  fillEmail(email: string): void {
    cy.get(this.emailInput).clear().type(email);
  }

  fillPassword(password: string): void {
    cy.get(this.passwordInput).clear().type(password);
  }

  clickLogin(): void {
    cy.get(this.loginButton).click();
  }


  login(email: string, password: string): void {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLogin();
  }

 
  shouldShowErrorMessage(): void {
    cy.get(this.errorMessage).should('be.visible');
  }

  shouldNotShowErrorMessage(): void {
    cy.get(this.errorMessage).should('not.exist');
  }
}
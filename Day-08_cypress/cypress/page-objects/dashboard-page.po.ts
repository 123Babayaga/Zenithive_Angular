import { BasePage } from './base-page.po';

export class DashboardPage extends BasePage {

  private welcomeMessage = '[data-cy=welcome-message]';
  private dashboardCards = '.card';
  private logoutButton = '[data-cy=logout-button]';


  override visit(): void {
    cy.visit('/dashboard'); 
  }

  clickLogout(): void {
    cy.get(this.logoutButton).click();
  }

 
  shouldContainUserName(name: string): void {
    cy.get(this.welcomeMessage).should('contain', name);
  }

  shouldHaveDashboardItems(count: number): void {
    cy.get(this.dashboardCards).should('have.length', count);
  }
}
export class BasePage {
    // Common methods that all page objects can inherit
    visit(path: string): void {
      cy.visit(path);
    }
  
    getElement(selector: string) {
      return cy.get(selector);
    }
  
    waitForElement(selector: string, timeout = 10000) {
      return cy.get(selector, { timeout });
    }
    
    checkUrl(path: string): void {
      cy.url().should('include', path);
    }
  }
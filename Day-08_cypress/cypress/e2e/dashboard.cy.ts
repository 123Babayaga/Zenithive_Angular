import { LoginPage } from '../page-objects/login-page.po';
import { DashboardPage } from '../page-objects/dashboard-page.po';

describe('Dashboard', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {

    cy.session('loggedIn', () => {
      loginPage.visit();
      loginPage.login('test@example.com', 'password123');
   
      dashboardPage.checkUrl('/dashboard');
    });
    
  
    dashboardPage.visit();
  });

  it('should display user information', () => {
    dashboardPage.shouldContainUserName('Test User');
  });

  it('should display dashboard items', () => {
    dashboardPage.shouldHaveDashboardItems(3);
  });

  it('should redirect to login after logout', () => {
    dashboardPage.clickLogout();
    loginPage.checkUrl('/login');
  });

  it('should not allow access to dashboard when not logged in', () => {

    dashboardPage.clickLogout();
    
    dashboardPage.visit();

    loginPage.checkUrl('/login');
  });
});
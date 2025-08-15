import type HomePage from '../e2e/pages/HomePage';
import type LoginSignupPage from '../e2e/pages/LoginSignupPage';
import type AccountInfoPage from '../e2e/pages/AccountInfoPage';
import type ContactPage from '../e2e/pages/ContactPage';

export interface PagesType {
  homePage: HomePage;
  loginSignupPage: LoginSignupPage;
  accountInfoPage: AccountInfoPage;
  contactPage: ContactPage;
}

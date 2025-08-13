import HomePage from "../../pages/HomePage.js";
import LoginSignupPage from "../../pages/LoginSignupPage.js";
import AccountInfoPage from "../../pages/AccountInfoPage.js";
import { generateUser } from "../../utils/userGenerator.js";

const homePage = new HomePage();
const loginSignupPage = new LoginSignupPage();
const accountInfoPage = new AccountInfoPage();

/**
 * @signup @regression
 */
describe("Demo Account Signup Test", () => {
  it("should create an account successfully", () => {
    const { name, email, password } = generateUser();

    // cy.then(() => {
    //   debugger; // eslint-disable-line no-debugger
    // });

    cy.captureStep("Visit home page");
    homePage.visit();

    cy.captureStep("Verify page title");
    homePage.verifyTitle("Automation Exercise");

    // cy.captureStep("Accept consent");
    // homePage.acceptConsent();

    cy.captureStep("Click signup / login");
    homePage.clickSignupLogin();

    cy.captureStep("Fill signup form");
    loginSignupPage.fillSignupForm(name, email);

    cy.captureStep("Fill account info");
    accountInfoPage.fillAccountDetails(password);

    cy.captureStep("Submit account form");
    accountInfoPage.submitForm();

    cy.captureStep("Verify account created");
    accountInfoPage.verifyAccountCreated();
  });
});

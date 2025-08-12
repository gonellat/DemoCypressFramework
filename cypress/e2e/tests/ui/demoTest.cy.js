import HomePage from "../../pages/HomePage.js";
import LoginSignupPage from "../../pages/LoginSignupPage.js";
import AccountInfoPage from "../../pages/AccountInfoPage.js";

const homePage = new HomePage();
const loginSignupPage = new LoginSignupPage();
const accountInfoPage = new AccountInfoPage();

/**
 * @signup @regression
 */
describe("Demo Account Signup Test", () => {
  it("should create an account successfully", async () => {
    // ✅ Dynamically import faker inside the test
    const { faker } = await import("@faker-js/faker");

    const randomName = faker.person.firstName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    cy.captureStep("Visit home page");
    homePage.visit();

    cy.captureStep("Verify page title");
    homePage.verifyTitle("Automation Exercise");

    // cy.captureStep('Accept consent');
    // homePage.acceptConsent();

    cy.captureStep("Click signup / login");
    homePage.clickSignupLogin();

    cy.captureStep("Fill signup form");
    loginSignupPage.fillSignupForm(randomName, randomEmail);

    cy.captureStep("Fill account info");
    accountInfoPage.fillAccountDetails(randomPassword);

    cy.captureStep("Submit account form");
    accountInfoPage.submitForm();

    cy.captureStep("Verify account created");
    accountInfoPage.verifyAccountCreated();
  });
});

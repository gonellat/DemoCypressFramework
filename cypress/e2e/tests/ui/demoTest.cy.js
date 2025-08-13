import { withBaseTest } from "./withBaseTest";
import { generateUser } from "../../utils/userGenerator.js";

/**
 * @signup @regression
 */
describe("Demo Account Signup Test", () => {
  withBaseTest((Pages) => {
    it("should create an account successfully", () => {
      const { name, email, password } = generateUser();

      cy.captureStep("Visit home page");
      Pages.homePage.visit();

      cy.captureStep("Verify page title");
      Pages.homePage.verifyTitle("Automation Exercise");

      // cy.captureStep("Accept consent");
      // Pages.homePage.acceptConsent();

      cy.captureStep("Click signup / login");
      Pages.homePage.clickSignupLogin();

      cy.captureStep("Fill signup form");
      Pages.loginSignupPage.fillSignupForm(name, email);

      cy.captureStep("Fill account info");
      Pages.accountInfoPage.fillAccountDetails(password);

      cy.captureStep("Submit account form");
      Pages.accountInfoPage.submitForm();

      cy.captureStep("Verify account created");
      Pages.accountInfoPage.verifyAccountCreated();
    });
  });
});

import React from "react";
import { CheckboxSection } from "../src/components/CheckboxSection";
import { mount } from "cypress/react"; // this works out-of-the-box with Vite/React

describe("<CheckboxSection />", () => {
  it("should render checkboxes and allow checking", () => {
    mount(<CheckboxSection />);
    cy.contains("Option 1").find("input").check().should("be.checked");
    cy.contains("Option 2").find("input").check().should("be.checked");
  });
});

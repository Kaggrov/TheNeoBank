import React from "react";
import { shallow, mount } from "enzyme";
import Registration from "./Registration";
describe("Login Component", () => {
  let wrapper; // Declare the wrapper variable

  beforeEach(() => {
    // Create a new shallow wrapper before each test case
    wrapper = shallow(<Registration />);
  });
  it("renders the component without crashing", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  //Rendeing the Inputs in the Registration
  it("First Name, Last Name, Phone Number and Password Input box are present on the page", () => {
    const inputFN = wrapper.find('[data-testid="my-form-control-fn"]');
    const inputLN = wrapper.find('[data-testid="my-form-control-ln"]');
    const inputPN = wrapper.find('[data-testid="my-form-control-pn"]');
    const inputPass = wrapper.find('[data-testid="my-form-control-pass"]');
    // Check if the component's state or props have been updated as expected.
    expect(inputFN.length).toBe(1);
    expect(inputLN.length).toBe(1);
    expect(inputPN.length).toBe(1);
    expect(inputPass.length).toBe(1);
  });

  //
  it("Verify that send otp is disabled before the correct format Phone Number is enterted", () => {
    const sendOTObtn = wrapper.find('[data-testid="sendotpbtn"]');
    expect(sendOTObtn.length).toBe(1);
    expect(sendOTObtn.prop('disabled')).toBe(true);
  })

});

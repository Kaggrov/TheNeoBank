import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import MoneyTransfer from "./MoneyTransfer";

describe("MoneyTransfer Component", () => {
  const initialState = {
    user: {
      customerId: 101,
    },
  };
  const mockStore = configureStore();
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<MoneyTransfer store={store} />);
  });

  it("should render without errors", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("Test adding payee", () => {
    wrapper.find("#addPayee").simulate("click");

    wrapper
      .find("[name='payeeName']")
      .simulate("change", { target: { name: "payeeName", value: "John Doe" } });

    wrapper.find("[name='upiId']").simulate("change", {
      target: { name: "upiId", value: "payee@payee.com" },
    });

    expect(wrapper.find("[name='payeeName']").prop('value')).toContain("John Doe")
    expect(wrapper.find("[name='upiId']").prop('placeholder')).toContain("UPI ID")

  });

  it("Test Payment Method ", () => {
    expect(wrapper.find("#radio-0").text()).toContain("UPI");
    expect(wrapper.find("#radio-2").text()).toContain("Bank Account");

    expect(wrapper.find("#radio-1").text()).toContain("Self");

    
  });
});

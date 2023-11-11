import Enzyme, { shallow, mount } from "enzyme";
import Support from "./Support";


describe(" Ticket Support Component", () => {
  it("Component renders", () => {
    const wrapper = shallow(<Support />);
    expect(wrapper).toBeDefined();
  });
  it("initially shows an empty ticket list", () => {
    const wrapper = shallow(<Support />);
    const ticketList = wrapper.find(".list_item");
    expect(ticketList).toHaveLength(0);
  });
  it("should simulate form submission", () => {
    const wrapper = shallow(<Support />);
    const form = wrapper.find("#ticket_form");

    form.find("[name='validationCustomDropdown']").simulate("change", {
      target: { value: "option1" },
    });
    form.find("[name='validationCustom01']").simulate("change", {
      target: { value: "Subject" },
    });
  });
});

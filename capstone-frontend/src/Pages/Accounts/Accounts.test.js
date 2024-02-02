import React from "react";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Accounts from "./Accounts";

describe("Accounts Component", () => {
    const initialState = {
        user: {
            customerId: 101,
        },
    };
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
    });


    it('Testing link new account', async () => {
        const wrapper = mount(
            <MemoryRouter>
                <Accounts store={store} />
            </MemoryRouter>
        );
        const linkNewAccountCard = wrapper.find('.link-account');
        linkNewAccountCard.simulate('click');

        // expect(wrapper.find('.accountModal').exists()).toBe(true);

        const accountNumberInput = wrapper.find('input[name="account-Number"]');
        const accountTypeSelect = wrapper.find('select[name="account-Type"]');
        const bankNameSelect = wrapper.find('select[name="bank_id"]');

        accountNumberInput.simulate('change', { target: { name: 'account-Number', value: '1234-1234-1234' } });
        accountTypeSelect.simulate('change', { target: { name: 'account-Type', value: 'Savings' } });
        bankNameSelect.simulate('change', { target: { name: 'bank_id', value: 'SBI' } });

        expect(wrapper.find("[name='account-Number']").first().prop('value')).toContain("1234-1234-1234");
        expect(wrapper.find("[name='account-Type']").first().prop('value')).toBe("Savings");
        expect(wrapper.find("[name='bank_id']").first().prop('value')).toBe("SBI");

        wrapper.unmount();
    });

    it('Testing the modal form', () => {
        const wrapper = mount(
            <MemoryRouter>
                <Accounts store={store} />
            </MemoryRouter>
        );

        const linkNewAccountCard = wrapper.find('.link-account');
        linkNewAccountCard.simulate('click');

        expect(wrapper.find('.accountModal').exists()).toBe(true);

        const accountTypeSelect = wrapper.find('select[name="account-Type"]');
        const accountTypeOptions = accountTypeSelect.find('option');
        const optionsText = accountTypeOptions.map(option => option.text());

        const expectedAccountTypeOptions = [
            "Select type of account",
            "Savings",
            "Current",
            "Fixed Deposit"
        ];

        expect(optionsText).toEqual(expectedAccountTypeOptions);

        wrapper.unmount();
    });

});
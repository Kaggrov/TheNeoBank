import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from './Login';
describe('Login Component', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBeTruthy()
  });
});

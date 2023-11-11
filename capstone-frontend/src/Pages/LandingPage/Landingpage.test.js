import React from 'react';
import { shallow, mount } from 'enzyme';
import LandingPage from './LandingPage';
describe('Login Component', () => {
  let wrapper;
  beforeEach(() => {
    // Create a new shallow wrapper before each test case
    wrapper = shallow(<LandingPage />);
  });
  it('renders the component without crashing', () => { 
    expect(wrapper.exists()).toBeTruthy()
  });
  it('should render the main heading correctly', () => {
    const heading = wrapper.find('h1');
    expect(heading.at(0).text()).toBe('Welcome to Natwest Bank');
  });

});

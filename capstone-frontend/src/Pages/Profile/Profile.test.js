
import { mount,shallow } from 'enzyme';
import Profile from './Profile';
import ErrorBoundary from './ErrorBoundary';
import { Modal } from 'react-bootstrap';

describe('Profile Component', () => {
    it("Component renders", () => {
        const wrapper = shallow(
        <ErrorBoundary>
        <Profile />
        </ErrorBoundary>);
        expect(wrapper).toBeDefined();
      });

      
      
    });

  
  
  
  
  
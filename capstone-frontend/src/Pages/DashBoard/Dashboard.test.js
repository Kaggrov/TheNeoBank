import { mount,shallow } from 'enzyme';
import DashBoard from './DashBoard';



describe('Dashboard Component', () => {
    it("Component renders", () => {
        const wrapper = shallow(<DashBoard />);
        expect(wrapper).toBeDefined();
      });

      
      
    });
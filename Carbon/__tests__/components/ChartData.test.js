import {render} from '@testing-library/react-native';
import {DailyLog} from '../../components/ChartData.js';


//Checks if daily log renders properly
describe('DailyLog', () => {
    it('renders a bar chart', () => {
      const dataArray = [5, 10, 15, 20, 25];
      const { log } = render(<DailyLog dataArray={dataArray} />);
      expect(log).not.toBeNull();
    });
  });

  
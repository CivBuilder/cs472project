import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecordRecycling from '../../navigation/screens/Progress/RecordRecycling';
import { ScreenNames } from '../../navigation/screens/Main/ScreenNames';
describe('RecordRecycling', () => {
    let navigation, route, component;
    beforeEach(() => {
      navigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
    };
    route = {
      params: {
          transport_emissions: 0,
          total_emissions: 0,
          lifestyle_emissions: 0,
          diet_emissions: 0,
          home_emissions: 0,
      },
    };
  
    });
    it('should render correctly', () => {
        const { getByText } = render(<RecordRecycling navigation={navigation} route={route} />);
        expect(getByText('Log the amount of each material you recycled today')).toBeTruthy();
    }); 
    
    it('should navigate to RecordEmission with params', () => {
        const { getByTestId } = render(<RecordRecycling navigation={navigation} route={route} />);
        const lm = {"lifestyle_emissions": 9}
        //set picker values
        const paperPicker = getByTestId('paper-picker');
        fireEvent(paperPicker, 'onValueChange', '2');
        const button = getByTestId('save-button');
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith(
            ScreenNames.RECORD_EMISSION, 
            {returningEmissionsEntry : lm}
        );
    });
});

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Circle, Percentage, PercentageContainer } from '../styles';
import percentageColors from '../lib/percentageColors';

const MatchupPercentage = ({percentage, onClick}) => (
  <PercentageContainer onClick={onClick}>
    <ThemeProvider theme={percentageColors[percentage]}>
      <Circle>
          <Percentage>{percentage}</Percentage>
      </Circle>
    </ThemeProvider>
  </PercentageContainer>
);

export default MatchupPercentage;

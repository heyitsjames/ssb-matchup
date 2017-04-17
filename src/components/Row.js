import React from 'react';
import _ from 'lodash';
import { Box, MatchupInput } from '../styles';
import MatchupPercentage from '../components/MatchupPercentage';

const Row = ({ data, onEnterMatchup, onSolidifyMatchup, onClickMatchup }) => {
  return (
    <div className="character-row">
      {_.map(data.matchups, (item, column) => {
        const sameCharacter = data.index === column ? 'M' : null;
        const inputOrMatchup = () => {
          if (item.committed !== '') {
            return <MatchupPercentage onClick={() => onClickMatchup(data.index, column)} percentage={item.committed} />
          }
          return <MatchupInput onBlur={(event) => onSolidifyMatchup(event, data.index, column)}
                               onKeyUp={(event) => onEnterMatchup(event, data.index, column)}/>
        }

        return (
          <Box key={`${data.index}--${column}`} className={`${data.index}--${column}`}>
            {sameCharacter ?
              <MatchupPercentage percentage={'M'} /> : inputOrMatchup()
            }
          </Box>
        );
      })}
    </div>
  );
};

export default Row;

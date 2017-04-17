import React, { Component } from 'react';
import _ from 'lodash'
import { App, Box } from './styles';
import Row from './components/Row';
import Character from './components/Character';
import characterData from './lib/characterData';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      characterData
    }
  }

  handleEnterMatchup = (event, row, column) => {
    event.preventDefault();
    const value = event.target.value;
    if (event.key === 'Backspace') {
      const previousColumn = --column;
      this.handleDeleteMatchup(row, previousColumn, true);
    }
    else {
      const newData = this.state.characterData;
      newData[row].matchups[column].raw = value;
      this.setState({
        characterData: newData 
      });
    }
  }

  handleSolidifyMatchup = (event, row, column, override) => {
    event.preventDefault();
    const newData = this.state.characterData;
    const rawValue = newData[row].matchups[column].raw;
    if (rawValue !== '' || override) {
      const rawNumber = parseInt(rawValue, 10);
      const newValue = !_.isNaN(rawNumber) ? this.roundToNearestFive(rawNumber) : 0;

      newData[row].matchups[column].committed = newValue.toString();
      newData[row].matchups[column].raw = '';
      newData[column].matchups[row].committed = (100 - newValue).toString();
      this.setState({
        characterData: newData 
      });
    }
  }

  roundToNearestFive = (number) => (
    5 * Math.round((number > 100 ? 100 : number)/5)
  )

  handleDeleteMatchup = (row, column, usedBackspace) => {
    const newData = this.state.characterData;
    newData[row].matchups[column].committed = '';
    newData[row].matchups[column].raw = '';
    newData[column].matchups[row].committed = '';
    newData[column].matchups[row].raw = '';

    const callback = usedBackspace ? () => (this.focusToPrevious(row, column)) : _.noop;

    this.setState({
      characterData: newData
    }, callback);
  }

  focusToPrevious(row, column) {
    let elem = document.getElementsByClassName(`${row}--${column}`)[0];
    const childTagName = elem.children[0].tagName;
    if (childTagName !== 'INPUT') {
      elem = document.getElementsByClassName(`${row}--${--column}`)[0];
    }
    if (elem) {
      elem.children[0].focus();
    }
  }

  render() {
    return (
      <App>
        <div className="app-container">
          <div className="character-row">
            <Box />
            {_.map(this.state.characterData, (character) => {
              const { readableName, imageSrc } = character;
              return (<Character key={readableName} src={imageSrc} />);
            })}
          </div>
          {_.map(this.state.characterData, (character, index) => (
            <div key={`${character.name}-row-${index}`} className="character-row">
              <Character key={character.readableName} src={character.imageSrc} />
              <Row
                data={_.merge(character, {index})}
                onEnterMatchup={this.handleEnterMatchup}
                onSolidifyMatchup={this.handleSolidifyMatchup}
                onClickMatchup={this.handleDeleteMatchup} />
            </div>
          ))}
        </div>
      </App>
    );
  }
}

export default Main;

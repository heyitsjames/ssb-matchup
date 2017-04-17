import styled from 'styled-components';

export const App = styled.div`
  display: flex;
  justify-content: center;
`;

export const Circle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${props => props.theme.main};
  border: 1px solid ${props => props.theme.border};
  &:before {
    content: '';
    width: 20%;
    height: 100%;
    background: white;
    position: absolute;
    clip-path: circle(66% at 159% 47%);
    left: 20%;
  }
  &:after {
    content: '';
    width: 100%;
    height: 10%;
    left: 0;
    background: white;
    position: absolute;
    clip-path: circle(68% at 50% -144%);
    top: 62%;
  }
`;

export const PercentageContainer = styled.div`
  position: relative;
  height: 39px;
  width: 39px;
  font-size: 39px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    cursor: pointer;
  }
`;

export const Percentage = styled.div`
  font-size: ${props => props.children === '100' ? '56%' : '62%'};
  font-family: Helvetica;
  font-weight: 600;
  position: relative;
  z-index: 100;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Box = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #666;
  &:nth-child(13) {
    border-right: 2px solid #666;
  }
`;

export const MatchupInput = styled.input`
  font-size: 20px;
  border: none;
  width: 45px;
  height: 45px;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;
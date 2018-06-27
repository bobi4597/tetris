import React from 'react';
import styled from 'styled-components';
import prepareInitialData from './sampleData';

import Board from "./Board";

const StyledTetris = styled.div`
  display: flex;
  justify-content: center;
`;

class Tetris extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: prepareInitialData()};
  }

  componentDidMount() {
    this.gameTimer = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.gameTimer);
  }

  tick() {
    const random = Math.random();
    const floor = Math.floor(random * 3) - 1;
    console.log(random + ', ' + floor);
    this.setState({
      data: prepareInitialData(floor),
    });
  }

  render() {
    const {data} = this.state;
    return <StyledTetris>
      <Board data={data}/>
    </StyledTetris>;
  }
};

export default Tetris;
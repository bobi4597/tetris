import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 30px;
  border: 1px solid #dddddd;
  text-align: center;
`;

const Title = styled.div`
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #dddddd;
`;

const Content = styled.div`
  height: 50px;
  line-height: 50px;
`;

const LevelInfo = ({ level }) =>
  <Container>
    <Title>Level</Title>
    <Content>{level + 1}</Content>
  </Container>;

export default LevelInfo;

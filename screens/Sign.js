import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

const Sign = () => {
  return (
    <Container>
      <Text>Beno</Text>
      <Main></Main>
      <HeaderGraphic>
        <RightCircle></RightCircle>
        <LeftCircle></LeftCircle>
      </HeaderGraphic>
    </Container>
  );
};

export default Sign;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #123456;
`;
const Main = styled.View`

`;

const HeaderGraphic = styled.View`
  width: 100%;
`;

const RightCircle = styled.View``;
const LeftCircle = styled.View`
background-color:#23A6D5;
width: 400px,
height: 400px,
border-radius: 200px,
left: -100px,
top: -200px,
`;

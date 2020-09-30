import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const QuoteCard = ({ image }) => {
  return (
    <Container>
      <Image source={image} />
    </Container>
  );
};

const Container = styled.View`
  width: 300px;
  height: 450px;
  background-color: darkgray;
  border-radius: 12px;
  overflow: hidden;
  elevation: 8;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
`;

export default QuoteCard;

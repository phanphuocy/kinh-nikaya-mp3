import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

const ScrollIndicator = ({ percent = 0 }) => {
  let widthStyle = {
    width: `${percent * 100}%`,
  };
  return (
    <Container>
      <View style={[styles.indicator, widthStyle]}></View>
    </Container>
  );
};

const Container = styled.View`
  height: 8px;
  width: 100%;
  background-color: #4d562d;
`;

const styles = StyleSheet.create({
  indicator: {
    height: "100%",
    width: "30%",
    backgroundColor: "#909874",
    borderTopEndRadius: 4,
    borderBottomEndRadius: 4,
  },
});

export default ScrollIndicator;

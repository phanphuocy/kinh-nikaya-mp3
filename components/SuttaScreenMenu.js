import React, { useEffect, useState, useRef } from "react";
import { View, Text, Animated } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  position: absolute;
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: white;
  left: 5%;
  top: 15%;
  width: 90%;
  height: 80%;
  z-index: 100;
  border-radius: 12px;
  padding: 12px 16px;
  elevation: 8;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const SuttaScreenMenu = () => {
  const yOffset = useRef(new Animated.Value(300)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.spring(yOffset, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.spring(yOffset, {
      toValue: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
    return function cleanup() {
      fadeOut();
    };
  }, []);

  return (
    <AnimatedContainer style={{ transform: [{ translateY: yOffset }] }}>
      <Text>MENU</Text>
    </AnimatedContainer>
  );
};

export default SuttaScreenMenu;

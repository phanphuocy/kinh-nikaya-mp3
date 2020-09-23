import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";

const DifficultyIcon = ({ type }) => {
  let source;
  if (type === "Beginner") {
    source = require("../assets/icons/icons8-soil-24.png");
  } else if (type === "Intermediate") {
    source = require("../assets/icons/icons8-potted-plant-24.png");
  } else if (type === "Advanced") {
    source = require("../assets/icons/icons8-oak-tree-24.png");
  }
  return <StyledIcon source={source} />;
};

const StyledIcon = styled.Image`
  opacity: 0.9;
`;

export default DifficultyIcon;

import React from "react";
import { View, Text as DefaultText, StyleSheet } from "react-native";

const Text = (props) => {
  const { style, children, inverted } = props;
  let textColorStyle = {
    color: "rgba(0,0,0,0.87)",
  };
  if (inverted) {
    textColorStyle = {
      color: "white",
    };
  }
  return (
    <DefaultText {...props} style={[textStyle.text, textColorStyle, style]}>
      {children}
    </DefaultText>
  );
};

const textStyle = StyleSheet.create({
  text: {
    fontFamily: "sans400",
    fontSize: 16,
  },
});

export { Text };

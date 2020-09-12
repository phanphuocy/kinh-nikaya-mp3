import React from "react";
import { View, Text as DefaultText, StyleSheet } from "react-native";

const Text = ({ props, style, children }) => {
  return (
    <DefaultText {...props} style={textStyle.text}>
      {children}
    </DefaultText>
  );
};

const textStyle = StyleSheet.create({
  text: {
    fontFamily: "sans400",
    fontSize: 16,
    color: "rgba(0,0,0,0.87)",
  },
});

export { Text };

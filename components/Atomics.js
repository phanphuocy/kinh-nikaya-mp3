import React from "react";
import { View, Text as DefaultText, StyleSheet } from "react-native";

const Text = (props) => {
  const { style, children, inverted, size, serif, weight } = props;
  let textColorStyle = {
    color: "rgba(0,0,0,0.87)",
  };
  if (inverted) {
    textColorStyle = {
      color: "white",
    };
  }
  let fontSizeStyle = {
    fontSize: 16,
  };
  if (size === "sm" || size === "small") {
    fontSizeStyle = {
      fontSize: 15,
    };
  } else if (size === "xs" || size === "extra-small") {
    fontSizeStyle = {
      fontSize: 14,
    };
  } else if (size === "lg" || size === "large") {
    fontSizeStyle = {
      fontSize: 18,
    };
  } else if (size === "xl" || size === "extra-large") {
    fontSizeStyle = {
      fontSize: 21,
    };
  }
  let fontFamilyStyle = {
    fontFamily: "sans400",
  };
  if (!serif) {
    if (weight === "semibold") {
      fontFamilyStyle = {
        fontFamily: "sans600",
      };
    } else if (weight === "bold") {
      fontFamilyStyle = {
        fontFamily: "sans700",
      };
    } else {
      fontFamilyStyle = {
        fontFamily: "sans400",
      };
    }
  } else {
    if (weight === "bold") {
      fontFamilyStyle = {
        fontFamily: "serif700",
      };
    } else {
      fontFamilyStyle = {
        fontFamily: "serif400",
      };
    }
  }

  return (
    <DefaultText
      {...props}
      style={[
        textStyle.text,
        textColorStyle,
        fontSizeStyle,
        fontFamilyStyle,
        style,
      ]}
    >
      {children}
    </DefaultText>
  );
};

const textStyle = StyleSheet.create({
  text: {
    fontFamily: "sans400",
    color: "rgba(0, 0, 0, 0.87)",
  },
});

export { Text };

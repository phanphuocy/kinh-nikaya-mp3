import React, { useState, useRef } from "react";
import { PanResponder, Animated, StyleSheet } from "react-native";
import styled from "styled-components/native";
import QuoteCard from "../components/QuoteCard";

function getNextIndex(index, limit) {
  let nextIndex = index + 1;
  if (nextIndex > limit - 1) {
    return 0;
  }
  return nextIndex;
}

const quotes = [
  {
    image: require("../assets/quoteImages/AN03-32_w1200_h1800_q60.jpg"),
  },
  {
    image: require("../assets/quoteImages/AN04-14_w1200_h1800_q60.jpg"),
  },
  {
    image: require("../assets/quoteImages/SN02-06-III_w1200_h1800_q50.jpg"),
  },
  {
    image: require("../assets/quoteImages/SN47-37_w1200_h1800_q60.jpg"),
  },
];

const QuoteScreen = () => {
  const [pan, setPan] = useState(new Animated.ValueXY());
  // const pan = useRef(new Animated.ValueXY()).current;

  const [secondCardAnim, setSecondCardAnim] = useState({
    scale: new Animated.Value(0.9),
    offset: new Animated.Value(44),
  });
  const [thirdCardAnim, setThirdCardAnim] = useState({
    scale: new Animated.Value(0.8),
    offset: new Animated.Value(-50),
  });

  const [index, setIndex] = useState(0);

  let panResponser = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(secondCardAnim.scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(secondCardAnim.offset, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(thirdCardAnim.scale, {
          toValue: 0.9,
          useNativeDriver: true,
        }).start();
        Animated.spring(thirdCardAnim.offset, {
          toValue: 44,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        const positionY = pan.y.__getValue();
        if (positionY < -200 || positionY > 300) {
          Animated.timing(pan, {
            toValue: { x: 1000, y: 1000 },
            useNativeDriver: true,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            secondCardAnim.scale.setValue(0.9);
            secondCardAnim.offset.setValue(44);
            thirdCardAnim.scale.setValue(0.8);
            thirdCardAnim.offset.setValue(-50);
            setIndex((index) => getNextIndex(index, quotes.length));
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
          Animated.spring(secondCardAnim.scale, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
          Animated.spring(secondCardAnim.offset, {
            toValue: 44,
            useNativeDriver: true,
          }).start();
          Animated.spring(thirdCardAnim.scale, {
            toValue: 0.8,
            useNativeDriver: true,
          }).start();
          Animated.spring(thirdCardAnim.offset, {
            toValue: -50,
            useNativeDriver: true,
          });
        }
      },
    })
  ).current;

  return (
    <Screen>
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {...panResponser.panHandlers}
      >
        <QuoteCard image={quotes[index].image} />
      </Animated.View>
      <Animated.View
        style={[
          styles.secondCard,
          {
            transform: [
              { scale: secondCardAnim.scale },
              { translateY: secondCardAnim.offset },
            ],
          },
        ]}
      >
        <QuoteCard image={quotes[getNextIndex(index, quotes.length)].image} />
      </Animated.View>
      <Animated.View
        style={[
          styles.thirdCard,
          {
            transform: [
              { scale: thirdCardAnim.scale },
              { translateY: thirdCardAnim.offset },
            ],
          },
        ]}
      >
        <QuoteCard
          image={quotes[getNextIndex(index + 1, quotes.length)].image}
        />
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  secondCard: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  thirdCard: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

export default QuoteScreen;

import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Provider } from "react-redux";
import store from "./store/index";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { connect } from "react-redux";

// Import navigators
import RootNavigator from "./navigators/RootNavigator";

const Screen = styled.View`
  flex: 1;
  background-color: #f9f9f9;
`;

const TitleBar = styled.View`
  background-color: white;
  padding: 32px 16px 8px;
  box-shadow: 10px 5px 5px black;
`;

const PlayerProvider = connect(null)(({ children }) => {
  useEffect(() => {
    console.log("App mounted");
  }, []);
  return <Screen>{children}</Screen>;
});

function App() {
  let [fontsLoaded, error] = useFonts({
    sans400: require("./assets/fonts/Jano-Sans-Pro-Regular.otf"),
    serif400: require("./assets/fonts/Lora-Regular.ttf"),
    serif700: require("./assets/fonts/Lora-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
  } else if (error) {
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        {/* <PlayerProvider> */}
        <Screen>
          <RootNavigator />
        </Screen>
        {/* </PlayerProvider> */}
      </Provider>
    );
  }
}

export default App;

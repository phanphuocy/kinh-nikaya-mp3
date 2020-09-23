import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
    sans600: require("./assets/fonts/Jano-Sans-Pro-SemiBold.otf"),
    sans700: require("./assets/fonts/Jano-Sans-Pro-Bold.otf"),
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
        <PersistGate
          loading={
            <View>
              <Text>LOADING PERSISTOR</Text>
            </View>
          }
          persistor={persistor}
        >
          <Screen>
            <RootNavigator />
          </Screen>
        </PersistGate>
        {/* </PlayerProvider> */}
      </Provider>
    );
  }
}

export default App;

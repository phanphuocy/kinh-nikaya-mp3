import React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import navigators
import BrowsingStackNavigator from "./BrowsingStackNavigator";
import SuttaScreen from "../screens/SuttaScreen";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Browsing" component={BrowsingStackNavigator} />
        <RootStack.Screen name="Reading" component={SuttaScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

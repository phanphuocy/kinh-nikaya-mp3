import React from "react";
import { View, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

// Import navigators
import SuttaScreen from "../screens/SuttaScreen";
import SuttaMenuModal from "../screens/SuttaMenuModal";

const ReadingStack = createStackNavigator();

const ReadingStackNavigator = () => {
  return (
    <ReadingStack.Navigator>
      <ReadingStack.Screen name="Sutta" component={SuttaScreen} />
      <ReadingStack.Screen name="SuttaMenu" component={SuttaMenuModal} />
    </ReadingStack.Navigator>
  );
};

export default ReadingStackNavigator;

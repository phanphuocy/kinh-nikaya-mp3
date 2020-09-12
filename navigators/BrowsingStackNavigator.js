import React from "react";
import { View, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import navigators
import CollectionScreen from "../screens/CollectionScreen";
import GroupScreen from "../screens/GroupScreen";
import SearchScreen from "../screens/SearchScreen";

// BrowsingStack is the child of BrowsingTabs, alongside with Search(screen)
const BrowsingStack = createStackNavigator();

const BrowsingStackNavigator = () => {
  return (
    <BrowsingStack.Navigator>
      <BrowsingStack.Screen name="Collection" component={CollectionScreen} />
      <BrowsingStack.Screen name="Group" component={GroupScreen} />
    </BrowsingStack.Navigator>
  );
};

//
const BrowsingTabs = createBottomTabNavigator();

const BrowsingTabsNavigator = () => {
  return (
    <BrowsingTabs.Navigator>
      <BrowsingTabs.Screen
        name="BrowsingStack"
        component={BrowsingStackNavigator}
      />

      <BrowsingTabs.Screen name="Search" component={SearchScreen} />
    </BrowsingTabs.Navigator>
  );
};

export default BrowsingTabsNavigator;

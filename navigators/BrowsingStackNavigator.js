import React from "react";
import { View, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import navigators
import CollectionScreen from "../screens/CollectionScreen";
import GroupScreen from "../screens/GroupScreen";
import SearchScreen from "../screens/SearchScreen";
import PersonalScreen from "../screens/PersonalScreen";
import QuoteScreen from "../screens/QuoteScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// BrowsingStack is the child of BrowsingTabs, alongside with Search(screen)
const BrowsingStack = createStackNavigator();

const BrowsingStackNavigator = () => {
  return (
    <BrowsingStack.Navigator>
      <BrowsingStack.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          title: "Kinh Nikāya Pāli MP3",
          headerTitleStyle: {
            fontFamily: "sans400",
          },
        }}
      />
      <BrowsingStack.Screen
        name="Group"
        component={GroupScreen}
        options={({ route }) => ({
          title: route.params.screenName,
          headerTitleStyle: {
            fontFamily: "sans400",
          },
        })}
      />
    </BrowsingStack.Navigator>
  );
};

//
const BrowsingTabs = createBottomTabNavigator();

const BrowsingTabsNavigator = () => {
  return (
    <BrowsingTabs.Navigator
      keyboardHidesTabBar={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = focused ? "#606C38" : "gray";
          if (route.name === "BrowsingStack") {
            iconName = focused ? "book-play" : "book-play-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "book-search" : "book-search-outline";
          } else if (route.name === "Personal") {
            iconName = focused
              ? "bookmark-multiple"
              : "bookmark-multiple-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#606C38",
        inactiveTintColor: "gray",
      }}
      labelStyle={{
        fontFamily: "sans400",
      }}
      tabStyle={{
        paddingTop: "12px",
      }}
    >
      <BrowsingTabs.Screen
        name="BrowsingStack"
        component={BrowsingStackNavigator}
        options={{
          tabBarLabel: "Tạng Kinh",
        }}
      />
      <BrowsingTabs.Screen name="Quotes" component={QuoteScreen} />
      <BrowsingTabs.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Tìm Kiếm",
        }}
      />
      <BrowsingTabs.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          tabBarLabel: "Cá Nhân",
        }}
      />
    </BrowsingTabs.Navigator>
  );
};

export default BrowsingTabsNavigator;

import React from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Text } from "../components/Atomics";
import {
  CurrentlyReadingList,
  HaveReadList,
} from "../components/PersonalLists";

const PersonalScreen = ({ navigation }) => {
  return (
    <Screen>
      <ScrollView>
        <Cover
          source={require("../assets/photo-1496165044541-3221a1d68cc8.jpg")}
        ></Cover>
        <ScreenTitle>Trang Cá Nhân</ScreenTitle>
        <CurrentlyReadingList navigation={navigation} />
        {/* <HaveReadList /> */}
      </ScrollView>
    </Screen>
  );
};

const Screen = styled.View`
  flex: 1;
  background-color: #f7f7f7;
`;

const ScreenTitle = styled.Text`
  font-family: "sans400";
  font-size: 24px;
  margin: 0 24px;
  color: white;
`;

const Cover = styled.ImageBackground`
  height: 180px;
  background-color: #606c38;
  margin-bottom: -90px;
  border-radius: 12px;
`;

export default PersonalScreen;

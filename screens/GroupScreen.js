import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Text } from "../components/Atomics";
import { Ionicons } from "@expo/vector-icons";

const GroupScreen = ({ group, navigation }) => {
  function handleCardReadingClicked(id) {
    navigation.navigate("Reading", { id: id, openWithAudio: false });
  }

  function handleCardAudioClicked(id) {
    navigation.navigate("Reading", { id: id, openWithAudio: true });
  }

  const ListHeader = () => (
    <>
      <SectionTitle>GIỚI THIỆU</SectionTitle>
      <IntroductionText>
        {group.introduction
          ? group.introduction
          : "Amet velit officia sint laboris dolor nostrud. Laboris sit exercitation cillum ipsum est non ex consequat fugiat deserunt fugiat in velit. Aliqua est non consectetur dolor in sit veniam amet aute aute. Tempor consequat do eiusmod do adipisicing ullamco occaecat aute minim eu."}
      </IntroductionText>
      <SectionTitle>CÁC BÀI KINH</SectionTitle>
    </>
  );

  return (
    <Screen>
      <FlatList
        data={group.suttas}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <SuttaCard>
            <ContentContainer>
              <Text>{item.name}</Text>
              <Text>{item.paliName}</Text>
              <Text>{item.introduction}</Text>
            </ContentContainer>
            <ActionContainer>
              <ActionTouchable
                onPress={() => handleCardReadingClicked(item.id)}
              >
                <ButtonIconContainer>
                  <Ionicons name="md-book" size={24} color="white" />
                </ButtonIconContainer>
                <Text>Hòa Thượng Thích Minh Châu</Text>
              </ActionTouchable>
              {item.tracks && item.tracks.length > 0 && (
                <ActionTouchable
                  onPress={() => handleCardAudioClicked(item.id)}
                >
                  <Text>HAS AUDIO</Text>
                </ActionTouchable>
              )}
            </ActionContainer>
          </SuttaCard>
        )}
        ListHeaderComponent={ListHeader}
      />
    </Screen>
  );
};

const Screen = styled.View`
  background-color: #f9f9f9;
  flex: 1;
`;

const SectionTitle = styled.Text`
  text-align: center;
  font-family: serif400;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 16px;
  margin-bottom: 16px;
`;

const IntroductionText = styled.Text`
  margin: 4px 24px;
  font-family: sans400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 22.4px;
`;

const SuttaCard = styled.View`
  background-color: white;
  padding: 16px 8px;
  margin-bottom: 12px;
  elevation: 1;
`;

const ContentContainer = styled.View`
  padding: 0 16px;
  margin-bottom: 8px;
`;

const ActionContainer = styled.View``;

const ActionTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin-bottom: 4px;
`;

const ButtonIconContainer = styled.View`
  background-color: black;
  border-radius: 18px;
  height: 36px;
  width: 36px;
  padding: 4px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;

function mapStateToProps(state, ownProps) {
  let id = ownProps.route.params.id;
  return {
    group: state.system.groups.byIds[id],
  };
}

export default connect(mapStateToProps)(GroupScreen);

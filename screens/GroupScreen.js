import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  View,
  ScrollView,
  FlatList,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import { Text } from "../components/Atomics";
import { Ionicons } from "@expo/vector-icons";
import DifficultyIcon from "../components/DifficultyIcon";

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
              <SuttaTitleRow>
                <Text weight="semibold" size="large" style={styles.flexShrink}>
                  {item.name}
                </Text>
                {item.hasDifficultyLevel && (
                  <DifficultyIcon type={item.difficultyLevel} />
                )}
              </SuttaTitleRow>
              <SuttaSubtitleRow>
                <Text>{item.paliName}</Text>
                <Spacer />
                <Text>{item.codeName}</Text>
              </SuttaSubtitleRow>
              {item.introduction && <Text size="sm">{item.introduction}</Text>}
            </ContentContainer>
            <ActionContainer>
              <TouchableNativeFeedback
                onPress={() => handleCardReadingClicked(item.id)}
              >
                <ActionTouchable>
                  <ButtonIconContainer>
                    <Ionicons name="md-book" size={18} color="white" />
                  </ButtonIconContainer>
                  <Text size="small">Hòa Thượng Thích Minh Châu</Text>
                </ActionTouchable>
              </TouchableNativeFeedback>
              {item.tracks && item.tracks.length > 0 && (
                <TouchableNativeFeedback
                  onPress={() => handleCardAudioClicked(item.id)}
                >
                  <ActionTouchable>
                    <ButtonIconContainer>
                      <Ionicons name="md-mic" size={18} color="white" />
                    </ButtonIconContainer>
                    <Text>Nguồn: batchanhdao.vn</Text>
                  </ActionTouchable>
                </TouchableNativeFeedback>
              )}
            </ActionContainer>
          </SuttaCard>
        )}
        ListHeaderComponent={ListHeader}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  flexShrink: {
    flexShrink: 1,
  },
});

const Screen = styled.View`
  background-color: #f9f9f9;
  flex: 1;
`;

const SectionTitle = styled.Text`
  /* text-align: center; */
  font-family: serif400;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 24px;
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
  padding: 24px 8px 16px;
  margin-bottom: 12px;
  elevation: 1;
`;

const SuttaTitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SuttaSubtitleRow = styled.View`
  flex-direction: row;
  margin-bottom: 4px;
`;

const Spacer = styled.View`
  width: 32px;
`;

const ContentContainer = styled.View`
  padding: 0 16px;
  margin-bottom: 8px;
`;

const ActionContainer = styled.View``;

const ActionTouchable = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin-bottom: 4px;
`;

const ButtonIconContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.87);
  border-radius: 18px;
  height: 32px;
  width: 32px;
  padding: 4px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;

function mapStateToProps(state, ownProps) {
  let id = ownProps.route.params.id;
  let group = {
    ...state.system.groups.byIds[id],
    suttas: state.system.groups.byIds[id].suttas.map(
      (id) => state.system.suttas.byIds[id]
    ),
  };
  return {
    group: group,
  };
}

export default connect(mapStateToProps)(GroupScreen);

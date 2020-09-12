import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Text } from "../components/Atomics";

const GroupScreen = ({ group }) => {
  return (
    <Screen>
      {/* <Text>{JSON.stringify(group, null, 2)}</Text> */}
      <Text>GIỚI THIỆU</Text>
      <Text>{group.introduction}</Text>
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
              <ActionTouchable>
                <Text>Touch me</Text>
              </ActionTouchable>
              <ActionTouchable>
                <Text>Touch me</Text>
              </ActionTouchable>
            </ActionContainer>
          </SuttaCard>
        )}
      />
    </Screen>
  );
};

const Screen = styled.View`
  background-color: #f9f9f9;
  flex: 1;
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
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin-bottom: 4px;
`;

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  let id = ownProps.route.params.id;
  return {
    group: state.system.groups.byIds[id],
  };
}

export default connect(mapStateToProps)(GroupScreen);

import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import CollectionAccordion from "../components/CollectionAccordion";

const CollectionScreen = ({ collections, groups, navigation }) => {
  const data = collections.allIds.map((id) => ({
    ...collections.byIds[id],
    groups: collections.byIds[id].groups.map((id) => groups.byIds[id]),
  }));

  function handleCardClicked(idOfGroup, screenName) {
    navigation.navigate("Group", { id: idOfGroup, screenName: screenName });
  }

  return (
    <Screen>
      <CollectionAccordion data={data} handleCardClicked={handleCardClicked} />
    </Screen>
  );
};

const Screen = styled.View`
  background-color: #f9f9f9;
`;

function mapStateToProps(state) {
  return {
    collections: state.system.collections,
    groups: state.system.groups,
  };
}

export default connect(mapStateToProps)(CollectionScreen);

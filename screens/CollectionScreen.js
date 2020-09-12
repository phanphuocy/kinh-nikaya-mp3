import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import CollectionAccordion from "../components/CollectionAccordion";

const CollectionScreen = ({ collections, navigation }) => {
  const data = collections.allIds.map((id) => collections.byIds[id]);

  function handleCardClicked(idOfGroup) {
    navigation.navigate("Group", { id: idOfGroup });
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
  };
}

export default connect(mapStateToProps)(CollectionScreen);

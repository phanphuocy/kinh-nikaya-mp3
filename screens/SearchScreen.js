import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import { Text } from "../components/Atomics";
import { TextInput, FlatList } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  filterSuttas,
  clearFilteredSutta,
} from "../store/actions/systemActions";

const SearchScreen = ({
  filteredSuttas,
  filteringTerm,
  filterSuttas,
  clearFilteredSutta,
}) => {
  function handleInputChange(event) {
    event.persist();
    let term = event.nativeEvent.text;
    console.log(term);
    filterSuttas(term);
  }

  return (
    <Screen>
      <Text>Search screen</Text>
      <StyledInput
        autoFocus={true}
        onChange={(e) => handleInputChange(e)}
        clearButtonMode="always"
        value={filteringTerm}
      />
      <Text>Tìm được {filteredSuttas.length}</Text>
      <FlatList
        data={filteredSuttas}
        keyExtractor={(item) => item.slug}
        ItemSeparatorComponent={() => <ResultItemSeparator />}
        renderItem={({ item }) => (
          <ResultItemContainer>
            <Text>{item.name}</Text>
            <Text>{item.paliName}</Text>
          </ResultItemContainer>
        )}
      />
    </Screen>
  );
};

const Screen = styled.View`
  background-color: #f9f9f9;
  flex: 1;
  padding: 48px 12px 0px;
`;

const StyledInput = styled.TextInput`
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-family: "sans400";
  font-size: 16px;
`;

const ResultItemContainer = styled.View`
  padding: 12px 24px;
  background-color: white;
`;

const ResultItemSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.06);
`;

function mapStateToScreenProps(state) {
  return {
    filteredSuttas: state.system.filteredSuttas,
    filteringTerm: state.system.filteringTerm,
  };
}

export default connect(mapStateToScreenProps, {
  filterSuttas,
  clearFilteredSutta,
})(SearchScreen);

import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import { Text } from "../components/Atomics";
import { TextInput, FlatList, TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  filterSuttas,
  clearFilteredSutta,
} from "../store/actions/systemActions";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = ({
  filteredSuttas,
  filteringTerm,
  filterSuttas,
  clearFilteredSutta,
  navigation,
}) => {
  function handleInputChange(event) {
    event.persist();
    let term = event.nativeEvent.text;
    console.log(term);
    filterSuttas(term);
  }

  let inputRef = useRef(null);

  function handleInputViewTouched() {
    inputRef.current.focus();
  }

  function onCardTouched(id) {
    navigation.navigate("Reading", { id: id, openWithAudio: false });
  }

  return (
    <Screen>
      {/* <Text weight="semibold">Tìm Kiếm</Text> */}
      <TouchableNativeFeedback onPress={handleInputViewTouched}>
        <StyledInputContainer>
          <InputIconContainer>
            <Ionicons name="md-search" size={24} color="gray" />
          </InputIconContainer>
          <StyledInput
            ref={inputRef}
            autoFocus={true}
            onChange={(e) => handleInputChange(e)}
            clearButtonMode="always"
            value={filteringTerm}
          />
        </StyledInputContainer>
      </TouchableNativeFeedback>
      <IndicatorTextContainer>
        <Text size="small">
          {filteredSuttas.length <= 0
            ? "Nhập từ khóa bạn muốn tìm, có thể là tên tiếng Việt, tiếng Pali không dấu hoặc quy ước tên."
            : `Tìm được ${filteredSuttas.length} bài:`}
        </Text>
      </IndicatorTextContainer>
      <FlatList
        data={filteredSuttas}
        keyExtractor={(item) => item.slug}
        ItemSeparatorComponent={() => <ResultItemSeparator />}
        renderItem={({ item }) => (
          <TouchableNativeFeedback onPress={() => onCardTouched(item.id)}>
            <ResultItemContainer>
              <Text>{item.name}</Text>
              <Text>{item.paliName}</Text>
            </ResultItemContainer>
          </TouchableNativeFeedback>
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

const StyledInputContainer = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: white;
  flex-direction: row;
  padding: 0 12px;
`;

const InputIconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  padding: 12px 12px;
  border-radius: 4px;
  font-family: "sans400";
  font-size: 16px;
`;

const IndicatorTextContainer = styled.View`
  padding: 8px 0;
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

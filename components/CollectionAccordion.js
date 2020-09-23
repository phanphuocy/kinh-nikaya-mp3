import React, { useState, useRef, useEffect } from "react";
import { Text } from "./Atomics";
import styled from "styled-components/native";
import {
  Animated,
  View,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CollectionAccordion = ({ data, handleCardClicked }) => {
  const [openning, setOpenning] = useState(data[0].slug);
  const ref = useRef(null);

  function handleExpandButton(target) {
    setOpenning(target);
  }

  useEffect(() => {
    console.log(ref.current.scrollToIndex);
  }, []);

  function setOpenningAndScroll(slug, index = 0) {
    console.log(index);
    ref.current.scrollToIndex({
      animated: true,
      index: index,
      viewOffset: 100,
    });
    handleExpandButton(slug);
  }

  return (
    <FlatList
      ref={ref}
      data={data}
      keyExtractor={(item) => item.slug}
      renderItem={({ item, index }) => (
        <CollectionAccordionItem
          collection={item}
          index={index}
          isOpenning={item.slug === openning}
          setOpenningAndScroll={setOpenningAndScroll}
          handleCardClicked={handleCardClicked}
        />
      )}
    />
  );
};

const CollectionAccordionItem = ({
  collection,
  index,
  isOpenning,
  setOpenningAndScroll,
  handleCardClicked,
}) => {
  return (
    <CollectionContainer>
      <TouchableNativeFeedback
        onPress={() => setOpenningAndScroll(collection.slug, index)}
      >
        <CollectionHeader>
          <View>
            <Text>{collection.name}</Text>
            <Text>{collection.paliName}</Text>
          </View>

          <Text>
            {isOpenning ? (
              <Ionicons name="ios-arrow-up" size={24} color="black" />
            ) : (
              <Ionicons name="ios-arrow-down" size={24} color="black" />
            )}
          </Text>
        </CollectionHeader>
      </TouchableNativeFeedback>
      {isOpenning ? (
        <FlatList
          data={collection.groups}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onPress={() => handleCardClicked(item.id, item.name)}
            >
              <GroupCard>
                <Text weight="semibold">{item.name}</Text>
                <Text>{item.paliName}</Text>
              </GroupCard>
            </TouchableNativeFeedback>
          )}
        />
      ) : null}
    </CollectionContainer>
  );
};

const CollectionContainer = styled.View`
  margin: 0px 8px;
`;

const CollectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  margin-bottom: 8px;
`;

const GroupCard = styled.View`
  background-color: white;
  margin-bottom: 12px;
  padding: 16px 24px;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.8);
  elevation: 8;
`;

export default CollectionAccordion;

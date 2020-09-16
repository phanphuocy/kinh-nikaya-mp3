import React from "react";
import { View } from "react-native";
import { Text } from "./Atomics";
import { connect } from "react-redux";
import styled from "styled-components/native";

function mapStateToReadingListProp(state) {
  return {
    reading: state.personal.reading,
  };
}

const EmptyReadingList = () => (
  <EmptyContainer>
    <EmptyNotiText>Bạn chưa có bài Kinh nào đang đọc</EmptyNotiText>
    <EmptyNotiText>
      Những bài Kinh đang đọc sẽ được hiển thị ở đây để giúp bạn tìm được chúng
      mau chóng hơn trong những lần sau.
    </EmptyNotiText>
  </EmptyContainer>
);

const EmptyReadList = () => (
  <EmptyContainer>
    <EmptyNotiText>LLLL</EmptyNotiText>
  </EmptyContainer>
);

const EmptyContainer = styled.View`
  padding: 12px 16px;
`;

const EmptyNotiText = styled.Text`
  font-family: "sans400";
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  /* text-align: center; */
`;

const ListItemContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 0 16px;
`;

const ItemSeparatorLine = styled.View`
  height: 2px;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const ListItemContent = styled.View`
  padding: 8px 0;
  flex-direction: row;
`;

const TitleSide = styled.View`
  width: 65%;
`;

const TimestampSide = styled.View`
  width: 35%;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const CurrentlyReadingList = connect(mapStateToReadingListProp)(
  (props) => {
    const { reading } = props;
    return (
      <ListContainer>
        <ListHeaderTitle>ĐANG ĐỌC</ListHeaderTitle>
        {/* <Text>{JSON.stringify(reading, null, 2)}</Text> */}
        {reading.allIds.length <= 0 ? (
          <EmptyReadingList />
        ) : (
          <View>
            {reading.allIds.slice(0, 5).map((id) => (
              <ListItemContainer>
                <ItemSeparatorLine />
                <ListItemContent key={id}>
                  <TitleSide>
                    <Text>{reading.byIds[id].codeName}</Text>
                    <Text>{reading.byIds[id].name}</Text>
                    <Text>
                      Đang đọc {Math.round(reading.byIds[id].position * 100)}%
                    </Text>
                  </TitleSide>
                  <TimestampSide>
                    <Text>{reading.byIds[id].timestamp}</Text>
                  </TimestampSide>
                </ListItemContent>
              </ListItemContainer>
            ))}
          </View>
        )}
      </ListContainer>
    );
  }
);

function mapStateToReadListProp(state) {
  return {};
}

export const HaveReadList = connect(mapStateToReadListProp)(() => {
  return (
    <ListContainer>
      <ListHeaderTitle>ĐÃ ĐỌC</ListHeaderTitle>
    </ListContainer>
  );
});

const ListContainer = styled.View`
  background-color: white;
  border-radius: 8px;
  margin: 8px 12px;
  padding: 24px 0;
`;

const ListHeaderTitle = styled.Text`
  font-family: "sans400";
  font-size: 18px;
  margin-left: 16px;
  margin-bottom: 12px;
`;

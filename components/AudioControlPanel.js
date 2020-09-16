import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  pausePlaybackIntance,
  playPlaybackIntance,
} from "../store/actions/playerActions";

const AudioControlPanel = ({
  instance,
  status,
  pausePlaybackIntance,
  playPlaybackIntance,
}) => {
  function pauseButtonHandler() {
    pausePlaybackIntance(instance);
  }

  function playButtonHandler() {
    playPlaybackIntance(instance);
  }

  return (
    <PanelContainer>
      <Text>STATUS:::</Text>
      {status ? (
        <View>
          <Text>{status.positionMillis}</Text>
          <Text>{status.durationMillis}</Text>
        </View>
      ) : (
        <View>
          <Text>...loading...</Text>
        </View>
      )}
      <Row5>
        <Row5Item>
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="skip-previous"
                size={24}
                color="black"
              />
            }
          />
        </Row5Item>
        <Row5Item>
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="rewind-10"
                size={24}
                color="black"
              />
            }
          />
        </Row5Item>
        <Row5Item>
          <IconButton
            iconName="md-play"
            icon={<Ionicons name="md-play" size={24} color="black" />}
            onPress={playButtonHandler}
          />
          <IconButton
            iconName="md-pause"
            icon={<Ionicons name="md-pause" size={24} color="black" />}
            onPress={pauseButtonHandler}
          />
        </Row5Item>
        <Row5Item>
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="fast-forward-30"
                size={24}
                color="black"
              />
            }
          />
        </Row5Item>
        <Row5Item>
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="skip-next"
                size={24}
                color="black"
              />
            }
          />
        </Row5Item>
      </Row5>
    </PanelContainer>
  );
};

const Row5 = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Row5Item = styled.View`
  width: 20%;
  border: 1px solid gray;
  flex-direction: row;
  justify-content: center;
`;

const IconButton = ({ iconName = "md-play", icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonWraper>{icon}</ButtonWraper>
    </TouchableOpacity>
  );
};

const ButtonWraper = styled.View`
  padding: 8px 8px;
`;

const PanelContainer = styled.View`
  min-height: 200px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  background-color: white;
  padding: 16px 12px;
  box-shadow: 0px -12px 4px black;
`;

function mapStateToProps(state, ownProps) {
  return {
    instance: state.player.playbackInstance,
    status: state.player.status,
  };
}

export default connect(mapStateToProps, {
  pausePlaybackIntance,
  playPlaybackIntance,
})(AudioControlPanel);

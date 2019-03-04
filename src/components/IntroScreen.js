import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
  Image
} from "react-native";
import Title from "./Title";
import AppText from "./AppText";
import * as globalStyles from "../styles/global";

const { ImageLibraryManager } = NativeModules;

export default class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl:
        "https://evernote.com/c/assets/homepage/homepage-focus.png?f7ba411f33fad3d4"
    };
  }

  render() {
    return (
      <View
        style={[globalStyles.COMMON_STYLES.pageContainer, styles.container]}
      >
        <TouchableOpacity
          onPress={() =>
            ImageLibraryManager.selectImage(url => {
              this.setState({
                imageUrl: url
              });
              console.log(url);
            })
          }
        >
          <Image
            source={{ uri: this.state.imageUrl }}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Feed");
          }}
        >
          <Title>React Native News Reader</Title>
          <AppText>Start Reading</AppText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

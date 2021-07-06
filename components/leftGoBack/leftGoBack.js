import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const LeftGoBack = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        width: 25,
        height: 25,
      }}
    >
      <IconButton
        color="#FFF"
        icon={() => (
          <MaterialIcons color="#FFF" size={30} name="keyboard-arrow-left" />
        )}
      />
    </View>
  );
};

export default LeftGoBack;

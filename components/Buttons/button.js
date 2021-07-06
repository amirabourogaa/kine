import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export default function FlatButton({ text, onPress }) {
  return (
    <View style={{ marginTop: 30 }}>
      <LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        colors={["#243165", "#2b7da5d1"]}
        style={styles.button}
      >
        <TouchableRipple
          onPress={onPress}
          borderless={true}
          rippleColor="rgba(f, f, f, .10)"
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 80,
          }}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableRipple>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: 220,
    maxHeight: 45,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#00000000",
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

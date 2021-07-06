import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const FormButton = ({ buttonTitle, onPress, width, colors, disabled }) => {
  return (
    <View style={{ alignSelf: "center", height: 45, marginVertical: 10 }}>
      <LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        colors={disabled ? ["#ccc", "#ddd"] : colors}
        style={[styles.button, { width: width }]}
      >
        <TouchableRipple
          disabled={disabled}
          onPress={disabled ? () => {} : onPress}
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
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableRipple>
      </LinearGradient>
    </View>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxHeight: 45,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#00000000",
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  contentStyle: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ee6425",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    flex: 1,
    width: "100%",
    marginVertical: 15,
    maxHeight: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

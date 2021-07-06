import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from "react-native";
import OnBoarding from "../components/Exercices/OnBoarding";
import roundWhiteBackground from "../assets/background.png";
import { HeaderHeightContext } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

export default function Exercices() {
  return (
    <LinearGradient
      colors={["#2478a0", "#01d5fd"]}
      start={[0.1, 0.4]}
      end={[1, 0.4]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          backgroundColor={"transparent"}
          barStyle="light-content"
        />

        <HeaderHeightContext.Consumer>
          {(headerHeight) => (
            <View style={{ flex: 1, marginTop: headerHeight }}>
              <ImageBackground
                source={roundWhiteBackground}
                style={{
                  width: "100%",
                  height: "100%",
                  flex: 1,
                  marginTop: -50,
                  resizeMode: "cover",
                }}
              >
                <View style={{ flex: 1, marginTop: 100 }}>
                  <View style={styles.container}>
                    <OnBoarding />
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        </HeaderHeightContext.Consumer>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  StatusBar,
} from "react-native";
import FlatButton from "../../components/Buttons/button";
import LoginButton from "../../components/Buttons/loginButton";

import FormButton from "../../components/design/FormButton";

const StatusBarHeight = StatusBar.currentHeight;

export default function Landing({ navigation }) {
  return (
    <View style={styles.backgroundContainer}>
      {/* <StatusBar backgroundColor="#FFF" barStyle="dark-content" /> */}
      <View style={[styles.welcomeView, { marginTop: StatusBarHeight + 80 }]}>
        <Image
          style={{ width: 350, height: 250 }}
          source={require("../../assets/icon.jpg")}
        />

        <View style={{ marginTop: 70 }}>
          <FormButton
            disabled={false}
            buttonTitle="Se connecter"
            colors={["#cd6533", "#e29627", "#df9f27"]}
            width={220}
            onPress={() => {
              navigation.navigate("Login");
            }}
          />

          <FormButton
            disabled={false}
            buttonTitle="Créer un compte"
            colors={["#242c60", "#255482", "#25749d"]}
            width={220}
            onPress={() => {
              navigation.navigate("Register");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  welcomeView: {
    flex: 1,
    alignItems: "center",
  },
});

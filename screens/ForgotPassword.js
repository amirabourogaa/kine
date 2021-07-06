import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
} from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import FormButton from "../components/design/FormButton";
import FormInput from "../components/design/FormInput";
import loginImg from "../assets/icon.jpg";
import { LinearGradient } from "expo-linear-gradient";
import EmailValidation from "../utility/EmailValidation";
import { windowWidth, windowHeight } from "../components/utils/Dimensions";
import { HeaderHeightContext } from "@react-navigation/stack";
import { Snackbar } from "react-native-paper";

const StatusBarHeight = StatusBar.currentHeight;

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      visible: false,
      fieldsErrors: [
        {
          field: "email",
          message: [],
        },
      ],
    };
  }

  handelInputchange = (val, field) => {
    const { fieldsErrors } = this.state;

    const errorIndex = fieldsErrors.map((f) => f.field).indexOf(field);

    fieldsErrors[errorIndex].message = [];

    this.setState({
      ...this.state,
      fieldsErrors: fieldsErrors,
      [field]: val,
    });
  };

  handelSendResetCode = () => {
    const { email, fieldsErrors } = this.state;

    let validation = true;

    if (email.trim().length === 0) {
      validation = false;
      const errorMessage = "Adresse e-mail est obligatoire";

      const errorIndex = fieldsErrors.map((f) => f.field).indexOf("email");

      let messages = fieldsErrors[errorIndex].message;

      const msgIndex = messages.indexOf(errorMessage);

      if (msgIndex === -1) {
        fieldsErrors[errorIndex].message = [...messages, errorMessage];
      }

      this.setState({
        ...this.state,
        fieldsErrors: fieldsErrors,
      });
    }

    if (!EmailValidation(email)) {
      validation = false;

      const errorMessage = "Adresse de messagerie est invalide";

      const errorIndex = fieldsErrors.map((f) => f.field).indexOf("email");

      let messages = fieldsErrors[errorIndex].message;

      const msgIndex = messages.indexOf(errorMessage);

      if (msgIndex === -1) {
        fieldsErrors[errorIndex].message = [...messages, errorMessage];
      }

      this.setState({
        ...this.state,
        fieldsErrors: fieldsErrors,
      });
    }

    if (validation) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          this.setState({
            visible: true,
          });
        });
    }
  };

  onDismissSnackBar = () => {
    this.setState({ visible: false });
  };

  render() {
    const { email, fieldsErrors, visible } = this.state;

    return (
      <LinearGradient
        colors={["#298dbd", "#101f5a"]}
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
              <View style={{ marginTop: headerHeight }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 130,
                      height:
                        windowHeight - (headerHeight - (StatusBarHeight - 130)),
                      backgroundColor: "#FFF",
                      borderTopLeftRadius: windowWidth * 0.12,
                      borderTopRightRadius: windowWidth * 0.12,
                    }}
                  >
                    <View style={styles.container}>
                      <View style={styles.imgContainer}>
                        <Image source={loginImg} style={styles.logo} />
                      </View>

                      <View style={{ flex: 1, width: "90%", marginTop: 30 }}>
                        <Text style={styles.label}>Email</Text>
                        <FormInput
                          style={{ height: 45 }}
                          labelValue={email}
                          onChangeText={(email) =>
                            this.handelInputchange(email, "email")
                          }
                          iconType="account"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          theme={{ colors: { primary: "#999" } }}
                          fieldsErrors={fieldsErrors}
                          fieldName="email"
                        />

                        <View style={{ flex: 1, marginTop: 30 }}>
                          <FormButton
                            disabled={false}
                            width={windowWidth * 0.8}
                            colors={["#cd6533", "#e29627", "#df9f27"]}
                            buttonTitle="Réinitialiser mot de passe
                            "
                            onPress={this.handelSendResetCode}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </HeaderHeightContext.Consumer>
          <View style={styles.snackContainer}>
            <Snackbar
              style={{ backgroundColor: "#35bd14", color: "#FFF" }}
              theme={{ colors: { accent: "white" } }}
              visible={visible}
              onDismiss={this.onDismissSnackBar}
              action={{
                label: "X",
                onPress: () => {
                  this.props.navigation.navigate("Login");
                },
              }}
            >
              Envoie de réinitialisation avec succès !
            </Snackbar>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  snackContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imgContainer: {
    height: 180,
    width: 180,
    marginTop: -80,
    borderRadius: 90,
    elevation: 3,
    backgroundColor: "#FFF",
  },
  logo: {
    height: 180,
    width: 180,
    borderRadius: 90,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    marginLeft: 5,
    fontWeight: "600",
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
  },
  registerField: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  registerLabel: {
    color: "#888",
    fontSize: 14,
    flexShrink: 1,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  dividerText: {
    marginHorizontal: 10,
  },
  divider: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#888",
    width: "100%",
  },
});

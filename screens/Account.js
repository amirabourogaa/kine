import React, { PureComponent } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Title } from "react-native-paper";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import UserImage from "../components/UserImage/UserImage";
import { connect } from "react-redux";
import roundWhiteBackground from "../assets/background.png";

import FormButton from "../components/design/FormButton";

import { windowWidth } from "../components/utils/Dimensions";

const StatusBarHeight = StatusBar.currentHeight;

export class Account extends PureComponent {
  constructor(props) {
    super(props);
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  logout = () => {
    if (this.mounted) {
      firebase.auth().signOut();
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {
      firstName = "",
      lastName = "",
      sourceImg = "",
      address = "",
      num = "",
      email = "",
    } = this.props.userState.currentUser;

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
          <View
            style={{
              flex: 1,
              marginTop: StatusBarHeight + 20,
            }}
          >
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  alignSelf: "center",
                  marginTop: 15,
                }}
              >
                <UserImage sourceUrl={sourceImg} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    marginLeft: 10,
                    marginTop: -10,
                  }}
                >
                  <Title style={styles.title}>Bienvenue</Title>
                  <Title style={styles.title}>
                    {lastName} {firstName}
                  </Title>
                </View>
              </View>

              <ImageBackground
                source={roundWhiteBackground}
                style={{
                  width: "100%",
                  height: "100%",
                  flex: 1,
                  marginTop: 50,
                  resizeMode: "cover",
                }}
              >
                <View style={{ flex: 1, marginTop: 110 }}>
                  <LinearGradient
                    colors={["#242c60", "#255482", "#25749d"]}
                    start={[0.1, 0.4]}
                    end={[1, 0.4]}
                    style={{
                      width: "80%",
                      alignSelf: "center",
                      borderRadius: 20,
                      flexDirection: "column",
                      paddingHorizontal: 16,
                      paddingVertical: 20,
                    }}
                  >
                    <View style={styles.listItem}>
                      <FontAwesomeIcon
                        name="home"
                        size={24}
                        color="#FFF"
                        style={{ marginHorizontal: 8 }}
                      />
                      <Text style={styles.label}>{address}</Text>
                    </View>

                    <View style={styles.listItem}>
                      <FontAwesomeIcon
                        name="phone"
                        size={24}
                        color="#FFF"
                        style={{ marginHorizontal: 8 }}
                      />
                      <Text style={styles.label}> {num}</Text>
                    </View>

                    <View style={styles.listItem}>
                      <FontAwesomeIcon
                        name="envelope"
                        size={24}
                        color="#FFF"
                        style={{ marginHorizontal: 8 }}
                      />
                      <Text style={styles.label}>{email}</Text>
                    </View>
                  </LinearGradient>

                  <View style={{ flex: 1, marginTop: 40 }}>
                    <FormButton
                      disabled={false}
                      buttonTitle="Modifier mon compte"
                      colors={["#cd6533", "#e29627", "#df9f27"]}
                      width={windowWidth * 0.9}
                      onPress={() => {
                        this.props.navigation.navigate("EditProfile");
                      }}
                    />

                    <FormButton
                      disabled={false}
                      buttonTitle="Se Déconnecter"
                      colors={["#242c60", "#255482", "#25749d"]}
                      width={windowWidth * 0.9}
                      onPress={() => {
                        this.logout();
                      }}
                    />
                  </View>
                </View>
              </ImageBackground>
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07263e",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    paddingTop: 30,
    marginTop: -30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#0e4875",
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    flexShrink: 1,
    textTransform: "capitalize",
  },
  label: {
    fontSize: 16,
    color: "#FFF",
    flexShrink: 1,
    textTransform: "capitalize",
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  menuWrapper: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#FFF",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  listItem: {
    flexDirection: "row",
    marginVertical: 10,
  },
});

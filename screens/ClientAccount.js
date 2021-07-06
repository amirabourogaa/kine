import React, { PureComponent } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Pressable,
} from "react-native";
import { Title } from "react-native-paper";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import UserImage from "../components/UserImage/UserImage";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import roundWhiteBackground from "../assets/background.png";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FormButton from "../components/design/FormButton";
import { windowWidth } from "../components/utils/Dimensions";

const StatusBarHeight = StatusBar.currentHeight;

export class ClientDashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      videosTotal: 0,
      exercicesTotal: 0,
    };
    this.mounted = false;
  }

  logout = () => {
    if (this.mounted) {
      firebase.auth().signOut();
    }
  };

  async componentDidMount() {
    this.mounted = true;

    const { userId } = this.props.userState.currentUser;

    const videosTotal = await this.FetchVideosCount({ userId });

    const exercicesTotal = await this.FetchExercices({ userId });

    if (videosTotal) {
      if (this.mounted) {
        this.setState({ videosTotal, exercicesTotal });
      }
    }
  }

  FetchExercices = async ({ userId }) => {
    const querySnapshot = await firebase
      .firestore()
      .collection("exercices")
      .where("usersId", "array-contains", `${userId}`)
      .get();

    if (!querySnapshot.exists) {
      return querySnapshot.size;
    }

    return null;
  };

  FetchVideosCount = async ({ userId }) => {
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection("videos")
        .where("usersId", "array-contains", `${userId}`)
        .get();

      if (!querySnapshot.exists) {
        return querySnapshot.size;
      }

      return null;
    } catch (err) {
      return null;
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {
      address = "",
      email = "",
      firstName = "",
      lastName = "",
      num = "",
      role = "",
      sourceImg = "",
    } = this.props.userState.currentUser;

    const { videosTotal, exercicesTotal } = this.state;

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
                  <Title style={styles.title}>
                    {lastName} {firstName}
                  </Title>

                  <View style={{ flex: 1 }}>
                    <View style={styles.listItem}>
                      <FontAwesomeIcon
                        name="home"
                        size={20}
                        color="#FFF"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.label}>{address}</Text>
                    </View>
                    <View style={styles.listItem}>
                      <FontAwesomeIcon
                        name="phone"
                        size={20}
                        color="#FFF"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.label}> {num}</Text>
                    </View>

                    <View style={styles.listItem}>
                      <FontAwesomeIcon
                        name="envelope"
                        size={20}
                        color="#FFF"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.label}>{email}</Text>
                    </View>
                  </View>
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
                    colors={["#01d5fd", "#2478a0"]}
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
                    <Pressable
                      android_ripple={{ color: "#CCC" }}
                      onPress={() => {
                        this.props.navigation.navigate("Profile", {
                          screen: "Videos",
                        });
                      }}
                      style={{
                        width: "100%",
                        padding: 5,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          lignItems: "center",
                          marginLeft: 5,
                        }}
                      >
                        <FontAwesomeIcon
                          name="play"
                          size={20}
                          color="#FFF"
                          style={{ marginRight: 10, marginTop: 2 }}
                        />
                        <Text style={{ color: "#F1F1F1", fontSize: 18 }}>
                          Mes Vidéos ({videosTotal})
                        </Text>
                      </View>
                      <FontAwesomeIcon
                        name="chevron-right"
                        size={16}
                        color="#FFF"
                        style={{ marginRight: 10, marginTop: 2 }}
                      />
                    </Pressable>

                    <View
                      style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#FFF",
                        marginVertical: 10,
                      }}
                    />
                    <Pressable
                      android_ripple={{ color: "#CCC" }}
                      onPress={() => {
                        this.props.navigation.navigate("Profile", {
                          screen: "exercices",
                        });
                      }}
                      style={{
                        width: "100%",
                        padding: 5,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          lignItems: "center",
                          marginLeft: 5,
                        }}
                      >
                        <FontAwesomeIcon
                          name="file-text-o"
                          size={20}
                          color="#FFF"
                          style={{ marginRight: 10, marginTop: 2 }}
                        />
                        <Text style={{ color: "#F1F1F1", fontSize: 18 }}>
                          Mes Exercices ({exercicesTotal})
                        </Text>
                      </View>
                      <FontAwesomeIcon
                        name="chevron-right"
                        size={16}
                        color="#FFF"
                        style={{ marginRight: 10, marginTop: 2 }}
                      />
                    </Pressable>
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
                      colors={["#01d5fd", "#2478a0"]}
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

export default connect(mapStateToProps)(ClientDashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07263e",
  },
  title: {
    fontSize: 20,
    color: "#FFF",
    marginTop: 15,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    flexDirection: "row",
    height: 80,
    paddingVertical: 15,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
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
    marginVertical: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#F1F1F1",
    flexShrink: 1,
    letterSpacing: 0.3,
  },
});

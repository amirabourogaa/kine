import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  FlatList,
} from "react-native";
import { Title, Caption, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RemoveUser } from "../redux/actions";
import UserImage from "../components/UserImage/UserImage";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { LinearGradient } from "expo-linear-gradient";
import { windowWidth, windowHeight } from "../components/utils/Dimensions";
import { HeaderHeightContext } from "@react-navigation/stack";
import roundWhiteBackground from "../assets/background.png";

const marginTop = StatusBar.currentHeight + 10;

export class UserProfile extends PureComponent {
  handleDeleteUser = () => {
    const { userId } = this.props.route.params.user;

    this.props.RemoveUser({ userId });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (prevProps.usesrState !== this.props.usesrState) {
        const { userId } = this.props.route.params.user;
        const { users } = this.props.usesrState;
        const indexId = users.map((user) => user.userId).indexOf(userId);

        if (indexId === -1) {
          this.props.navigation.goBack();
        }
      }
    }
  }

  render() {
    const {
      address = "",
      email = "",
      firstName = "",
      lastName = "",
      num = "",
      sourceImg = "",
    } = this.props.route.params.user;

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
              <View style={{ flex: 1, marginTop: headerHeight }}>
                <ScrollView contentContainerStyle={{ flex: 1 }}>
                  <View>
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
                          justifyContent: "flex-start",
                          marginLeft: 15,
                          marginTop: 0,
                        }}
                      >
                        <Title style={styles.title}>
                          {lastName} {firstName}
                        </Title>
                      </View>
                    </View>
                  </View>
                  <ImageBackground
                    source={roundWhiteBackground}
                    style={{
                      width: "100%",
                      height: "100%",
                      flex: 1,
                      marginTop: 10,
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
                      <Button
                        labelStyle={{ fontSize: 18 }}
                        contentStyle={{ paddingVertical: 2 }}
                        style={{ margin: 50, borderRadius: 150 }}
                        color="#d60d0d"
                        icon="delete"
                        mode="contained"
                        onPress={() => this.handleDeleteUser()}
                      >
                        Supprimer
                      </Button>
                    </View>
                  </ImageBackground>
                </ScrollView>
              </View>
            )}
          </HeaderHeightContext.Consumer>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  usesrState: state.usersState,
});

export default connect(mapStateToProps, { RemoveUser })(UserProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07263e",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  title: {
    fontSize: 18,
    color: "#FFF",
    flexShrink: 1,
    textTransform: "capitalize",
    marginBottom: 10,
    marginTop: 10,
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
    marginLeft: 18,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  Text: {
    color: "#FFF",
  },
  listItem: {
    flexDirection: "row",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: "#DDD",
    flexShrink: 1,
    letterSpacing: 0.3,
  },
});

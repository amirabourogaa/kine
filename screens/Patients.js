import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderHeightContext } from "@react-navigation/stack";
import roundWhiteBackground from "../assets/background.png";
import { Avatar, List } from "react-native-paper";
import { connect } from "react-redux";
import { FetchUsers } from "../redux/actions";

const User = ({
  firstName,
  lastName,
  sourceImg = "https://icon-library.com/images/user-profile-icon/user-profile-icon-12.jpg",
  email,
  navigation,
  address,
  num,
  userId,
}) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Single User", {
          firstName,
          lastName,
          sourceImg,
          email,
          address,
          num,
          userId,
        });
      }}
      android_ripple={{ color: "#CCC" }}
      style={{ borderBottomWidth: 0.5, borderBottomColor: "#CCC" }}
    >
      <List.Item
        titleStyle={{ marginTop: 0 }}
        title={`${firstName} ${lastName}`}
        description={email}
        left={(props) => (
          <Avatar.Image
            style={{
              backgroundColor: "#00000000",
              marginTop: 10,
              marginRight: 10,
            }}
            source={{ uri: sourceImg }}
            size={35}
          />
        )}
      />
    </Pressable>
  );
};

export class Patients extends Component {
  componentDidMount() {
    this.props.FetchUsers();
  }

  render() {
    const { users } = this.props.usersState;

    const keyExtractor = (_, index) => index.toString();

    const renderItem = ({ item }) => {
      return <User {...item} navigation={this.props.navigation} />;
    };

    const renderEmptyItem = () => {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>
            Vous n'avez pas encore des patients !
          </Text>
        </View>
      );
    };

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
                    <View
                      style={{
                        backgroundColor: "#FFF",
                        elevation: 3,
                        margin: 10,
                        borderRadius: 10,
                      }}
                    >
                      <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        ListEmptyComponent={renderEmptyItem}
                      />
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
}

const mapStateToProps = (state) => ({
  usersState: state.usersState,
});

export default connect(mapStateToProps, { FetchUsers })(Patients);

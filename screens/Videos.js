import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Pressable,
} from "react-native";
import { Avatar, List } from "react-native-paper";
import roundWhiteBackground from "../assets/background.png";
import { HeaderHeightContext } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({ videosTotal }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        elevation: 1,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        backgroundColor: "#FFF",
        borderRadius: 5,
      }}
    >
      <Text style={{ fontSize: 20 }}>Nombre de vidéos : </Text>
      <Text style={{ fontSize: 18 }}>{videosTotal}</Text>
    </View>
  );
};

const VideosList = ({ videos, navigation }) => {
  const keyExtractor = (_, index) => index.toString();

  const renderItem = ({ item }) => {
    return <Video {...item} navigation={navigation} />;
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
          Vous n'avez pas encore des vidéos !
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor: "#FFF",
        borderRadius: 5,
      }}
    >
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyItem}
      />
    </View>
  );
};

const Video = ({ videoId, title, description, url, navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Single Video", {
          videoId,
          title,
          description,
          url,
        });
      }}
      android_ripple={{ color: "#CCC" }}
      style={{ borderBottomWidth: 0.5, borderBottomColor: "#CCC" }}
    >
      <List.Item
        titleStyle={{ marginTop: 0, fontSize: 18 }}
        title={title}
        description={description}
        descriptionStyle={{ fontSize: 16 }}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="video"
            size={45}
            color="#ee6425"
            style={{
              backgroundColor: "#F1F1F1",
              marginTop: 10,
              marginRight: 10,
            }}
          />
        )}
      />
    </Pressable>
  );
};

const FetchVideos = async ({ userId }) => {
  const data = {
    videos: [],
    videosTotal: null,
  };

  try {
    const querySnapshot = await firebase
      .firestore()
      .collection("videos")
      .where("usersId", "array-contains", `${userId}`)
      // .orderBy("createdAt", "desc")
      .get();

    if (!querySnapshot.exists) {
      data.videosTotal = querySnapshot.size;

      querySnapshot.forEach((documentSnapshot) => {
        const videoId = documentSnapshot.id;
        data.videos.push({ ...documentSnapshot.data(), videoId });
      });

      return data;
    }
  } catch (err) {
    // console.log("err : -----------------          ", err);
    return data;
  }
};

export class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      videosTotal: [],
    };
  }

  async componentDidMount() {
    const { userId } = this.props.userState.currentUser;

    const { videos, videosTotal } = await FetchVideos({ userId });

    this.setState({
      videos,
      videosTotal,
    });
  }

  render() {
    const { videos, videosTotal } = this.state;

    const Data = [
      {
        name: "header",
        videosTotal,
      },
      {
        name: "videos list",
        videos,
        navigation: this.props.navigation,
      },
    ];

    const keyExtractor = (_, index) => index.toString();

    const renderItem = ({ item }) => {
      if (item.name === "header") {
        return <Header {...item} />;
      }

      if (item.name === "videos list") {
        return <VideosList {...item} />;
      }

      return null;
    };

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
                    <FlatList
                      data={Data}
                      renderItem={renderItem}
                      keyExtractor={keyExtractor}
                    />
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
  userState: state.userState,
});

export default connect(mapStateToProps)(Videos);

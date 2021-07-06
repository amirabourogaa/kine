import React, { useState, useEffect } from "react";
import { View, LogBox, ActivityIndicator, StatusBar } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LeftGoBack from "./components/leftGoBack/leftGoBack";

LogBox.ignoreLogs(["Setting a timer"]);

const firebaseConfig = {
  apiKey: "AIzaSyAAi59vW7tJtxfxqpvBf5TE-ro0CEMx_t8",
  authDomain: "kine-f53b0.firebaseapp.com",
  projectId: "kine-f53b0",
  storageBucket: "kine-f53b0.appspot.com",
  messagingSenderId: "50896943001",
  appId: "1:50896943001:web:beec72743a494442a28508",
  measurementId: "G-F9JFZBKDHD",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import LandingScreen from "./screens/auth/Landing";
import RegisterScreen from "./screens/auth/Register";
import LoginScreen from "./screens/auth/Login";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfileScreen";
import PreviewScreen from "./screens/Preview";
import SingleUserScreen from "./screens/SingleUser";
import SingleVideoScreen from "./screens/SingleVideo";
import SingleRapportScreen from "./screens/SingleRapport";
import ForgotPasswordScreen from "./screens/ForgotPassword";

//NOTIFICATION INITIALIZE
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();
const Stacklog = createStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [userState, setUser] = useState();
  const [expoPushToken, setExpoPushToken] = useState("");

  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    const Notifsubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log(notification)
      }
    );

    const subscription = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    return () => {
      setInitializing(false);
      subscriber;
      Notifsubscription.remove();
      subscription.remove();
    };
  }, []);

  const handleNotificationResponse = (res) => {
    // console.log(res)
  };

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#FFA500" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />

      <NavigationContainer>
        {!userState ? (
          <Stack.Navigator initialRouteName="Bienvenue">
            <Stack.Screen
              name="Bienvenue"
              component={LandingScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: "Créer un compte",
                headerTransparent: true,
                headerStyle: { backgroundColor: "transparent" },
                headerTintColor: "#FFF",
                headerTitleAlign: "center",
                headerBackImage: (props) => <LeftGoBack {...props} />,
              }}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Se Connecter",
                headerTransparent: true,
                headerStyle: { backgroundColor: "transparent" },
                headerTintColor: "#FFF",
                headerTitleAlign: "center",
                headerBackImage: (props) => <LeftGoBack {...props} />,
              }}
            />

            <Stacklog.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{
                headerShown: true,
                title: "Recupérer mot de passe",
                headerShown: true,
                headerTransparent: true,
                headerStyle: { backgroundColor: "transparent" },
                headerTintColor: "#FFF",
                headerTitleAlign: "center",
                headerBackImage: (props) => <LeftGoBack {...props} />,
              }}
            />
          </Stack.Navigator>
        ) : null}

        {userState ? (
          <Stacklog.Navigator initialRouteName="Profile">
            <Stacklog.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />

            <Stacklog.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShown: true,
                title: "Modifier votre profil",
                headerTransparent: true,
                headerStyle: { backgroundColor: "transparent" },
                headerTintColor: "#FFF",
                headerTitleAlign: "center",
                headerBackImage: (props) => <LeftGoBack {...props} />,
              }}
            />

            <Stacklog.Screen
              name="Single Video"
              component={SingleVideoScreen}
              options={{ headerShown: false, title: "vidéo" }}
            />

            <Stacklog.Screen
              name="Preview"
              component={PreviewScreen}
              options={{ headerShown: true, title: "Envoyer mon rapport" }}
            />

            <Stacklog.Screen
              name="Single User"
              component={SingleUserScreen}
              options={{ headerShown: false }}
            />

            <Stacklog.Screen
              name="SingleRapport"
              component={SingleRapportScreen}
              options={{ headerShown: false }}
            />
          </Stacklog.Navigator>
        ) : null}
      </NavigationContainer>
    </Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log("token     :", token);
  }

  if (token) {
    await AsyncStorage.setItem("expoPushToken", token);
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

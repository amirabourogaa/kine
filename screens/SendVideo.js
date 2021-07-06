import React, { PureComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SendVideosScreen from "./SendVideos";

const Stack = createStackNavigator();

export class SendVideo extends PureComponent {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Diffusion des Vidéos"
          component={SendVideosScreen}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "#FFF",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default SendVideo;

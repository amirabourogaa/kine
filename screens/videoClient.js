import React, { PureComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VideosScreen from "./Videos";

const Stack = createStackNavigator();

export class videoClient extends PureComponent {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Mes vidéos"
          component={VideosScreen}
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

export default videoClient;

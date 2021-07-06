import React, { PureComponent } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExercicesScreen from "./Exercices";

const Stack = createStackNavigator();

export class exercicesClient extends PureComponent {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Mes exercices"
          component={ExercicesScreen}
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

export default exercicesClient;

import React, { PureComponent } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import ClientAccountScreen from "../../screens/ClientAccount";
import VideosScreen from "../../screens/videoClient";
import ExercicesScreen from "../../screens/exercicesClient";

const Tab = createMaterialBottomTabNavigator();

export class ClientDashboard extends PureComponent {
  render() {
    return (
      <Tab.Navigator
        barStyle={{ backgroundColor: "#FFF" }}
        initialRouteName="Account"
        labeled={false}
        shifting={false}
        activeColor="#1b8fb7"
        inactiveColor="#75bed6"
      >
        <Tab.Screen
          name="Account"
          component={ClientAccountScreen}
          options={{
            tabBarLabel: "Compte",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="home" color={color} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Videos"
          component={VideosScreen}
          options={{
            tabBarLabel: "Vidéos",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="play" color={color} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="exercices"
          component={ExercicesScreen}
          options={{
            tabBarLabel: "Mes exercices",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="file-text-o" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default ClientDashboard;

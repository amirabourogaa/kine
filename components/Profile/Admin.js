import React, { PureComponent } from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

import AccountScreen from "../../screens/Account";
import SendVideoScreen from "../../screens/SendVideo";
import UsersScreen from "../../screens/Users";
import RapportsScreen from "../../screens/Rapports";
import SendExercicesScreen from "../../screens/SendExercices";

const Tab = createMaterialBottomTabNavigator();

export class AdminDashboard extends PureComponent {
  render() {
    return (
      <Tab.Navigator
        barStyle={{ backgroundColor: "#FFF" }}
        initialRouteName="Account"
        labeled={false}
        shifting={false}
        activeColor="#25628d"
        inactiveColor="#7c9db7"
      >
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: "Compte",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="home" color={color} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Send Video"
          component={SendVideoScreen}
          options={{
            tabBarLabel: "Vidéos",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="play" color={color} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Users"
          component={UsersScreen}
          options={{
            tabBarLabel: "Patients",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="users" color={color} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Envoie d'exercice"
          component={SendExercicesScreen}
          options={{
            tabBarLabel: "Envoie d'exercice",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="file-text-o" color={color} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Reviews"
          component={RapportsScreen}
          options={{
            tabBarLabel: "Rapports",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="commenting" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default AdminDashboard;

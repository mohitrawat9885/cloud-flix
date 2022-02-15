import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './DashboardScreens/HomeScreens/Home';
import Detail from './DashboardScreens/HomeScreens/Detail';
import SearchScreen from './DashboardScreens/SearchScreen';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function Dashboard() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'SearchScreen') {
              iconName = focused ? 'search' : 'search';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'white',
        })}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </>
  );
}

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Material from 'react-native-vector-icons/MaterialIcons';
import { navigationRef } from './NavigationService';
import { useAuth } from '../global';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Product from '../pages/Product';
import { Forms } from '../pages';
import Finish from '../pages/Finish';
import ShowData from '../pages/ShowData';
import Confirm from '../pages/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabsScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'account-circle' : 'account-circle';
        }
        return <Material name={iconName} size={28} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: [
        {
          borderTopColor: '#ccc',
          height: '8%',
          backgroundColor: '#F7F7F7',
        },
      ],
      tabStyle: [
        {
          backgroundColor: '#F7F7F7',
        },
      ],
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Perfil" component={Perfil} />
  </Tab.Navigator>
);

const Authenticate = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Home">
    <Stack.Screen name="Home" component={TabsScreen} />
    <Stack.Screen name="Product" component={Product} />
    <Stack.Screen name="Forms" component={Forms} />
    <Stack.Screen name="Finish" component={Finish} />
    <Stack.Screen name="ShowData" component={ShowData} />
    <Stack.Screen name="Confirm" component={Confirm} />
  </Stack.Navigator>
);

const NotAuthenticate = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Product" component={Product} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);

export default function Routes() {
  const teste = useAuth();
  const { data } = useAuth();
  return (
    <NavigationContainer ref={navigationRef}>
      {data ? <Authenticate /> : <NotAuthenticate />}
    </NavigationContainer>
  );
}

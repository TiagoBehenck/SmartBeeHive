import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DataScreen from '../screens/DataScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const DataStack = createStackNavigator(
  {
    Data: DataScreen
  },
  config
)

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-link'}/>
  ),
};

HomeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Configurações',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';


const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  },
  config
);

AboutStack.navigationOptions = {
  tabBarLabel: 'Sobre',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' 
                                        ? `ios-information-circle${focused ? '' : '-outline'}`
                                        : 'md-information-circle'} />
  ),
};

AboutStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SettingsStack,
  AboutStack,
  DataStack
});

tabNavigator.path = '';

export default tabNavigator;

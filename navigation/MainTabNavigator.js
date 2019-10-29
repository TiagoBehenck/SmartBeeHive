import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DataScreen from '../screens/DataScreen'
import LogScreen from '../screens/LogScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarOptions: {
    activeTintColor: '#FCB43A',
    inactiveTintColor: '#3A3637',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}/>
  ),
};

HomeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Configurações',
  tabBarOptions: {
    activeTintColor: '#FCB43A',
    inactiveTintColor: '#3A3637',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';


const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  }
);

AboutStack.navigationOptions = {
  tabBarLabel: 'Sobre',
  tabBarOptions: {
    activeTintColor: '#FCB43A',
    inactiveTintColor: '#3A3637',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' 
                                        ? `ios-information-circle${focused ? '' : '-outline'}`
                                        : 'md-information-circle'} />
  ),
};

AboutStack.path = '';

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    SettingsStack,
    AboutStack,
  },
  {
    navigationOptions: {
      header: null,
      headerBackTitle: 'Voltar'
    }
  },
  
);

TabNavigator.path = '';


const mainStack = createStackNavigator(
  {
    Main: TabNavigator,
    Data: DataScreen,
    Log: LogScreen
  },
);


export default mainStack;

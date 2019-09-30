import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';

// TODO Table para listar um log do sensor em questão, seja ela (Temp, umidade, peso ou ruído)

export default function LogScreen({ navigation }) {

  const { params } = navigation.state
  const id = params.id

  return (
    <View style={styles.container}>
        <Text>Histórico de informações</Text>
        <Text>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: `${Colors.quaternaryColor}`,
    padding: 30
  },
});

LogScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  const title = params.title
  const id = params.id

  return {
    title,
    headerTintColor: '#F3C622',
    id,
    // headerStyle: { backgroundColor: '#3A3637'},
  }
}
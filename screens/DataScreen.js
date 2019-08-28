import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
  } from 'react-native';

import Colors from '../constants/Colors'
  
// TODO Tela onde vai aparecer as informações em "tempo real" da colmeia

export default function DataScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Temperatura' })} style={styles.button}>
          <Text style={styles.buttonText}> Temperatura: </Text>
        </TouchableOpacity >
        <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Umidade' })} style={styles.button}>
          <Text style={styles.buttonText}> Umidade: </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Peso' })} style={styles.button}>
          <Text style={styles.buttonText}> Peso: </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Ruído' })} style={styles.button}>
          <Text style={styles.buttonText}> Ruído: </Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.quaternaryColor}`,
    padding: 30
  },

  button: {
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: `${Colors.secundaryColor}`,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

DataScreen.navigationOptions = {
  title: 'Sensores',
  headerTintColor: '#F3C622',
  headerStyle: { backgroundColor: '#3A3637'},
};
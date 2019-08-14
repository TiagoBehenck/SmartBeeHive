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
        <Text> Sensores </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Log')} style={styles.button}>
          <Text style={styles.buttonText}> Temperatura: </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Umidade: </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Peso: </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Ruído: </Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.backgroundColor}`,
    padding: 30
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.quaternaryColor}`,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: `${Colors.quinaryColor}`,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
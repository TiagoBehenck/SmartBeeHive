import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet, 
    Platform
  } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';

import Colors from '../constants/Colors'

  
// TODO Tela onde vai aparecer as informações em "tempo real" da colmeia
// TODO Alinhar ícones a esquerda de cada botão

export default function DataScreen({ navigation }) {
  return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.button}>
            <TabBarIcon
                style={styles.buttonIcon}
                name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
            <Text style={styles.buttonText}> Data: </Text>
            <Text style={styles.buttonText}> 03/09/2019 </Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.button}>
          
            <TabBarIcon
              style={styles.buttonIcon}
              name={Platform.OS === 'ios' ? 'ios-alarm' : 'md-alarm'} />
            <Text style={styles.buttonText}>
              Hora:
            </Text>
            <Text style={styles.buttonText}> 18:00 </Text>

        </TouchableOpacity >

        <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Temperatura' })} style={styles.button}>
          
        <TabBarIcon
              style={styles.buttonIcon}
              name={Platform.OS === 'ios' ? 'ios-thermometer' : 'md-thermometer'} />
          <Text style={styles.buttonText}> Temperatura: </Text>
          <Text style={styles.buttonText}> 30ºC </Text>

        </TouchableOpacity >

        <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Umidade' })} style={styles.button}>
        

        <TabBarIcon
              style={styles.buttonIcon}
              name={Platform.OS === 'ios' ? 'ios-water' : 'md-water'} />        
          <Text style={styles.buttonText}> Umidade: </Text>
          <Text style={styles.buttonText}> 80% </Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Peso' })} style={styles.button}>

        <TabBarIcon
              style={styles.buttonIcon}
              name={Platform.OS === 'ios' ? 'ios-pulse' : 'md-pulse'} />   
          <Text style={styles.buttonText}> Peso: </Text>
          <Text style={styles.buttonText}> 37 Kg </Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Ruído' })} style={styles.button}>

        <TabBarIcon
              style={styles.buttonIcon}
              name={Platform.OS === 'ios' ? 'ios-volume-high' : 'md-volume-high'} /> 
          <Text style={styles.buttonText}> Ruído: </Text>
          <Text style={styles.buttonText}> 68 dB </Text>

        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: `#999999`,
    padding: 30
  },

  button: {
    flexDirection: 'row',
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    // padding: 20
  },

  buttonIcon: {
    marginLeft: 20,
  },


});

DataScreen.navigationOptions = {
  title: 'Sensores',
  headerTintColor: '#F3C622',
  // headerStyle: { backgroundColor: '#3A3637'},
};
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import Constants from 'expo-constants';
import NumericInput from 'react-native-numeric-input'

import Colors from '../constants/Colors';

// TODO Alinhar o texto de mínimo e máximo 
// TODO Enviar JSON para o back com o mínimo e máximo com o ID do sensor

export default function SettingsScreen() {


  // Exemplo JSON para enviar para o backend
  const data =
  {
    "tipo":18,
    "sensores":[
       {
          "id":1,
          "max":10,
          "min":5
       },
       {
          "id":2,
          "max":50,
          "min":6
       },
       {
          "id":3,
          "max":40,
          "min":7
       },
       {
          "id":4,
          "max":30,
          "min":8
       }
    ]
 }

 function sendData() {
   alert('Enviando dados')
 }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>

        <View style={styles.content}>

            <Text style={styles.title}> Temperatura (ºC) </Text>

            <View style={styles.input}>
              <NumericInput 
                onChange={value => console.log(value)}
                rounded = 'true'
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor='#5cb85c' 
                leftButtonBackgroundColor='#5cb85c'
              />
              <Text>ºC</Text>
              <NumericInput 
                onChange={value => console.log(value)}
                rounded = 'true'
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor='#d9534f' 
                leftButtonBackgroundColor='#d9534f'
              />        
              <Text>ºC</Text>
            </View>
            <View style={styles.subtitle}>
              <Text>Mínimo</Text>
              <Text>Máximo</Text>
            </View>

          </View>

          <View style={styles.content}>

            <Text style={styles.title}> Humidade (%) </Text>

            <View style={styles.input}>
              <NumericInput 
                onChange={value => console.log(value)}
                rounded = 'true'
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor='#5cb85c' 
                leftButtonBackgroundColor='#5cb85c'
              />
              <NumericInput 
                onChange={value => console.log(value)}
                rounded = 'true'
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor='#d9534f' 
                leftButtonBackgroundColor='#d9534f'
              />        
            </View>
            <View style={styles.subtitle}>
              <Text>Mínimo</Text>
              <Text>Máximo</Text>
            </View>

          </View>

          <View style={styles.content}>

            <Text style={styles.title}> Ruído (dB) </Text>

            <View style={styles.input}>
              <NumericInput 
                onChange={value => console.log(value)}
                rounded = 'true'
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor='#5cb85c' 
                leftButtonBackgroundColor='#5cb85c'
              />
              <NumericInput 
                onChange={value => console.log(value)}
                rounded = 'true'
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor='#d9534f' 
                leftButtonBackgroundColor='#d9534f'
              />        
            </View>
            <View style={styles.subtitle}>
              <Text>Mínimo</Text>
              <Text>Máximo</Text>
            </View>

          </View>

          <View style={styles.content}>

            <Text style={styles.title}> Peso (kg) </Text>

            <View style={styles.input}>
              <NumericInput 
                onChange={value => console.log(value)}
                rounded = 'true'
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor='#5cb85c' 
                leftButtonBackgroundColor='#5cb85c'
              />
              <NumericInput 
                onChange={value => console.log(value)}
                rounded = 'true'
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor='#d9534f' 
                leftButtonBackgroundColor='#d9534f'
              />        
            </View>
            <View style={styles.subtitle}>
              <Text>Mínimo</Text>
              <Text>Máximo</Text>
            </View>

          </View>

          

      
      <TouchableOpacity style={styles.button} onPress={()=>sendData()}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollview: {
    marginHorizontal: 20,
    padding: 10,
  },
  content: {
    marginBottom: 5,
    display: 'flex',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 20,
    width: '100%',
    justifyContent: 'flex-start',
  },
  title: {
    paddingBottom: 10,
  },
  input: {
    // padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  subtitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    alignItems: 'center',
  },
  button: {  
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.quaternaryColor}`,
    borderRadius: 4,
    marginTop: 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton : {
    color:`${Colors.tertiaryColor}`,
    fontWeight: 'bold',
    fontSize: 16,
  }
});


SettingsScreen.navigationOptions = {
  title: 'Configuração',
  headerTintColor: '#F3C622',
  // headerStyle: { backgroundColor: '#3A3637'},
};

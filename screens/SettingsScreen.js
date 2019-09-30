import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';

import NumericInput from 'react-native-numeric-input'

import Colors from '../constants/Colors';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
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
            {/* <Text>ºC</Text> */}
            <NumericInput 
              onChange={value => console.log(value)}
              rounded = 'true'
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor='#d9534f' 
              leftButtonBackgroundColor='#d9534f'
            />        
            {/* <Text>ºC</Text> */}
          </View>
          <View style={styles.subtitle}>
            <Text>Mínimo</Text>
            <Text>Máximo</Text>
          </View>

        </View>

      {/* <View style={styles.row}>
        <Text>
          Umidade
        </Text>
        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          />
          <Text>%</Text>
          <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          />
          <Text>%</Text>
      </View>

      <View style={styles.row}>
        <Text>
          Ruido
        </Text>
        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          />
          <Text>dB</Text>
          <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          />
          <Text>dB</Text>
      </View>
    
      <View style={styles.row}> 
        <Text>
          Peso
        </Text>
        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          />
          <Text>KG</Text>
          <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          />
          <Text>KG</Text>
      </View> */}

     <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
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
    padding: 10,
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

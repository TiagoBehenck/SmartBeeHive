import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { TextInput } from 'react-native-paper';

import Colors from '../constants/Colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>
          Temperatura
        </Text>
          <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          />
          <Text>ºC</Text>
          <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          />
          <Text>ºC</Text>
        </View>

      <View style={styles.row}>
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
      </View>
     <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  row: {
    marginBottom: 5,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 10,
    width: '100%',
    justifyContent: 'space-around',
  },
  input: {
    height: "100%",
    width: 50,
    marginLeft: 10
  },
  button: {  
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.quaternaryColor}`,
    borderRadius: 4,
    marginTop: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Temperatura</Text>
      <Text>Umidade</Text>
      <Text>Ruido</Text>
      <Text>Peso</Text>
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
  button: {  
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.quaternaryColor}`,
    borderRadius: 4,
    marginTop: 10,
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

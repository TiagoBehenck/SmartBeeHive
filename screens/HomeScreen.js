import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

// TODO botões listando as colmeias

export default function HomeScreen({ navigation }) {

  // async function handleLogin() {
  //   navigation.navigate('DataScreen')
  // }

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={() => navigation.navigate('Data')} style={styles.button}>
        <Text style={styles.buttonText}>Colmeia 1</Text>
      </TouchableOpacity>
    </View>
    ); 
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
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: `${Colors.secundaryColor}`,
    fontSize: 16,
  },

});

HomeScreen.navigationOptions = {
  title: 'SmartBeeHive',
  headerTintColor: '#F3C622',
  // headerStyle: { backgroundColor: '#3A3637'},
};
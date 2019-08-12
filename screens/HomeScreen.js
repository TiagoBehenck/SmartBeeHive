import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

// TODO botões listando as colmeias

export default function HomeScreen() {
  return (
    <View style={styles.container} >
      <TouchableOpacity style={styles.button}>
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
    backgroundColor: '#FAFAFA',
    padding: 30
  },
  button: {  
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
})

HomeScreen.navigationOptions = {
  title: 'SmartBeeHive',
};
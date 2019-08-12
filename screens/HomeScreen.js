import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

// TODO botões listando as colmeias

export default function HomeScreen() {
  return (
    <View style={styles.container} >
      <Text>Teste</Text>
    </View>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFA'
  }
})

HomeScreen.navigationOptions = {
  title: 'SmartBeeHive',
};
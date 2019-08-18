import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

// TODO Table para listar um log do sensor em questão, seja ela (Temp, umidade, peso ou ruído)

export default function LogScreen() {

  return (
    <ScrollView style={styles.container}>
        <Text>Histórico de informações</Text>
    </ScrollView>
  );
}

LogScreen.navigationOptions = ({ navigation }) => {
  const { params } = navigation.state
  const title = params.title
  
  return {
    title
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#FAFAFA',
  },
});

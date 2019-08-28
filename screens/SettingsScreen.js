import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Configurações</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.quaternaryColor}`,
    padding: 30
  },
});


SettingsScreen.navigationOptions = {
  title: 'Configuração',
  headerTintColor: '#F3C622',
  headerStyle: { backgroundColor: '#3A3637'},
};

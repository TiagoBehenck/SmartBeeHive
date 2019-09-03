import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';

export default function AboutScreen() {
  return (
      <View style={styles.container}>
        <Text>TCC</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: `${Colors.quaternaryColor}`,
    padding: 30
  },
});


AboutScreen.navigationOptions = {
  title: 'Sobre',
  headerTintColor: '#F3C622',
  // headerStyle: { backgroundColor: '#3A3637'},
};

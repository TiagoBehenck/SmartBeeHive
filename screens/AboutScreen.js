import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <ExpoLinksView />
      <Text>TCC</Text>
    </ScrollView>
  );
}

AboutScreen.navigationOptions = {
  title: 'Sobre',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#FAFAFA',
  },
});

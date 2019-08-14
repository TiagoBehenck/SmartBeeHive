import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <ExpoLinksView />
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
    backgroundColor: '#fff',
  },
});

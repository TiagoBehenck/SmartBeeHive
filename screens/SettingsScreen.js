import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default function SettingsScreen() {
  return <ExpoConfigView />;
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};

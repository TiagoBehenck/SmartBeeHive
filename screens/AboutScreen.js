import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import api from "../services/api";

export default function AboutScreen() {
  const [colmeias, setColmeias] = useState({});

  async function getData() {
    const response = await api.get(
      '/phpjoao.php?dados={"tipo":13,"apicultor":4}'
    );

    setColmeias(response.data.colmeias);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => getData()} style={styles.button}>
        <Text>Clique para carregar os dados da API</Text>
      </TouchableOpacity>

      {colmeias.length &&
        colmeias.map((colmeia, i) => (
          <Text key={i}>
            {colmeia.id} | {colmeia.descricao}
          </Text>
        ))}
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
  button: {  
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


AboutScreen.navigationOptions = {
  title: 'Sobre',
  headerTintColor: '#F3C622',
  // headerStyle: { backgroundColor: '#3A3637'},
};

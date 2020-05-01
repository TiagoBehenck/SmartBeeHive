import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../constants/Colors";
import api from "../services/api";

export default class AboutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colmeias: [],
    };
  }

  async componentDidMount() {
    const response = await api.get(
      '/conexao.php?dados={"tipo":13,"apicultor":4}'
    );

    this.setState({ colmeias: response.data.colmeias });

    // console.log(this.state.colmeias);
  }

  render() {
    return this.state.colmeias.length ? (
      <>
        {this.state.colmeias.length &&
          this.state.colmeias.map((colmeia) => (
            <View style={styles.container} key={colmeia.id}>
              <View style={styles.label}>
                <Text style={styles.text}>Proprietário:</Text>
                <Text style={styles.text}>{colmeia.nome}</Text>
              </View>

              <View style={styles.label}>
                <Text style={styles.text}>Descrição:</Text>
                <Text style={styles.text}>{colmeia.descricao}</Text>
              </View>
            </View>
          ))}
      </>
    ) : (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  label: {
    flexDirection: "row",
    height: 60,
    alignSelf: "stretch",
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 50,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    color: `${Colors.secundaryColor}`,
    fontSize: 16,
  },
});

AboutScreen.navigationOptions = {
  title: "Sobre",
  headerTintColor: "#F3C622",
  // headerStyle: { backgroundColor: '#3A3637'},
};

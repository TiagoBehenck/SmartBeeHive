import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";

import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import TabBarIcon from '../components/TabBarIcon';

import Colors from "../constants/Colors";
import api from "../services/api";

// TODO Alinhar ícones a esquerda de cada botão
// TODO Colocar a data e hora como uma "nota de rodapé" no botão 
export default class DataScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      leituras: []
    };
  }

  async componentDidMount() {

    const response = await api.get('/conexao.php?dados=%7B%22tipo%22:14%7D')
    
    this.setState({ leituras: response.data.leituras  });
 
  }

  render() {
    return this.state.leituras.length ? (
      <View style={styles.container}>
        {this.state.leituras.length && this.state.leituras.map(leitura => (
          <View key={leitura.id} style={styles.data}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Log', { title: 'Histórico', id: `${leitura.id}` })}} style={styles.button}>
                  <TabBarIcon
                      style={styles.buttonIcon}
                      name={Platform.OS === 'ios' ? `${leitura.iconios}` : `${leitura.iconand}`} />
                    <Text> {leitura.sensor}: </Text>
                    <Text> {leitura.valor_sensor} </Text>
                    <Text>{format(parseISO(leitura.dataHora), "dd 'de' MMMM', às ' HH:mm'h'", { locale: pt })}</Text>
              </TouchableOpacity> 
          </View>
          ))}
      </View>
    ) : (
      <View style={styles.container}>
         <Text>Carregando...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
    // backgroundColor: `#999999`,
  },

  data: {
    alignSelf: 'stretch',
    padding: 10
  },

  button: {
    flexDirection: 'row',
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  buttonIcon: {
    marginLeft: 20,
  },


});

DataScreen.navigationOptions = {
  title: 'Sensores',
  headerTintColor: '#F3C622',
  // headerStyle: { backgroundColor: '#3A3637'},
};
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
            <TouchableOpacity key={leitura.id} onPress={() => {this.props.navigation.navigate('Log', { title: 'Histórico', id: `${leitura.id}` })}} style={styles.button}>
              <View style={styles.info}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TabBarIcon
                      style={styles.buttonIcon}
                      name={Platform.OS === 'ios' ? `${leitura.iconios}` : `${leitura.iconand}`} />
                   <Text> {leitura.sensor}: </Text>
                </View>
                  <Text> {leitura.valor_sensor} {leitura.um}</Text>
              </View>
              <View style={styles.date}>
                <Text style={{color: '#999'}}>{format(parseISO(leitura.dataHora), "dd 'de' MMMM', às ' HH:mm'h'", { locale: pt })}</Text>
              </View>
           </TouchableOpacity> 
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
    padding: 10
  },

  button: {
    height: 65,
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start'
  },

  buttonIcon: {
    padding: 2
  },

  info: {
    marginTop: 5,
    paddingHorizontal: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },

  date: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 50
  }

});

DataScreen.navigationOptions = {
  title: 'Sensores',
  headerTintColor: '#F3C622',
};
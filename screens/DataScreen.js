import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import TabBarIcon from '../components/TabBarIcon';

import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import Colors from "../constants/Colors";
import api from "../services/api";

//  TODO Tela onde vai aparecer as informações em "tempo real" da colmeia
//  TODO Alinhar ícones a esquerda de cada botão
export default class DataScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      leituras: []
    };
  }

  async componentDidMount() {

    const response = await api.get('/phpjoao.php?dados=%7B%22tipo%22:14%7D')
    
    this.setState({ leituras: response.data.leituras  });
 
  }

  render() {
    return this.state.leituras.length ? (
      <View style={styles.container}>
        {this.state.leituras.length && this.state.leituras.map(leitura => (
          <View key={leitura.id} style={styles.data}>
            <TouchableOpacity style={styles.button}>
                  <TabBarIcon
                      style={styles.buttonIcon}
                      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
                    <Text> Data: </Text>
                    <Text>{format(parseISO(leitura.dataHora), "dd 'de' MMMM', às ' HH:mm'h'", { locale: pt })}</Text>
              </TouchableOpacity> 
          
              <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Temperatura' })} style={styles.button}>
                   <TabBarIcon
                         style={styles.buttonIcon}
                         name={Platform.OS === 'ios' ? 'ios-thermometer' : 'md-thermometer'} />
                     <Text> Temperatura: </Text>
                     <Text> {leitura.valor_sensor} ºC</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Umidade' })} style={styles.button}>
                  <TabBarIcon
                        style={styles.buttonIcon}
                        name={Platform.OS === 'ios' ? 'ios-water' : 'md-water'} />        
                    <Text> Umidade: </Text>
                    <Text> 80% </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Peso' })} style={styles.button}>
                   <TabBarIcon
                        style={styles.buttonIcon}
                        name={Platform.OS === 'ios' ? 'ios-pulse' : 'md-pulse'} />   
                    <Text> Peso: </Text>
                    <Text> 37 Kg </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Ruído' })} style={styles.button}>
                    <TabBarIcon
                      style={styles.buttonIcon}
                      name={Platform.OS === 'ios' ? 'ios-volume-high' : 'md-volume-high'} /> 
                  <Text> Ruído: </Text>
                  <Text> 68 dB </Text>
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
    padding: 30
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
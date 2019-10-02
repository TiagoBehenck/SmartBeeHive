import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import DatePicker from 'react-native-datepicker';

import api from '../services/api'

// TODO Table para listar um log do sensor em questão, seja ela (Temp, umidade, peso ou ruído)
// TODO A data buga e fica ambos input com a data do dia atual 

async function sendData() {
  alert('Funcionando =)')
}

export default function LogScreen({ navigation }) {

  const { params } = navigation.state
  const id = params.id
  
  const [state, setState] = useState({ dataInicio: new Date, dataFinal: new Date });

  return (
    <View style={styles.container}>
      
        <Text style={styles.tite}>
          {/* {id} */}
          Selecione o intervalo de datas:
        </Text>

        <Text>Data Início:</Text>
        <DatePicker
          style={styles.input}
          date={state.dataInicio}
          mode="date"
          format="DD/MM/YYYY"
          maxDate={new Date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => setState({  dataInicio : date })}
        />

        <Text>Data Final:</Text>
        <DatePicker
          style={styles.input}
          date={state.dataFinal}
          mode="date" 
          placeholder="Data"
          format="DD/MM/YYYY"
          maxDate={new Date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              alignSelf: 'stretch',
            }
          }}
          onDateChange={(date) => setState({ dataFinal : date })}
        />

        {/* <TouchableOpacity onPress={() => sendData()}>
          <Text>Pesquisar</Text>
        </TouchableOpacity> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  title: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  input: {
    width: 300,
    marginTop: 10
  }
});

LogScreen.navigationOptions = ({ navigation }) => {

  const { params } = navigation.state
  const title = params.title
  const id = params.id

  return {
    title,
    headerTintColor: '#F3C622',
    id,
  }
}
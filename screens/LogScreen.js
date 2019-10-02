import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import DatePicker from 'react-native-datepicker';

import api from '../services/api'

// TODO Table para listar um log do sensor em questão, seja ela (Temp, umidade, peso ou ruído)


async function sendData() {
  alert('Funcionando =)')
}

export default function LogScreen({ navigation }) {

  const { params } = navigation.state
  const id = params.id
  const [state, setState] = useState({});

  setState(new Date)


  return (
    <View style={styles.container}>
      
        <Text style={styles.tite}>
          {/* {id} */}
          Selecione o intervalo de datas:
        </Text>

        <DatePicker
          style={styles.input}
          date={state}
          mode="date"
          format="DD-MM-YYYY"
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
          onDateChange={(date) => {useState({date: date})}}
        />


        <DatePicker
          style={styles.input}
          mode="date" 
          placeholder="Data"
          format="DD-MM-YYYY"
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
          onDateChange={(date) => {console.log(date)}}
        />

        {/* <TouchableOpacity onPress={() => sendData()}>
          <Text>Olá mundo</Text>
        </TouchableOpacity> */}

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
    // headerStyle: { backgroundColor: '#3A3637'},
  }
}
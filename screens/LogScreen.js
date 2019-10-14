import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import DatePicker from 'react-native-datepicker';

import Colors from '../constants/Colors';

import api from '../services/api'

// TODO Table para listar um log do sensor em questão, seja ela (Temp, umidade, peso ou ruído)
// TODO A data buga e fica ambos input com a data do dia atual 



export default function LogScreen({ navigation }) {

  const { params } = navigation.state
  const id = params.id

  const [leituras, setLeituras] = useState([])
  const [dataInicio, setDataInicio] = useState("2019/09/25");
  const [dataFim, setDataFim] = useState("2019/09/30");

  async function sendData(dataInicio, dataFim) {

    const response = await api.get(`/conexao.php?dados={"tipo":16,"id":${id},"dtini":"${dataInicio}","dtfim":"${dataFim}"}`)
    // console.log(response);
    setLeituras([response.data.leituras]);
  }

  return (
    <View style={styles.container}>
      
        <Text style={styles.title}>
          {/* {id} */}
          Selecione o intervalo de datas:
        </Text>

        <Text style={styles.date}> Início: </Text>
        <DatePicker
          style={styles.input}
          date={dataInicio}
          mode="date"
          format="YYYY/MM/DD"
          // maxDate={new Date}
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
          onDateChange={(date) => setDataInicio(date)}
        />

        <Text style={styles.date}> Final: </Text>
        <DatePicker
          style={styles.input}
          date={dataFim}
          mode="date" 
          placeholder="Data"
          format="YYYY/MM/DD"
          // maxDate={new Date}
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
          onDateChange={(date) => setDataFim(date)}
        />

        <TouchableOpacity onPress={() => sendData(dataInicio, dataFim)} style={styles.button}>
        <TabBarIcon
            name={Platform.OS === 'ios' ? `ios-search` : `md-search`} />
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
        
              <View>
                <Text>Data: {leituras.dataHora}</Text>
                <Text>Valor sensor: {leituras.valor_sensor}</Text>
              </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  date: {
    justifyContent: 'flex-start',
    marginTop: 10
  },
  input: {
    width: 350,
    marginTop: 10,
  }, 
  button: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 50,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: `${Colors.secundaryColor}`,
    fontSize: 16,
    paddingHorizontal: 20
  },
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
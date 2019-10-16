import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import DatePicker from 'react-native-datepicker';

import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import Colors from '../constants/Colors';

import api from '../services/api'

// TODO Table para listar um log do sensor em questão, seja ela (Temp, umidade, peso ou ruído)

export default function LogScreen({ navigation }) {

  const { params } = navigation.state
  const id = params.id
  const um = params.um
  const title = params.title

  const [leituras, setLeituras] = useState([])
  const [dataInicio, setDataInicio] = useState("2019/09/25");
  const [dataFim, setDataFim] = useState("2019/09/30");

  async function sendData(dataInicio, dataFim) {

    const response = await api.get(`/conexao.php?dados={"tipo":16,"id":${id},"dtini":"${dataInicio}","dtfim":"${dataFim}"}`)
    // console.log(response);
    setLeituras(response.data.leituras);
  }

  return (
    
      <View style={styles.container}>
        
          <Text style={styles.title}>
            Selecione o intervalo de datas:
          </Text>

          <Text style={styles.date}> Início: </Text>
          <DatePicker
            style={styles.input}
            date={dataInicio}
            mode="date"
            placeholder="Ano/Mês/Dia"
            format="YYYY/MM/DD"
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
            onDateChange={(date) => setDataInicio(date)}
          />

          <Text style={styles.date}> Final: </Text>
          <DatePicker
            style={styles.input}
            date={dataFim}
            mode="date" 
            placeholder="Ano/Mês/Dia"
            format="YYYY/MM/DD"
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
            onDateChange={(date) => setDataFim(date)}
          />

          <TouchableOpacity onPress={() => sendData(dataInicio, dataFim)} style={styles.button}>
          <TabBarIcon
              name={Platform.OS === 'ios' ? `ios-search` : `md-search`} />
            <Text style={styles.buttonText}>Pesquisar</Text>
          </TouchableOpacity>

          <ScrollView>
            <View style={styles.content}>
              <Text>
                {title}
              </Text>
              {!!leituras.length && leituras.map(leitura =>(
                <View style={styles.row} key={leitura.dataHora}>
                  <Text style={styles.text}>{format(parseISO(leitura.dataHora), "dd 'de' MMMM',' HH:mm:ss", { locale: pt })}</Text>
                  <Text style={styles.valor}> {leitura.valor_sensor} {um} </Text>
                </View>
              ))}
            </View>
        </ScrollView>
  
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
  content: {
    marginTop: 10,
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  row: {
    alignSelf: 'stretch',
    marginTop: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  text: {
    color: '#999',
    paddingHorizontal: 5,
  },
  valor: {
    paddingHorizontal: 5,
  }
});

LogScreen.navigationOptions = ({ navigation }) => {

  const { params } = navigation.state
  const title = params.title
  const id = params.id
  const um = params.um
  // const title = params.title

  return {
    title,
    headerTintColor: '#F3C622',
    id,
    um,
    title
  }
}
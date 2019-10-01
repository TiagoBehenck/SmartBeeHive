import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import DatePicker from 'react-native-datepicker';

import Colors from '../constants/Colors';

// TODO Table para listar um log do sensor em questão, seja ela (Temp, umidade, peso ou ruído)

export default function LogScreen({ navigation }) {

  const { params } = navigation.state
  const id = params.id

  return (
    <View style={styles.container}>
        <Text>Histórico de informações</Text>
        <Text>{id}</Text>

        <DatePicker
          style={{width: 200}}
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
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
          onDateChange={(date) => {console.log(date)}}
        />


        <DatePicker
          style={{width: 200}}
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
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
          onDateChange={(date) => {console.log(date)}}
        />


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
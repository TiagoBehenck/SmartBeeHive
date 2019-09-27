import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import TabBarIcon from '../components/TabBarIcon';

import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import Colors from "../constants/Colors";
import api from "../services/api";

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
      <View>
        {this.state.leituras.length && this.state.leituras.map(leitura => (
          <View key={leitura.id} style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <TabBarIcon
                    style={styles.buttonIcon}
                    name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
                  <Text>Data:</Text>
                  <Text>{format(parseISO(leitura.dataHora), "'Dia' dd 'de' MMMM', às ' HH:mm'h'", { locale: pt })}</Text>
              </TouchableOpacity> 
              <TouchableOpacity>
                  <Text>{leitura.valor_sensor}</Text>
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

//  TODO Tela onde vai aparecer as informações em "tempo real" da colmeia
//  TODO Alinhar ícones a esquerda de cada botão

// export default function DataScreen({ navigation }) {
//   const [data, setData] = useState({});


//   async function getData() {
//     const response = await api.get(
//       '/phpjoao.php?dados=%7B%22tipo%22:14%7D'
//     )
    
//     setData(response.data.leituras);
//   }

//   return (
//       <View style={styles.container}>

//         <TouchableOpacity onPress={() => getData()} style={styles.button}>
//             <TabBarIcon
//                 style={styles.buttonIcon}
//                 name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
//             <Text style={styles.buttonText}> Data: </Text>
//             <Text style={styles.buttonText}> 03/09/2019 </Text>
//         </TouchableOpacity >

//         {data.length &&
//         data.map((data, i) => (
//           <Text key={i}>
//             {data.valor_sensor} | {data.dataHora}
//           </Text>
//         ))}

// {/* 
//         <TouchableOpacity style={styles.button}>
          
//             <TabBarIcon
//               style={styles.buttonIcon}
//               name={Platform.OS === 'ios' ? 'ios-alarm' : 'md-alarm'} />
//             <Text style={styles.buttonText}>
//               Hora:
//             </Text>
//             <Text style={styles.buttonText}> 18:00 </Text>

//         </TouchableOpacity >

//         <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Temperatura' })} style={styles.button}>
          
//         <TabBarIcon
//               style={styles.buttonIcon}
//               name={Platform.OS === 'ios' ? 'ios-thermometer' : 'md-thermometer'} />
//           <Text style={styles.buttonText}> Temperatura: </Text>
//           <Text style={styles.buttonText}> 30ºC </Text>

//         </TouchableOpacity >

//         <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Umidade' })} style={styles.button}>
        

//         <TabBarIcon
//               style={styles.buttonIcon}
//               name={Platform.OS === 'ios' ? 'ios-water' : 'md-water'} />        
//           <Text style={styles.buttonText}> Umidade: </Text>
//           <Text style={styles.buttonText}> 80% </Text>

//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Peso' })} style={styles.button}>

//         <TabBarIcon
//               style={styles.buttonIcon}
//               name={Platform.OS === 'ios' ? 'ios-pulse' : 'md-pulse'} />   
//           <Text style={styles.buttonText}> Peso: </Text>
//           <Text style={styles.buttonText}> 37 Kg </Text>

//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('Log', { title: 'Ruído' })} style={styles.button}>

//         <TabBarIcon
//               style={styles.buttonIcon}
//               name={Platform.OS === 'ios' ? 'ios-volume-high' : 'md-volume-high'} /> 
//           <Text style={styles.buttonText}> Ruído: </Text>
//           <Text style={styles.buttonText}> 68 dB </Text>

//         </TouchableOpacity> */}
//       </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: `#999999`,
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

  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    // padding: 20
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
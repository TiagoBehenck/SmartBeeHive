import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

// import api from '../services/api';

export default function AboutScreen() {
  const  [ colmeias, setColmeias ] = useState({})

  function getData() {
    fetch("http://spacious-mistrial.000webhostapp.com/phpjoao.php?dados={%22tipo%22:13,%22apicultor%22:4}")
    .then(res => res.json())
    .then(res => this.setState({ colmeias: res }))
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => getData()} style={styles.button}> 
          {colmeias && colmeias.map(colmeia => {
            <Text>{colmeia.id}</Text>
          })}
        </TouchableOpacity>
      </View>
  );
}

// export default function AboutScreen() {

//   return (
//       <View style={styles.container}>
//         <TouchableOpacity onPress={() => getData()} style={styles.button}> 
//           <Text>TCC</Text>
//         </TouchableOpacity>
//       </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: `${Colors.quaternaryColor}`,
    padding: 30
  },
  button: {  
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: `${Colors.primaryColor}`,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


AboutScreen.navigationOptions = {
  title: 'Sobre',
  headerTintColor: '#F3C622',
  // headerStyle: { backgroundColor: '#3A3637'},
};

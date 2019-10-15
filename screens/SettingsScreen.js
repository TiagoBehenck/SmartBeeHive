import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';
import Constants from 'expo-constants';
import NumericInput from 'react-native-numeric-input'

// import _ from 'lodash'

import api from '../services/api'
import Colors from '../constants/Colors';

export default function SettingsScreen() {


    const [minTemp, setminTemp] = useState(0);
    const [maxTemp, setmaxTemp] = useState(0);
    const [minUmd,  setminUmd] = useState(0);
    const [maxUmd,  setmaxUmd] = useState(0);
    const [minRuido, setminRuido] = useState(0);
    const [maxRuido, setmaxRuido] = useState(0);
    const [minPeso, setminPeso] = useState(0);
    const [maxPeso, setmaxPeso] = useState(0);


    // const stateById = useMemo(() => {
    //     return _.keyBy(state, "id")
    // }, [state])


    // function change(id, {min, max}) {
    //     if(!stateById[id]) {
    //         setState([...state, {id, min, max}])
    //         return;
    //     }

	//     if(min) {
    //     	stateById[id].min = min;
	//     }
	//     if(max) {
    //     	stateById[id].max = max;
	//     }	
    // }

    async function sendData() {

      const response = await api.post(`/conexao.php?dados={"tipo":18,"sensores":[{"id":1,"max":${maxTemp},"min":${minTemp}},{"id":2,"max":${maxUmd},"min":${minUmd}},{"id":3,"max":${maxPeso},"min":${minPeso}},{"id":4,"max":${maxRuido},"min":${minRuido}}]}`)

      console.log("Enviar para o BACK >>", response)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollview}>

                <View style={styles.content}>

                    <Text style={styles.title}> Temperatura (ºC) </Text>

                    <View style={styles.input}>
                        <NumericInput
                            value={minTemp}
                            onChange={(e) => setminTemp(e)}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#5cb85c'
                            leftButtonBackgroundColor='#5cb85c'
                        />
                        <NumericInput
                            value={maxTemp}
                            onChange={(e) => setmaxTemp(e)}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#d9534f'
                            leftButtonBackgroundColor='#d9534f'
                        />
                    </View>
                    <View style={styles.subtitle}>
                        <Text>Mínimo</Text>
                        <Text>Máximo</Text>
                    </View>

                </View>

                <View style={styles.content}>

                    <Text style={styles.title}> Humidade (%) </Text>

                    <View style={styles.input}>
                        <NumericInput
                            value={minUmd}
                            onChange={(e) => setminUmd(e)}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#5cb85c'
                            leftButtonBackgroundColor='#5cb85c'
                        />
                        <NumericInput
                            value={maxUmd}
                            onChange={(e) => setmaxUmd(e)}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#d9534f'
                            leftButtonBackgroundColor='#d9534f'
                        />
                    </View>
                    <View style={styles.subtitle}>
                        <Text>Mínimo</Text>
                        <Text>Máximo</Text>
                    </View>

                </View>

                
                <View style={styles.content}>

                    <Text style={styles.title}> Peso (kg) </Text>

                    <View style={styles.input}>
                        <NumericInput
                            value={minPeso}
                            onChange={(e) => setminPeso(e)}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#5cb85c'
                            leftButtonBackgroundColor='#5cb85c'
                        />
                        <NumericInput
                            value={maxPeso}
                            onChange={(e) => setmaxPeso(e)}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#d9534f'
                            leftButtonBackgroundColor='#d9534f'
                        />
                    </View>
                    <View style={styles.subtitle}>
                        <Text>Mínimo</Text>
                        <Text>Máximo</Text>
                    </View>

                </View>
                

                <View style={styles.content}>

                    <Text style={styles.title}> Ruído (dB) </Text>

                    <View style={styles.input}>
                        <NumericInput
                            value={minRuido}
                            onChange={(e) => setminRuido(e)}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#5cb85c'
                            leftButtonBackgroundColor='#5cb85c'
                        />
                        <NumericInput
                            value={maxRuido}
                            onChange={(e) => setmaxRuido(e)}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#d9534f'
                            leftButtonBackgroundColor='#d9534f'
                        />
                    </View>
                    <View style={styles.subtitle}>
                        <Text>Mínimo</Text>
                        <Text>Máximo</Text>
                    </View>

                </View>

                <TouchableOpacity style={styles.button} onPress={() => sendData()}>
                    <Text style={styles.textButton}>Salvar</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollview: {
        marginHorizontal: 20,
        padding: 10,
    },
    content: {
        marginBottom: 5,
        display: 'flex',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 20,
        width: '100%',
        justifyContent: 'flex-start',
    },
    title: {
        paddingBottom: 10,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subtitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingHorizontal: 38,
        alignItems: 'center',
    },
    button: {
        height: 60,
        alignSelf: 'stretch',
        backgroundColor: `${Colors.quaternaryColor}`,
        borderRadius: 50,
        marginTop: 40,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        color: `${Colors.tertiaryColor}`,
        fontWeight: 'bold',
        fontSize: 16,
    }
});


SettingsScreen.navigationOptions = {
    title: 'Configuração',
    headerTintColor: '#F3C622',
};
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import Constants from 'expo-constants';
import NumericInput from 'react-native-numeric-input'

import api from '../services/api'
import Colors from '../constants/Colors';

export default function SettingsScreen() {

    const [temp, setTemp] = useState({ min: 0, max: 0 })
    const [umd, setUmd] = useState({ min: 0, max: 0 })
    const [ruido, setRuido] = useState({ min: 0, max: 0 })
    const [peso, setPeso] = useState({ min: 0, max: 0 })

    async function getData() {
        const response = await  api.get(`/conexao.php?dados={"tipo":14}`)

        const temp = response.data.leituras.find(dados => dados.id === "1");
        
        if(temp) {
            const {min, max} = temp
            await setTemp({ min: parseInt(min), max: parseInt(max) })
        }

        const umd = response.data.leituras.find(dados => dados.id === "2");

        if(umd) {
            const {min, max} = umd
            await setUmd({ min: parseInt(min), max: parseInt(max) })
        }
    
        
        const peso = response.data.leituras.find(dados => dados.id === "3");
        
        if(peso) {
            const {min, max} = peso
            await setPeso({ min: parseInt(min), max: parseInt(max) })
        }

        const ruido = response.data.leituras.find(dados => dados.id === "4");

        if(ruido) {
            const {min, max} = ruido
            await setRuido({ min: parseInt(min), max: parseInt(max) })
        }
    }

useEffect(() => {

    
    getData()

}, []);

    async function sendData() {

      await api.post(`/conexao.php?dados={"tipo":18,"sensores":[{"id":1,"max":${temp.max},"min":${temp.min}},{"id":2,"max":${umd.max},"min":${umd.min}},{"id":3,"max":${peso.max},"min":${peso.min}},{"id":4,"max":${ruido.max},"min":${ruido.min}}]}`)

    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollview}>

                <View style={styles.content}>

                    <Text style={styles.title}> Temperatura (ºC) </Text>

                    <View style={styles.input}>
                        <NumericInput
                            initValue={temp.min}
                            maxValue={100}
                            onChange={min => setTemp(state => ({...state, min}))}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#5cb85c'
                            leftButtonBackgroundColor='#5cb85c'
                        />
                        <NumericInput
                            initValue={temp.max}
                            maxValue={100}
                            onChange={max => setTemp(state => ({...state, max}))}
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

                    <Text style={styles.title}> Umidade (%) </Text>

                    <View style={styles.input}>
                        <NumericInput
                            initValue={umd.min}
                            maxValue={100}
                            onChange={min => setUmd(state => ({...state, min}))}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#5cb85c'
                            leftButtonBackgroundColor='#5cb85c'
                        />
                        <NumericInput
                            initValue={umd.max}
                            maxValue={100}
                            onChange={max => setUmd(state => ({...state, max}))}
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
                            initValue={peso.min}
                            maxValue={100}
                            onChange={min => setPeso(state => ({...state, min}))}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#5cb85c'
                            leftButtonBackgroundColor='#5cb85c'
                        />
                        <NumericInput
                            initValue={peso.max}
                            maxValue={100}
                            onChange={max => setPeso(state => ({...state, max}))}
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
                            initValue={ruido.min}
                            maxValue={100}
                            onChange={min => setRuido(state => ({...state, min}))}
                            rounded='true'
                            borderColor='#fff'
                            iconStyle={{ color: "white" }}
                            rightButtonBackgroundColor='#5cb85c'
                            leftButtonBackgroundColor='#5cb85c'
                        />
                        <NumericInput
                            initValue={ruido.max}
                            maxValue={100}
                            onChange={max => setRuido(state => ({...state, max}))}
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
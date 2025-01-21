import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class headerPrint extends Component {

    printMainPage(){
        Actions.MainPage();
    }
    printPendingPage(){
        Actions.Pending();
    }
    printCompletedPage(){
        Actions.Completed();
    }
    printConfirmPage(){
        Actions.Confirm();
    }

    

    render() {
        
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.TextCont}
                onPress={this.printMainPage.bind(this)}>
                    <Text style={styles.textCont_Text}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TextCont}
                onPress={this.printPendingPage.bind(this)}>
                    <Text style={styles.textCont_Text}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TextCont}
                onPress={this.printConfirmPage.bind(this)}>
                    <Text style={styles.textCont_Text}>Confirmed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TextCont}
                onPress={this.printCompletedPage.bind(this)}>
                    <Text style={styles.textCont_Text}>Completed</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'white',
        flex: 1,
        flexDirection: "row",
        flexGrow:1,
    },

    TextCont: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        padding: 10,
    },

    textCont_Text:{
        color:'#3f4742',
        fontSize: 16,
        fontWeight: 'bold',
    },

    inputBox: {
        width: 300,
        backgroundColor: "black",
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "black",
        marginVertical: 10,
        paddingVertical: 10
    },

    signupText: {
        color: '#63a4ff',
        fontWeight: "300",
        fontSize: 16
    },

    signupText2: {
        color: '#63a4ff',
        fontWeight: "bold",
        fontSize: 16
    },

    signupButton: {
        color: '#004ba0',
        fontWeight: '500'
    },

    button: {
        width: 400,
        borderRadius: 0,
        backgroundColor: 'white',
        marginVertical: 10,
        paddingVertical: 10,
        paddingLeft:10,
        paddingRight:10

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#63a4ff',
        textAlign: "center"
    }
});
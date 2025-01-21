import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import HeaderPrint from '../components/headerPrint';
import {url} from '../config/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class manageWallet extends Component {
    idTest = null;

    constructor(props) {
        super(props);
        this.state = { dataSource: [], invoices:[]};
    }

    topupPage(){
        Actions.Topup({id:'manageWallet', orderId:null});
    }

    render() {
        
        return (
            
            <View style={styles.container}>
                
                <ScrollView>
                <View style={styles.card}>
                    <View style={styles.card_inner}>
                        <View style={styles.card_inner_top}>
                            <Text style={styles.cardText}>0707 5566 4381 ****</Text>
                            <Text>CIMB</Text>
                        </View>
                        <View style={styles.card_inner_bottom}>
                            <TouchableOpacity
                            onPress={()=> this.topupPage()}>
                                <Text style={{fontSize: 16}}>Topup Wallet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{alignItems:"center"}}>
                    <TouchableOpacity style={{elevation:10}}>
                        <Icon name="plus-circle" size={60} color="lightblue" style={{elevation:10}}/>
                    </TouchableOpacity>
                    
                </View>
                    
                </ScrollView>
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        //marginTop: 20,
        //flex: 1,
        backgroundColor: 'white',
        //alignItems: 'center',
        justifyContent: 'center',
    },

    card : {
        backgroundColor: "white",
        height: 250,
        width:"100%",
        padding: 10,
        marginTop: 20
    },
    card_inner :{
        backgroundColor: 'white',
        height: "100%",
        elevation: 10,
        borderRadius:25,
    },
    card_inner_top :{
        backgroundColor: '#fa5f5f',
        height: "70%",
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        padding:25
    },
    card_inner_bottom :{
        backgroundColor: 'white',
        height: "30%",
        borderBottomRightRadius:25,
        borderBottomLeftRadius:25,
        padding:25
    },

    cardText:{
        fontSize:20,
        fontWeight: "bold"
    },

    signupTextCont: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        flexDirection: 'row'

    },

    inputBox: {
        width: 300,
        backgroundColor: "white",
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
        borderRadius: 25,
        backgroundColor: 'white',
        marginVertical: 5,
        paddingVertical: 5,
        paddingLeft:10,
        paddingRight:10,
        elevation: 10,

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#63a4ff',
        textAlign: "center"
    },

    invoiceBox : {
        borderTopColor: '#63a4ff',
        shadowOpacity: 1,
        borderTopWidth: 1,
    }
});
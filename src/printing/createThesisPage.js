import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import {Actions} from 'react-native-router-flux';

import Logo from '../components/Logo';
import Form from '../components/createThesisForm';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class createThesisPage extends Component {

    constructor() {
        super();
        this.state = { username: null, password: null };
    }
      
    userLogin(){
        Actions.Signup();
    }
    render() {
        return(
            <View style={styles.container}>
                <Form id={this.props.orderId}/>
                {/* <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={this.userLogin.bind(this)}>
                    <Text style={styles.signupButton}> Signup</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#63a4ff',
      backgroundColor: "white",
      alignItems: 'center',
      justifyContent: 'center',
    },

    signupTextCont: {
        flexGrow:1,
        alignItems: "center",
        justifyContent:"center",
        paddingVertical:16,
        flexDirection:'row'
        
    },

     signupText: {
         color: 'white'
     },

    signupButton: {
        color:'#004ba0',
        fontWeight:'500'
    }
  });
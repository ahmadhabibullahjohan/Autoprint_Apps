import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import {Actions} from 'react-native-router-flux';

import Logo from '../components/Logo';
import FormSignup from '../components/FormSignup';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class signup extends Component {

    userLogin(){
        Actions.Login();
    }
    
    render() {
        return(
            <View style={styles.container}>
                <Logo/>
                <FormSignup type="Signup"/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={this.userLogin.bind(this)}>
                    <Text style={styles.signupButton}> Log In</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#63a4ff',
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
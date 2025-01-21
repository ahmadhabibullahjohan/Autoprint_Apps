import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import { exp } from 'react-native-reanimated';
import {url} from '../config/constant';

export default class Form extends Component {

    constructor(){
        super();
        this.state={email: null, password: null}
    }

    userLogin () {

        if(this.state.email == null || this.state.password == null){
            alert("Username or password cannot be empty!");
        }else{
            //alert(this.state.email + ' ' + this.state.password);
            const fetchUrl = url + "/login";
            fetch(fetchUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization':'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4' },
                body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.saveItem('token', responseJson.token),
                this.saveItem('id', responseJson.id),
                alert( 'Login Success!', 'Click the button to get a Chuck Norris quote!'),
                Actions.HomePage();
            }).catch((error) =>{
                alert("Username or Password is incorrect");
                Actions.Login();
            })
            .done();
        }
        
      }

    async saveItem(item, selectedValue){
        try{
            await AsyncStorage.setItem(item, selectedValue);
        }catch(error){
            console.error('AsyncStorage error: '+ error.message);
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput name="email" 
                    style={styles.inputBox} 
                    placeholder={'Username'} 
                    onChangeText={(email)=>this.setState({email})}/>
                <TextInput name="password" 
                    style={styles.inputBox} 
                    placeholder={'Password'} 
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}
                />
                <TouchableOpacity style = {styles.button} 
                    onPress={this.userLogin.bind(this)}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    inputBox : {
        width:300,
        backgroundColor: "white",
        borderRadius:25,
        paddingHorizontal:16,
        fontSize:16,
        color:"black",
        marginVertical:10,
        paddingVertical:10
    },

    button :{
        width:300,
        borderRadius:25,
        backgroundColor:'white',
        marginVertical:10,
        paddingVertical:10

    },

    buttonText : {
        fontSize:16,
        fontWeight:'500',
        color:'#63a4ff',
        textAlign:"center"
    }
  });
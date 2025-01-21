import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import { exp } from 'react-native-reanimated';
import {url} from '../config/constant';

export default class FormSignup extends Component {

    constructor(){
        super();
        this.state={email: null, password: null, username: null, fullname: null}
    }

    validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    userSignup () {
        if(!this.validateEmail(this.state.email)){
            alert("Please enter a valid email!");
        }else if(this.state.email == null || this.state.password == null || this.state.username == null || this.state.fullname == null){
            alert("Please make sure that you fill all needed information!");
        }else{
            //alert(this.state.email + ' ' + this.state.password);
            const fetchURL = url + "/user";
            //alert(fetchURL);
            fetch( fetchURL , {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization':'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4' },
                body: JSON.stringify({
                    email: this.state.email,
                    fullname: this.state.fullname,
                    password: this.state.password,
                    username: this.state.username
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.saveItem('token', responseJson.token);
                this.saveItem('id', responseJson.id);
                //alert(responseJson.id),
                //alert( 'Signup Success!', 'Welcoming You To Autoprint!');
                //alert(responseJson.token),
                if(responseJson.id == null || responseJson.token == null){
                    alert("Account have already been created for email "+this.state.email+". Please Log in!");
                    Actions.Login();
                }else{
                    alert( 'Signup Success!', 'Welcoming You To Autoprint!');
                    Actions.HomePage();
                }

                
            })
            .catch((error)=>{
                alert("Account have already been created. Please Log in!");
            });
        }
        
      }

    async saveItem(item, selectedValue){
        selectedValue = selectedValue.toString();
        try{
            await AsyncStorage.setItem(item, selectedValue);
        }catch(error){
            console.error('AsyncStorage error: '+ error.message);
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput name="username" 
                    style={styles.inputBox} 
                    placeholder={'Username'} 
                    onChangeText={(username)=>this.setState({username})}/>
                <TextInput name="password" 
                    style={styles.inputBox} 
                    placeholder={'Password'} 
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}
                />
                <TextInput name="email" 
                    style={styles.inputBox} 
                    placeholder={'Email'} 
                    
                    onChangeText={(email)=>this.setState({email})}
                />
                <TextInput name="password" 
                    style={styles.inputBox} 
                    placeholder={'Fullname'} 
                
                    onChangeText={(fullname)=>this.setState({fullname})}
                />
                <TouchableOpacity style = {styles.button} 
                    onPress={this.userSignup.bind(this)}>
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
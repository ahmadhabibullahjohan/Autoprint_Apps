//post activity controller

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {url} from '../config/constant';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

export default class signup extends Component {

    constructor() {
        super();
        this.state = { title: '', content: '',token: ''};
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then((token)=>{
            this.setState({'token' : token});
        })
    }

    sendResponse() {
        if(this.state.title == '' || this.state.content == ''){
            alert("Title or content cannot be empty!");
        }else{
            const fetchUrl = url + '/activity';
            //alert(this.state.username + ' ' + this.state.email + ' ' + this.state.fullname)
            fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                },
                body: JSON.stringify({
                    title: this.state.title,
                    content: this.state.content
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    alert('Your Response Has Been Send! Wait For Our Reply!');
                    Actions.HomePage();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.signupText}>What would you like to tell us? Tell us anything , we would be glad to help you.</Text>
                <TextInput name="username"
                    style={styles.inputBox}
                    placeholder={'Title'}
                    onChangeText={(title) => this.setState({ title })} />
                <TextInput name="password"
                    style={styles.contentBox}
                    placeholder={'Content'}
                    multiline={true}
                    onChangeText={(content) => this.setState({ content })}
                />
                <TouchableOpacity style={styles.button}
                    onPress={this.sendResponse.bind(this)}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
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
        paddingVertical: 10,
    },

    contentBox: {
        width: 300,
        height: 200,
        backgroundColor: "white",
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "black",
        marginVertical: 10,
        paddingVertical: 10,
        textAlignVertical: 'top'
    },

    signupText: {
        color: 'white',
        width: 300,
        textAlign: "center",
        fontSize: 18
    },

    signupButton: {
        color: '#004ba0',
        fontWeight: '500'
    },

    button: {
        width: 300,
        borderRadius: 25,
        backgroundColor: 'white',
        marginVertical: 10,
        paddingVertical: 10

    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#63a4ff',
        textAlign: "center"
    }
});
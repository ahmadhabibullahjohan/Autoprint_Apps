import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import HeaderPrint from '../components/headerPrint';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {url} from '../config/constant';


import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class mainPage extends Component {
    idTest = null;

    constructor(props) {
        super(props);
        this.state = { 
            latitude: 0,
            longitude: 0,
            error: null,
        };
    }

    createNewProject = async() =>{
        navigator.geolocation.getCurrentPosition(
            position =>{
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },
            error => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
        );

        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        const fetchUrl = url + "/order";

        fetch(fetchUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Authorization': userToken },
            body: JSON.stringify({
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                userId: userId,
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                alert("Order Successfully Created");
                Actions.CreateDocPage({orderId: responseJson.id});
            })
            .catch((error)=>{
                alert("Create order error = " + error);
                console.error(error);
            });
    }

    createNewProjectThesis = async() =>{
        navigator.geolocation.getCurrentPosition(
            position =>{
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                });
            },
            error => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
        );

        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        const fetchUrl = url + "/order";

        fetch(fetchUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Authorization': userToken },
            body: JSON.stringify({
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                userId: userId,
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                alert("Order Successfully Created");
                Actions.CreateThesisPage({orderId: responseJson.id});
            })
            .catch((error)=>{
                alert("Create order error = " + error);
                console.error(error);
            });
    }

    render() {
        
        return (
            
            <View style={styles.container}>
                <HeaderPrint/>
                <View style={{backgroundColor:"", width:"100%", height:"60%", alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.createNewProject.bind(this)}>
                        <Icon name='note-add' size={150} color='white'/>
                        <Text style={styles.createText}>Create New Order</Text>
                        {/* <Text>{this.props.id}</Text> */}
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:"", width:"100%",  height:"20%", alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity onPress={this.createNewProjectThesis.bind(this)}>
                        <Text style={styles.createText}>Or you want to print a Thesis? Then click here!</Text>
                        {/* <Text>{this.props.id}</Text> */}
                    </TouchableOpacity>
                </View>
                    

                    
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        //marginTop: 20,
        flex: 1,
        backgroundColor: '#63a4ff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    signupTextCont: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        flexDirection: 'row',
    },

    createText:{
        color: 'white',
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
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
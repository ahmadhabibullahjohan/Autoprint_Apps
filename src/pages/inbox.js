import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {url} from '../config/constant';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: [], load:true};
    }

    componentDidMount = async() => {

        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/activity/user/' + userId;
                console.log(fetchUrl)
                fetch(fetchUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userToken
                    }
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        
                        this.setState({
                            dataSource: responseJson.content
                        });
                        console.log(this.state.dataSource);
                        this.setState({load:false})
                    })
                    .catch((error) => {
                        alert(error)
                        console.error(error);
                    });
            }
    }

    inboxData(){
        var whole = [];
        return this.state.dataSource.map(function(item, i){
            return(
                <View style={styles.button} key={i}>
                    <Text style={styles.signupText2}>{item.title}</Text>
                    <Text style={styles.signupText}>{item.content}</Text>
                </View>
            );
        });
    }

    render() {
        
        return (
            <ScrollView style={styles.container}>
                <Modal
                    transparent={false}
                    visible={this.state.load}>
                        <ActivityIndicator style={{justifyContent:'center', alignItems: 'center', alignContent: 'center', height:"100%", alignSelf:'center'}}
                            size="large" color="#85b4ff"
                        />
                </Modal>
                {this.inboxData()}
            </ScrollView>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#63a4ff',
        // alignItems: 'center',
        // justifyContent: 'center',
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
        borderRadius: 0,
        backgroundColor: 'white',
        marginVertical: 1,
        paddingVertical: 10,
        paddingLeft:10,
        paddingRight:10,


    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#63a4ff',
        textAlign: "center"
    }
});
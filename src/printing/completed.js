import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import HeaderPrint from '../components/headerPrint';
import {url} from '../config/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class completed extends Component {
    idTest = null;

    constructor(props) {
        super(props);
        this.state = { dataSource: [], invoices:[], load:true};
    }

    componentDidMount = async() =>{
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/order/user/' + userId +'?status=COMPLETED';
                fetch(fetchUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userToken,
                    },
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
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

    viewOrderPage(id){
            Actions.ViewOrder({id:id});
    }

    orderData(){
        var whole = [];
        return this.state.dataSource.map((item, i) =>{
            const dateC = item.dateCreated;
            return(
                <View style={styles.columnContainer} key={i}>
                    <TouchableOpacity style={styles.button}
                    onPress={() => this.viewOrderPage(item.id)}>
                        <View style={{backgroundColor:"#07b52a", borderTopStartRadius: 10, borderTopRightRadius:10, height: 70, justifyContent: 'center'}}>
                            <Icon name="folder-star-outline" size={55} style={{alignSelf:'center', color:"white"}}/>
                        </View>
                        <View style={{paddingVertical: 5,paddingLeft:10,paddingRight:10,}}>
                            <Text style={styles.signupText2}>Reference No. : {item.referenceId}</Text>
                            <Text style={styles.signupText2}>{dateC.replace("T"," ")}</Text>
                            {/* <Text style={styles.signupText2}>Status : {item.status}</Text> */}
                        </View>
                    </TouchableOpacity>
                </View>
                
                
            );
        });
    }

    render() {
        
        return (
            
            <View style={styles.container}>
                <Modal
                    transparent={false}
                    visible={this.state.load}>
                        <ActivityIndicator style={{justifyContent:'center', alignItems: 'center', alignContent: 'center', height:"100%", alignSelf:'center'}}
                            size="large" color="#85b4ff"
                        />
                </Modal>
                <HeaderPrint style={{height: "10%"}}/>
                <ScrollView style={{width:"100%",height:"90%"}}>
                    <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                        {this.orderData()}
                    </View>
                </ScrollView>
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        //marginTop: 20,
        flex: 1,
        // backgroundColor: '#f5b616',
        backgroundColor:"white",
        alignItems: 'center',
        justifyContent: 'center',
    },

    columnContainer : {
        borderRadius: 0,
        paddingHorizontal: 10,
        width: "50%"
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
        color: '#07b52a',
        fontWeight: "bold",
        fontSize: 16
    },

    signupButton: {
        color: '#004ba0',
        fontWeight: '500'
    },

    button: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 5,
        // paddingVertical: 5,
        // paddingLeft:10,
        // paddingRight:10,
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
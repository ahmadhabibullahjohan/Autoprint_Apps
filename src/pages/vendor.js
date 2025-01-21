import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import HeaderPrint from '../components/headerPrint';
import {url} from '../config/constant';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class vendor extends Component {
    idTest = null;

    constructor(props) {
        super(props);
        this.state = { dataSource: [],
            latitude: 0,
            longitude: 0,
            error: null,
            showConfirm: false,
            vendorId: null,
            randIMG: "",

        };
    }

    componentDidMount = async() =>{
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

        if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/vendor/nearest';
                fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userToken,
                    },
                    body: JSON.stringify({
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        }),
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                        this.setState({
                            dataSource: responseJson.list
                        });
                        console.log(this.state.dataSource);
                    })
                    .catch((error) => {
                        alert(error)
                        console.error(error);
                    });
            }
    }

    confirmCreate(id){
        this.setState({vendorId:id});

        Alert.alert(
            'Autoprint says',
            'Do you want to create an Order with this vendor?',
            [
                {
                text: 'Ask me later',
                onPress: () => console.log('Ask me later pressed')
                },
                {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
                },
                { text: 'OK', onPress: () => this.createNewOrderByVendorID() }
            ],
            { cancelable: false }
            );
        
    }

    createNewOrderByVendorID = async() => {
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
                vendorId: this.state.vendorId,

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


    orderData(){
        var whole = [];
        return this.state.dataSource.map((item, i) =>{
            return(
                <View style={styles.columnContainer} key={i}>
                    <TouchableOpacity style={styles.button}
                    onPress={() => this.confirmCreate(item.id)}>
                        <View>
                            {/* {this.iconType(item.status)} */}
                            <Text style={styles.signupText2}>{item.vendorname}</Text>

                            <Image source={item.user.imageUrl ? {uri:item.user.imageUrl} : require('../images/abstract.jpg')}
                            style={{width: "100%", height: 150, borderRadius: 25}} />
                            
                            <Text style={styles.signupText2}>{item.user.fullname}</Text>
                            <Text style={styles.signupText2}>{item.user.email}</Text>
                            <Text style={styles.signupText2}>{item.user.phoneNumber}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name='location-on' size={20} color='blue'/>
                                <Text style={{color: 'blue', margin: 5}}
                                    onPress={() => Linking.openURL('https://www.google.com/maps/@'+item.latitude+","+item.longitude)}>
                                Open Location
                                </Text>
                            </View>
                            
                            {/* <Text style={this.textStyleNew(item.status)}>Reference ID : {item.referenceId}</Text> */}
                            {/* <Text style={this.textStyleNew(item.status)}>Status : {item.status}</Text> */}
                            {/* {item.invoices.map((unit, key) =>{
                                return(
                                    <View style={styles.invoiceBox} key={key}>
                                        <Text style={styles.signupText2}>Order Invoices</Text>
                                        <Text style={styles.signupText}>RM {unit.amount}0</Text>
                                        <Text style={styles.signupText}>Invoice ID : {unit.id}</Text>
                                        <Text style={styles.signupText}>Invoice Ref ID : {unit.referenceId}</Text>
                                        <Text style={styles.signupText}>Invoive Status : {unit.status}</Text>
                                    </View>
                                )
                            })} */}
                            
                        </View>
                    </TouchableOpacity>
                </View>
                
                
            );
        });
    }

    render() {
        
        return (
            
            <View style={styles.container}>
            {/* <ImageBackground source={require('../images/Capture.png')} style={{width:"100%", height:"100%", opacity:0.5}}> */}
                

                <ScrollView style={{width:"100%",height:"100%"}}>
                
                    <View style={styles.infoBox}>
                        <Icon name='location-on' size={60} width="20%" color="#3a7285"/>
                        <Text style={{fontSize: 16, textAlign: 'center', width: "80%", fontWeight: 'bold'}}>This are the nearest vendor to your location. Would you like to take a look?</Text>
                    </View>
                    <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                        {this.orderData()}
                    </View>
                    
                        {/* {this.state.dataSource.map((item, i) =>{
                            return(
                                <View style={styles.columnContainer} key={i}>
                                    <TouchableOpacity style={styles.button}
                                    onPress={() => this.viewOrderPage(item.id)}>
                                        <View>
                                            <Text style={styles.signupText2}>Created : {item.dateCreated}</Text>
                                            <Text style={styles.signupText}>Order ID : {item.id}</Text>
                                            <Text style={styles.signupText}>Reference ID : {item.referenceId}</Text>
                                            <Text style={styles.signupText}>Status : {item.status}</Text>
                                            {item.invoices.map((unit, key) =>{
                                                return(
                                                    <View style={styles.invoiceBox} key={key}>
                                                        <Text style={styles.signupText2}>Order Invoices</Text>
                                                        <Text style={styles.signupText}>RM {unit.amount}0</Text>
                                                        <Text style={styles.signupText}>Invoice ID : {unit.id}</Text>
                                                        <Text style={styles.signupText}>Invoice Ref ID : {unit.referenceId}</Text>
                                                        <Text style={styles.signupText}>Invoive Status : {unit.status}</Text>
                                                    </View>
                                                )
                                            })}
                                            
                                        </View>
                                    </TouchableOpacity>
                                </View> 
                            )
                        })} */}
                
                    
                </ScrollView>
                {/* </ImageBackground> */}
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        //marginTop: 20,
        flex: 1,
        // backgroundColor: '#f5b616',
        backgroundColor:"#3a7285",
        alignItems: 'center',
        justifyContent: 'center',
    },

    columnContainer : {
        borderRadius: 0,
        paddingHorizontal: 10,
        width: "100%"
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
        width: "100%",
        borderRadius: 10,
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

    infoBox : {
        backgroundColor: "white",
        height: 125,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: "100%",
        borderBottomEndRadius : 25,
        borderBottomLeftRadius: 25,
        elevation: 10,
        padding: 15,
        flexDirection: 'row',
    },

    buttonPreConfirm:{
        width:100,
        borderRadius:25,
        backgroundColor:'white',
        marginVertical:10,
        paddingVertical:5,
        marginHorizontal:5,
        elevation: 10,
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        justifyContent: 'flex-end',
    },
});
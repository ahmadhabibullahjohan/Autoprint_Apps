import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import HeaderPrint from '../components/headerPrint';
import {url} from '../config/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import qs from "qs";
import WebView from 'react-native-webview';
import { decode, encode } from 'react-native-base64';
import { Modal } from 'react-native';



export default class topup extends Component {
    idTest = null;

    constructor(props) {
        super(props);
        this.state = { 
            walletBalance: 0,
            topupAmount: null,
            paypalUrl: null,
            accessToken:null,
            isWebViewLoading:false,
            shouldShowWebViewLoading:true,
            approvalUrl:null,
            show: false,
        };
    }

    componentDidMount = async() =>{
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');
        var walletAmount;
        

        if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/user/' + userId;
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
                    walletAmount = responseJson.amount;
                    this.setState({walletBalance : walletAmount})
                    console.log(walletAmount);
                })
                .catch((error) => {
                    alert(error)
                    console.error(error);
                });
            }
    }

    confirmTopup = async() =>{
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        if (this.state.topupAmount == null) {
                Alert.alert("Autoprint Alert","No topup value selected, please select one of the value.");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/wallet/operation';
                fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userToken,
                    },
                    body: JSON.stringify({
                        addId: userId,
                        amount: this.state.topupAmount,
                        minusId: null,
                        operation: "add",
                        
                        })
                })
                .then((response) =>{
                    //console.log(response);
                    var newBalance = this.state.walletBalance + this.state.topupAmount;
                    const textUpdate ="Topup is successful, Your current wallet balance is RM " + newBalance;
                    Alert.alert("Autoprint",textUpdate);
                    if(this.props.id == "manageWallet"){
                        Actions.Profile();
                    }
                    if(this.props.id == "viewOrder"){
                        Actions.ViewOrder({id:this.props.orderId});
                    }
                    if(this.props.id == "home"){
                        Actions.HomePage();
                    }
                    
                })
                .catch((error) => {
                    const textUpdate ="Topup is unsuccessful, please make sure you have enough balance to topup wallet" + newBalance;
                    Alert.alert("Autoprint",textUpdate);
                    console.error(error);
                });
            }
    }

    testPaypal(){
    //==============================================================================================
     if (this.state.topupAmount == null) {
        Alert.alert("Autoprint Alert","No topup value selected, please select one of the value.");
     }else{
        this.setState({show:true});

        const dataDetail = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": this.state.topupAmount,
                    "currency": "MYR",
                    "details": {
                        "subtotal": this.state.topupAmount,
                        "tax": "0",
                        "shipping": "0",
                        "handling_fee": "0",
                        "shipping_discount": "0",
                        "insurance": "0"
                    }
                }

            }],
            "redirect_urls": {
                "return_url": "https://example.com/return",
                "cancel_url": "https://example.com/cancel"
            }
        }

        var username = 'AfScDpEM5YEJQxsCfWzLPp5JZKHC6iz_DEcRzry9dZoNi7gdB_K84prWXf475GoBI8AImINDd8mZkNWh';
        var password = 'EA8qMJjJHFx92RvxZ0JyukwQLNgFMZBQQA6246KQhA6UviEMeJjp6hLpf7xH5vXPg_PT8dPtCs5_TBtU';
        var fetchUrl = 'https://api.sandbox.paypal.com/v1/oauth2/token';
        const data = {grant_type: 'client_credentials'};

        fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic QWZTY0RwRU01WUVKUXhzQ2ZXekxQcDVKWktIQzZpel9ERWNSenJ5OWRab05pN2dkQl9LODRwcldYZjQ3NUdvQkk4QUltSU5EZDhtWmtOV2g6RUE4cU1KakpIRng5MlJ2eFowSnl1a3dRTE5nRk1aQlFRQTYyNDZLUWhBNlV2aUVNZUpqcDZoTHBmN3hINXZYUGdfUFQ4ZFB0Q3M1X1RCdFU=',
                    },
                    body:qs.stringify(data),
                })
                .then((response) => response.json())
                .then((responseJson) =>{
                        //alert("success");
                        console.log(responseJson.access_token);
                        this.setState({accessToken:responseJson.access_token});

                        axios.post(`https://api.sandbox.paypal.com/v1/payments/payment`, dataDetail,
                            {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.state.accessToken}`
                            }
                            }
                        )
                            .then(response => {
                            const { id, links } = response.data
                            const approvalUrl = links.find(data => data.rel == "approval_url").href

                            console.log("response", links)
                            this.setState({approvalUrl:approvalUrl});
                            console.log(approvalUrl);

                            }).catch(err => {
                            console.log({ ...err })
                            })

                })
                .catch((error) => {
                    alert(error)
                    console.error(error);
                });
     }

        

            
    //==============================================================================================
    }

    onWebviewLoadStart = () => {
    if (this.state.shouldShowWebViewLoading) {
      this.setState({isWebViewLoading:true})
    }
  }


    render() {
        
        return (
            
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.card_inner}>
                        <TouchableOpacity style={styles.card_inner_topup_amount}
                        onPress={()=> this.setState({topupAmount:10})}>
                            <Text style={styles.cardText}>RM 10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card_inner_topup_amount}
                        onPress={()=> this.setState({topupAmount:30})}>
                            <Text style={styles.cardText}>RM 30</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card_inner_topup_amount}
                        onPress={()=> this.setState({topupAmount:50})}>
                            <Text style={styles.cardText}>RM 50</Text>
                        </TouchableOpacity>

                        <View style={{alignItems: "center", margin:15}}>
                            <Text style={styles.cardText_black}>Current Wallet Amount is RM {this.state.walletBalance}</Text>
                            <Text style={styles.cardText_black}>Selected Topup Amount is RM {this.state.topupAmount}</Text>
                        </View>

                        <TouchableOpacity style={styles.card_inner_bottom_topup}
                        onPress={()=> this.testPaypal()}>
                            <Text style={styles.cardText_black}>TOPUP</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <Modal
                transparent={true}
                visible={this.state.show}
                style={styles.webview}>
                        {this.state.approvalUrl ? (
                        <View style={styles.webview}>
                        <WebView
                            style={{ height: "100%", width: "100%" }}
                            source={{ uri: this.state.approvalUrl }}
                            onNavigationStateChange={(e)=>{
                                //console.warn("current state is ", JSON.stringify(e, null, 2));
                                if(e.url.indexOf("example")>-1){
                                   
                                    this.setState({show:false});
                                    this.confirmTopup();
                                }
                            }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            onLoadStart={() => this.onWebviewLoadStart()}
                            onLoadEnd={() => this.setState({isWebViewLoading:false})}
                        />
                        </View>
                    ) : null}
                    {this.state.isWebViewLoading ? (
                        <View style={{ ...StyleSheet.absoluteFill, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
                        <ActivityIndicator size="small" color="#A02AE0" />
                        </View>
                    ) : null}
                </Modal>
                

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
        height: "85%",
        width:"100%",
        padding: 10,
        marginTop: 20
    },
    card_inner :{
        backgroundColor: 'lightblue',
        height: "100%",
        elevation: 10,
        borderRadius:25,
        padding: 25
    },
    card_inner_topup_amount :{
        backgroundColor: '#750099',
        height: 100,
        borderRadius:25,
        padding:25,
        margin:5,
        elevation: 10,
        alignItems: "flex-start",
        justifyContent: "center"

    },
    card_inner_bottom_topup :{
        backgroundColor: 'white',
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        //padding:25
    },

    cardText:{
        fontSize:20,
        fontWeight: "bold",
        color: "white"
    },
    
    cardText_black:{
        fontSize:20,
        fontWeight: "bold",
        color: "black"
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
    },

    webview: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
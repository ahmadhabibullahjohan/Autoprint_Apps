// kat sini dia akan show all document in the selected order 
// ada button add new document
// button pre confirm to pay
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import { Actions, Reducer } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import HeaderPrint from '../components/headerPrint';
import {url} from '../config/constant';

import { ScrollView } from 'react-native-gesture-handler';
import { ceil } from 'react-native-reanimated';

export default class ViewOrderCancel extends Component {
    idTest = null;

    constructor(props) {
        super(props);
        this.state = { 
            invoices: [],
            documentData: [],
            dateCreated: null,
            status:"",
            show: false,
            showConfirm : false,
            printingFees: null,
            walletBalance: null,
            referenceId: null,
        };
    }

    componentDidMount = async() =>{
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/order/' + this.props.id;
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
                        invoices: responseJson.invoices,
                        dateCreated:responseJson.dateCreated.replace("T"," "),
                        status: responseJson.status,
                        referenceId: responseJson.referenceId,
                    });
                    console.log(this.state.dataSource);
                })
                .catch((error) => {
                    alert(error)
                    console.error(error);
                });

                const fetchUrl2 = url + '/document/order/' + this.props.id;
                fetch(fetchUrl2, {
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
                        documentData: responseJson.content
                    });
                    console.log(this.state.documentData);
                })
                .catch((error) => {
                    alert(error)
                    console.error(error);
                });
            }
    }

    preConfirm = async() =>{
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');
        var walletAmount;
        var printAmount;

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

        //to get preconfirm
                if (userId == null) {
                    alert("Profile Not Found!");
                    Actions.HomePage;
                } else {
                    const fetchUrl = url + '/order/' + this.props.id + "/pre/confirm";
                    fetch(fetchUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': userToken,
                        },
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                        printAmount = responseJson.amount;
                        this.setState({printingFees : printAmount})
                        console.log(printAmount);
                        
                        this.checkBalance(walletAmount, printAmount);
                    })
                    .catch((error) => {
                        alert(error)
                        console.error(error);
                    });
                }

                


    }

    checkBalance(walletAmount, printAmount){
        if(printAmount > walletAmount){
            this.setState({show : true})
        }else{
            this.setState({showConfirm : true})
        }
    }
    
    confirmAndPay = async() => {
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        //Really Confirm 
        if (this.state.invoices.length != 0) {
                alert("Payment Had Already been made. If there is any mistakes, please contact our admin. Thank you!");
                //this.settlePayment(userId, userToken);   
                //Actions.HomePage;
            } else {
                if(this.state.documentData.length == 0){
                    alert("There is no document selected for this order, please add a new document!");
                    this.setState({showConfirm:false})
                }else{
                    const fetchUrl = url + '/order/' + this.props.id + "/confirm?accept=true";
                    fetch(fetchUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': userToken,
                        },
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        this.settlePayment(userId, userToken);   
                    })
                    .catch((error) => {
                        alert(error)
                        console.error(error);
                    });
                }     
        }
    }

    settlePayment(userId, userToken, ){
        //Confirm payment
            if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/order/' + this.props.id + "/pay?amount=" + this.state.printingFees + "0";
                fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userToken,
                    },
                })
                .then((response) => {
                    alert("Payment of "+ this.state.printingFees +" is accepted!");
                    this.setState({showConfirm : false});
                    Actions.MainPage();
                })
                .catch((error) => {
                    alert(error)
                    console.error(error);
                });
            }
    }

    cancelOrder = async() => {
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        //Really Cancel 
        if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/order/' + this.props.id + "/cancel";
                fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userToken,
                    },
                })
                .then((response) => {
                    Alert.alert("Autoprint","The order have been cancelled successfully");
                    Actions.Pending();
                    
                })
                .catch((error) => {
                    alert(error)
                    console.error(error);
                });
        }
    }
    
    async cancelDoc(docId){
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        //Really Cancel 
        if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/document/' + docId + "/cancel";
                fetch(fetchUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userToken,
                    },
                })
                .then((response) =>  {
                    Alert.alert("Autoprint","The document have been cancelled successfully");
                    Actions.ViewOrder({id:this.props.id});
                })
                .catch((error) => {
                    alert(error)
                    console.error(error);
                });
        }
    }


    docDataDisplay(){
        var whole = [];
        return this.state.documentData.map((item, i) =>{
            return(
                <View key={i}>
                    <View style={styles.docBox_newL}>
                        <View style={styles.docBox_list}>
                            <Text style={styles.signupText2}>Filename : {item.filename}</Text>
                            {/* <Text style={styles.signupText}>{item.filetype}</Text> */}
                            {/* <Text style={styles.signupText}>id : {item.id}</Text> */}
                            <Text style={styles.signupText}>Copies :{item.copies}</Text>
                            <Text style={styles.signupText2}>Duplex :{item.duplex}</Text>
                            <Text style={styles.signupText}>Page Orientation : {item.pageOrientation}</Text>
                            <Text style={styles.signupText}>Pages :{item.pages}</Text>
                        </View>
                        <View style={styles.X}>
                            <TouchableOpacity onPress={() => this.cancelDoc(item.id)}>
                                <Text style={{fontSize: 30, color: "#63a4ff"}}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            );
        });
    }

    invoicesDataDisplay(){
        var whole = [];
        return this.state.invoices.map((item, i) =>{
            return(
                <View key={i}>
                    <View style={styles.docBox_list}>
                        <Text style={styles.signupText2}>{item.amount}</Text>
                        <Text style={styles.signupText}>{item.id}</Text>
                        <Text style={styles.signupText}>{item.referenceId}</Text>
                        <Text style={styles.signupText}>{item.status}</Text>
                    </View>
                </View>
            );
        });
    }

    createNewDoc(){
        //alert(this.props.id)
        Actions.CreateDocPage({orderId:this.props.id});
    }

    topupPage(){
        this.setState({show:false});
        Actions.Topup({id:"viewOrder", orderId: this.props.id});
    }

    reorder(){
        this.setState({show:true});
    }

    confirmReorder = async() =>{
        const userToken = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem('id');

        //Really Cancel 
        if (userId == null) {
                alert("Profile Not Found!");
                Actions.HomePage;
            } else {
                const fetchUrl = url + '/order/' + this.props.id + "/reorder";
                fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userToken,
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    Alert.alert("Autoprint","The order have been re-ordered successfully. Order ref." + 
                    responseJson.referenceId + " is created in replacement of this current order. Thank you!");
                    this.setState({show:false});
                    Actions.Pending();
                    
                })
                .catch((error) => {
                    alert("Error re-ordering = "+error)
                    console.error(error);
                });
        }
    }

    render() {
        
        return (
            <View style={styles.container}>

                <Modal
                transparent={true}
                visible={this.state.show}>
                    <View style={{marginTop:100}}>
                        <View style={{backgroundColor:"white", margin:50, padding:40, borderRadius:25, elevation: 10,
                        height:"80%"}}>
                            <View style={{alignItems: "center"}}>
                                <Text style={styles.textPreConfirm}>Are you sure you want to re-order ?</Text>
                            </View>
                            
                            <View style={{flexDirection:"row"}}>
                                <TouchableOpacity style = {styles.buttonPreConfirm} 
                                    onPress={() => this.setState({show:false})}>
                                    <Text style={styles.buttonText1}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.buttonPreConfirm} 
                                    onPress={()=> this.confirmReorder()}>
                                    <Text style={styles.buttonText1}>Re-order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                transparent={true}
                visible={this.state.showConfirm}>
                    <View style={{marginTop:100}}>
                        <View style={{backgroundColor:"white", margin:50, padding:40, borderRadius:25, elevation: 10,
                        height:"80%"}}>
                            <View>
                                <Text style={styles.textPreConfirm}>Do you want to confirm and pay ?</Text>
                            </View>
                            
                            <View style={{flexDirection:"row"}}>
                                <TouchableOpacity style={styles.buttonPreConfirm} 
                                    onPress={()=> this.setState({showConfirm:false})}>
                                    <Text style={styles.buttonText1}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style = {styles.buttonPreConfirm} 
                                    onPress={()=> this.confirmAndPay()}>
                                    <Text style={styles.buttonText1}>Pay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                
                <View style={styles.infoBox}>
                    <View style={{backgroundColor:"white", borderRadius: 25, elevation: 10, width:"100%", height:"100%", padding:20}}>
                        <Text>Reference No. : {this.state.referenceId}</Text>
                        <Text>Date and Time Created : {this.state.dateCreated}</Text>
                        <Text>Order Status : {this.state.status}</Text>
                    </View>
                    
                </View>
                
                <View style={styles.addDocBox}>
                    <View style={{backgroundColor:"white", borderRadius: 25, elevation: 10}}>
                        <TouchableOpacity style={{width:"100%", height:"100%", justifyContent: "center", alignItems: "center"}}
                        onPress={() => this.createNewDoc()}
                        disabled={true}>
                            <Text style={{justifyContent: "center", color:"lightgrey"}}>Add New Document</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <View style={styles.docBox}>
                    <View style={{backgroundColor:"white", borderRadius: 25, elevation: 10, width:"100%", height:"100%", padding:20}}>
                        <Text style={{fontWeight:"bold", marginLeft:15}}>All Documents</Text>
                        <ScrollView >
                            {this.docDataDisplay()}
                        </ScrollView>
                    </View>
                     
                </View>
                    
                
                
                <View style={styles.invoicesBox}>
                    <View style={{backgroundColor:"white", borderRadius: 25, elevation: 10, width:"100%", height:"100%", padding:20}}>
                        <Text style={{fontWeight:"bold", marginLeft:15}}>All Invoices</Text>
                        <ScrollView >
                            {this.invoicesDataDisplay()}
                        </ScrollView>
                    </View>    
                </View>
                
                
                
                <View style={styles.selectButton}>
                    <View style={{backgroundColor:"white", borderRadius: 25, elevation: 10, width:"100%", height:"100%", padding:20}}>
                        <TouchableOpacity style={styles.selectButton_button}
                        onPress={()=> this.reorder()}>
                            <Text style={{justifyContent: "center", fontSize: 20, color:"green", fontWeight: "bold"}}>RE-ORDER</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                {/* <View style={styles.selectButton}>
                    <View style={{backgroundColor:"white", borderRadius: 25, elevation: 10, width:"100%", height:"100%", padding:20}}>
                        <TouchableOpacity style={styles.selectButton_button}
                        onPress={() => this.preConfirm()}>
                            <Text style={{justifyContent: "center", fontSize: 20, color:"green", fontWeight:"bold"}}>CONFIRM</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View> */}
                
            </View>
            
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        //flex:1,
        height:"100%",
        backgroundColor: '#f22424',
        flexDirection: "row",
        flexWrap:"wrap"
    },

    signupTextCont: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        flexDirection: 'row'

    },

    infoBox : {
        height:"15%",
        width:"100%",
        //backgroundColor:"white",
        //borderRadius: 25,
        //elevation: 10,
        marginVertical: 2,
        //padding: 20,
        //flex:1
        paddingHorizontal: 10,
    },

    addDocBox : {
        height:"10%",
        width:"100%",
        //backgroundColor:"white",
        borderRadius: 0,
        //elevation: 10,
        marginVertical: 2,
        paddingHorizontal: 10,
        //alignItems: "center",
        alignSelf: "center",
        alignContent: "center"
        //flex:1
    },

    selectButton : {
        height:"10%",
        width:"50%",
        //backgroundColor:"white",
        borderRadius: 25,
        elevation: 10,
        paddingHorizontal:10,
        marginVertical: 2,
        alignSelf: "center",
        alignContent: "center"
    },

    selectButton_button : {
        //alignSelf: "center",
        alignItems: "center",
        //alignContent: "center",
        padding: 5,
        //borderRadius: 25,
        textAlign: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    },

    docBox : {
        height:"30%",
        width:"100%",
        //backgroundColor:"white",
        //borderRadius: 25,
        //elevation: 10,
        //margin: 2,
        paddingHorizontal: 10,
        marginVertical: 2,
        //marginHorizontal: 10,
        //flex:1
    },

    docBox_newL : {
        flexDirection : 'row',
    },

    X : {
        backgroundColor: "white",
        width : "15%",
        // height: "100%",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',

    },

    docBox_list : {
        backgroundColor:"white",
        // borderRadius: 25,
        margin: 2,
        padding: 10,
        //borderWidth: 2,
        borderColor: "white",
        //elevation:5,
        borderBottomWidth: 2,
        borderBottomColor: "black",
        width: "85%"
    },

    invoicesBox : {
        height:"20%",
        width:"100%",
        //backgroundColor:"white",
        //borderRadius: 25,
        elevation: 10,
        marginVertical: 2,
        paddingHorizontal: 10,
        //flex:1,
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

    buttonText1 : {
        fontSize:20,
        fontWeight:'500',
        color:'#232de8',
        textAlign:"center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        marginHorizontal: 5,
        fontWeight: "bold"
    },

    textPreConfirm : {
        paddingVertical: 5,
        fontSize: 16
    },
});
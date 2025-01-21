import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Image, ScrollView, ActivityIndicator } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {url} from '../config/constant';
// import {userToken} from '../config/constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { block } from 'react-native-reanimated';


export default class Login extends Component {
    
    constructor(){
        super();
        this.state = {username:'', email:'', fullname:'', wallet:'', phoneNum:'', imageUrl:'', load:true};
    }

    componentDidMount(){

        AsyncStorage.getItem('id').then((id) =>{

            var utoken = '';
            
            AsyncStorage.getItem('token').then((token) =>{
                utoken = token;
            })
            //alert(utoken);

            if(id == null){
                alert("Profile Not Found!");
                Actions.HomePage;
            }else{
                //alert('Wujud id = ' + id);
                const fetchUrl = url + '/user/'+ id;
                //const UST = userToken + " test betul ke tak";
                //alert(UST);

                fetch(fetchUrl, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': 'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4' },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        username: responseJson.username,
                        email: responseJson.email,
                        fullname: responseJson.fullname,
                        amount: responseJson.amount,
                        imageUrl: responseJson.imageUrl,
                        phoneNum: responseJson.phoneNumber,
                    });
                    console.log(responseJson);
                    this.setState({load:false})
                    // alert('Profile fetch success '
                    //     + responseJson.username + ' '
                    //     + responseJson.email + ' '
                    //     + responseJson.fullname)
                    //alert( 'Profile fetch success ' + this.state.username);
                })
                .catch((error)=>{
                    alert(error);
                    console.error(error);
                });
            }
        })
    }
// <Image source={require('../images/user.png')}
//  style={{width: 100, height: 100, borderRadius: 50}} />
    editProfile(){
        Actions.EditProfile();
    }

    manageWalletPage(){
        Actions.ManageWallet();
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Modal
                    transparent={false}
                    visible={this.state.load}>
                        <ActivityIndicator style={{justifyContent:'center', alignItems: 'center', alignContent: 'center', height:"100%", alignSelf:'center'}}
                            size="large" color="#85b4ff"
                        />
                </Modal>

                <View style={styles.profile_container}>
                    <View style={styles.profile_container_inner}>
                        <View style={styles.profileDisplay}> 
                            <Text style={styles.commonText}>HI, WELCOME TO AUTOPRINT PROFILE
                            </Text>
                            <Image source={this.state.imageUrl ? {uri:this.state.imageUrl} : require('../images/user.png')}
                            style={{width: 100, height: 100, borderRadius: 50}} />
                            <View style={{width:"100%", flexDirection:"row"}}>
                                <View>
                                    <Text style={styles.commonText}>Username : </Text>
                                    <Text style={styles.commonText}>Email : </Text>
                                    <Text style={styles.commonText}>Fullname : </Text>
                                    <Text style={styles.commonText}>Phone No. : </Text>
                                </View>
                                <View>
                                    <Text style={styles.commonText}>{this.state.username}</Text>
                                    <Text style={styles.commonText}>{this.state.email}</Text>
                                    <Text style={styles.commonText}>{this.state.fullname}</Text>
                                    <Text style={styles.commonText}>{this.state.phoneNum}</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.infoBoxWrapper}>
                            <View style={styles.infoBox}>
                                <Icon name="local-atm" size={50}/>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.commonText_bold}>RM {this.state.amount}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style = {styles.button} 
                        onPress={this.editProfile.bind(this)}>
                            <Icon name="edit" size={26} color="#63a4ff"/>
                            <Text style={styles.settingButton}> Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.button}
                        onPress={()=> this.manageWalletPage()}>
                            <Icon name="credit-card" size={28} color="#63a4ff"/>
                            <Text style={styles.settingButton}> Edit Wallet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: 'white',
//#004ba0
//#63a4ff
    },

    profile_container : {
        backgroundColor:"white",
        //elevation: 10,
        //borderRadius: 25,
        width:"100%",
        height:"100%",
        padding: 10
    },

    profile_container_inner:{
        backgroundColor: "white",
        borderRadius:25,
        elevation: 5,
    },

    signupTextCont: {
        flexGrow:1,
        alignItems: 'flex-start',
        justifyContent:"center",
        paddingVertical:16,
        flexDirection:'row'
        
    },

     commonText: {
         color: 'black',
         margin: 5,
         fontSize: 20
     },

     commonText_bold: {
         color: 'black',
         margin: 5,
         fontSize: 20,
         fontWeight: "bold",
     },

    settingButton: {
        color:'black',
        fontWeight:'bold',
        textAlign: "center",
        fontSize: 16
    },

    button :{
        width:300,
        borderRadius:25,
        backgroundColor:'white',
        marginVertical:10,
        paddingLeft:20,
        paddingTop:10,
        justifyContent: "flex-start",
        alignContent: "flex-start",
        alignItems: "flex-start",
        flexDirection:"row"
    },

    buttonText : {
        fontSize:16,
        fontWeight:'500',
        color:'black',
        textAlign:"center"
    },

    infoBoxWrapper: {
        borderBottomColor: '#63a4ff',
        borderBottomWidth: 1,
        borderTopColor: '#63a4ff',
        shadowOpacity: 1,
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },

    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity:1,
        shadowOffset:{
            height: 2
        }
    },

    profileDisplay: {
        marginVertical: 15,
        //alignContent: "center",
        alignSelf: "center",
        alignItems: "center",

    }

  });
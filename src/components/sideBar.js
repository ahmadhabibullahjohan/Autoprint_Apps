import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedbackBase, ImageBackground } from 'react-native';
import { render } from 'react-dom';
import { AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {url} from '../config/constant';

import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-reanimated';

export default class sideBar extends Component {

    constructor(props) {
        super();
        this.state = {username:'', email:'', fullname:'', wallet:'', phoneNum:'', imageUrl:'', amount:null};
    };

    userProfile() {
        Actions.Profile();
    }

    userInbox() {
        Actions.Inbox();
    }

    userContactUs() {
        Actions.ContactUs();
    }

    userHome(){
        Actions.HomePage();
    }

    async userLogout() {
        try {
            await AsyncStorage.removeItem('id');
            await AsyncStorage.removeItem('token');
            Alert.alert('Logout Success!');
            Actions.Login();
        } catch (error) {
            alert('Currently, logout function having an issue');
            console.log('AsyncStorage error: ' + error.message);
        }
    }
    componentDidUpdate = async() =>{
        let value = await AsyncStorage.getItem('id')
        if(value !== null){

            await AsyncStorage.getItem('id').then((id) =>{

                var utoken = '';
                
                AsyncStorage.getItem('token').then((token) =>{
                    utoken = token;
                })

                if(id == null){
                    alert("Profile Not Found!");
                    Actions.HomePage;
                }else{
                    
                    const fetchUrl = url + '/user/'+ id;

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
                            amount: responseJson.amount,
                        })
                    })
                    .catch((error)=>{
                        //alert(error);
                        console.error(error);
                    });
                }
            })
        }
    }

    render(){
        return(
        <View>
            <ImageBackground source={require('../images/laut.jpeg')} style={styles.user}>
                <View style={styles.user_box}>
                    {/* <Icon name="user-circle" size={100} color="#FFF"/> */}
                    <Image source={this.state.imageUrl ? {uri:this.state.imageUrl} : require('../images/user.png')}
                        style={{width: 100, height: 100, borderRadius: 50}} />
                    <Text style={{color:'#FFF', fontSize:20}}>{this.state.username}</Text>
                    <View style={{flexDirection:"row"}}>
                        <Icon name="credit-card-alt" color="white" size={25}/><Text style={{fontSize:20, color:"white", marginLeft:10}}>RM {this.state.amount}</Text>
                    </View>
                    
                </View>
            </ImageBackground>
            <View styles={styles.container}>
                <TouchableOpacity
                    onPress={this.userHome.bind(this)}
                    style={styles.box}>
                    <Icon name='home' size={25} color='#63a4ff'/>
                    <Text style={styles.boxText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={this.userProfile.bind(this)}
                    style={styles.box}>
                    <Icon name='user' size={25} color='#63a4ff'/>
                    <Text style={styles.boxText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}
                    onPress={this.userInbox.bind(this)}>
                    <Icon name='inbox' size={25} color='#63a4ff'/>
                    <Text style={styles.boxText}>Inbox</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={this.userContactUs.bind(this)}
                    style={styles.box}>
                    <Icon name='support' size={25} color='#63a4ff'/>
                    <Text style={styles.boxText}>Customer Support</Text>
                </TouchableOpacity>

                   <TouchableOpacity 
                    onPress={this.userLogout.bind(this)}
                    style={styles.box}>
                    <Icon name='sign-out' size={25} color='#63a4ff'/>
                    <Text style={styles.boxText}>Log Out</Text>
                </TouchableOpacity> 
                
            </View>
                
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingRight: 20,
        paddingLeft: 10,
        paddingBottom: 10,
        alignSelf: "center",
        alignContent: 'center',
    },

    box: {
        backgroundColor: 'white',
        width: 230,
        paddingVertical: 10,
        marginBottom:5,
        borderRadius: 25,
        alignContent:'center',
        justifyContent:'flex-start',
        alignSelf:'center',
        flexDirection: "row",
    },

    boxText : {
        fontSize: 20,
        color: '#63a4ff',
        marginLeft: 15,
    },

    user:{
        backgroundColor: '#63a4ff',
        //height: "40%",
        marginTop:30,
    },

    user_box :{
        marginLeft: 25,
        marginTop: 25,
        marginBottom: 10
        //flexDirection: "row",
    }


});
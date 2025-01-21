import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextTicker from 'react-native-text-ticker';

import Logo from '../components/Logo';
import Form from '../components/Form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

export default class homePage extends Component {

    userLogin(){
        Actions.Login();
    }

    userProfile(){
        Actions.Profile();
    }

    userInbox(){
        Actions.Inbox();
    }

    userContactUs(){
        Actions.ContactUs();
    }
    userMainPage(){
        Actions.MainPage({id:"Permata Habib"});
    }
    userTopup(){
        Actions.Topup({id:'home', orderId:null});
    }
    vendorPage(){
        Actions.Vendor();
    }
    AboutUs(){
        Actions.AboutUs();
    }

    async userLogout() {
        try {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('id');
          Alert.alert('Logout Success!');
          Actions.Login();
        } catch (error) {
            alert('Currently, logout function having an issue');
          console.log('AsyncStorage error: ' + error.message);
        }
      }
    
    render() {
        return(
            <ScrollView style={{backgroundColor:"#63a4ff"}}>
            <ImageBackground source={require('../images/newbackground.jpg')} style={{width:"100%"}}>
                <View style={styles.container}>
                <View style={{alignContent:"center", width:"100%"}}>
                    <Image source={require('../images/logo_mock_2.png')}
                        style={{ width: 150, height: 75, marginTop: 30, alignSelf: "center"}} />
                    <Text style={styles.signupText}>HI, WELCOME TO AUTOPRINT
                    </Text>
                </View>
                    
                    <View style={styles.box_long}>
                        <TouchableOpacity style={styles.box_inner} 
                            onPress={this.userMainPage.bind(this)}>
                            <Image source={require('../images/printimage.jpg')}
                                style={{height: 150, width:'100%', borderRadius:10}}
                            />
                            <Text style={styles.buttonText}>Print Now!</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style = {styles.box_100}>
                        <TouchableOpacity style={styles.box_inner_row}
                        onPress={this.vendorPage.bind(this)}>
                            <View style={{margin: 15}}>
                                <Icon name="store-alt" size={40} color="#3c6967"/>
                                <Text style={styles.buttonText}>Vendors</Text>
                            </View>
                            
                            
                            <View style={{backgroundColor:"", width:"70%"}}>
                                <TextTicker
                                    style={{fontSize:16}}
                                    duration={8000}
                                    loop
                                    bounce
                                    repeatSpacer={100}
                                    marqueeDelay={1000}>
                                    Checkout the nearest vendors to you, so you can easily print document and fetch it!
                                </TextTicker>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <View style = {styles.box}>
                        <TouchableOpacity style={styles.box_inner} 
                            onPress={this.userProfile.bind(this)}>
                            <View style={{backgroundColor:"#d3f0ef", height:100, width:100, justifyContent:'center', alignItems: 'center', borderRadius: 50, elevation:1}}>
                                <Icon name="user-tie" size={50}/>
                            </View>
                            
                            <Text style={styles.buttonText}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.box_inner} 
                            onPress={this.userInbox.bind(this)}>
                            <Icon name="envelope-open-text" size={100} color="lightblue"/>
                            <Text style={styles.buttonText}>Inbox</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.box_inner} 
                            onPress={this.userContactUs.bind(this)}>
                            <Image source={require('../images/customerservice.jpg')}
                                style={{height: 150, width:'100%', borderRadius:10}}
                            />
                            <Text style={styles.buttonText}>Customer Service</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.box_25}>
                       <TouchableOpacity style={styles.box_inner} 
                        onPress={this.userTopup.bind(this)}>
                            <Icon name="money-bill-wave" size={50} color="darkgreen"/>
                            <Text style={styles.buttonText}>Topup</Text>
                        </TouchableOpacity> 
                    </View>
                    
                    <View style = {styles.box_25}>
                       <TouchableOpacity style={styles.box_inner} 
                        onPress={this.AboutUs.bind(this)}>
                            <Image source={require('../images/logo_mock_2.png')}
                                style={{height:50, width:"100%", borderRadius:10}}
                            />
                            {/* <Icon name="sign-out-alt" size={50} color="pink"/> */}
                            <Text style={styles.buttonText}>About Us</Text>
                        </TouchableOpacity> 
                    </View>

                    <View style = {styles.box_25}>
                       <TouchableOpacity style={styles.box_inner} 
                        onPress={this.userLogout.bind(this)}>
                            <Icon name="sign-out-alt" size={50} color="pink"/>
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity> 
                    </View>

                    

                    
                </View>
            </ImageBackground>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      //backgroundColor: '#63a4ff',
      flexDirection: "row",
      flexWrap: "wrap",
      height:"100%",
    },

    signupTextCont: {
        flexGrow:1,
        alignItems: 'flex-start',
        justifyContent:"center",
        paddingVertical:16,
        flexDirection:'row',
    },

     signupText: {
         color: 'white',
         fontSize: 20,
         fontWeight:'bold',
         textAlign: "center",
     },

    signupButton: {
        color:'#004ba0',
        fontWeight:'500'
    },

    box :{
        width: '50%',
        height:200,
        borderRadius:0,
        //backgroundColor:'white',
        padding: 5,

    },

    box_long :{
        width: '100%',
        height:200,
        borderRadius:0,
        //backgroundColor:'white',
        padding: 5,
        margin: 0

    },

    box_25 :{
        width: '25%',
        height:100,
        borderRadius:0,
        //backgroundColor:'white',
        padding: 5,

    },

    box_100 :{
        width: '100%',
        height:100,
        borderRadius:0,
        //backgroundColor:'white',
        padding: 5,

    },

    box_inner :{
        width: '100%',
        height:"100%",
        borderRadius:10,
        backgroundColor:'white',
        padding: 5,
        elevation: 10,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

    },

    box_inner_row :{
        width: '100%',
        height:"100%",
        borderRadius:10,
        backgroundColor:'white',
        padding: 5,
        elevation: 10,
        //alignContent: "center",
        //justifyContent: "center",
        alignItems: "center",
        //alignSelf: "center",
        flexDirection: 'row',
    },

    buttonText : {
        marginTop: 5,
        fontSize:16,
        fontWeight:'500',
        color:'black',
        textAlign:"center"
    }
  });
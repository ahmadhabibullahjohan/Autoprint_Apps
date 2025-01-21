import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import {url} from '../config/constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import { asin } from 'react-native-reanimated';
import Base64 from 'react-native-base64';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default class signup extends Component {

    constructor(props){
        super(props);
        this.state = {username:'', email:'', fullname:'', id:null, image:'', phoneNum:null, imageURI:null,
    usernameP:'', emailP:'', fullnameP:'', phoneNumP:''};
    }

    userProfile(){
        Actions.Login();
    }

    componentDidMount(){
        AsyncStorage.getItem('id').then((id) =>{
            this.setState({'id':id});
            if(id == null){
                alert("Profile Not Found!");
                Actions.HomePage;
            }else{
                const fetchUrl = url +'/user/'+ id;
                fetch(fetchUrl, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization':'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4' },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        username: responseJson.username,
                        email: responseJson.email,
                        fullname: responseJson.fullname,
                        phoneNum: responseJson.phoneNumber,
                        usernameP: responseJson.username,
                        emailP: responseJson.email,
                        fullnameP: responseJson.fullname,
                        phoneNumP: responseJson.phoneNumber,
                    })
                    console.log(responseJson)
                })
                .catch((error)=>{
                    alert(error)
                    console.error(error);
                });
            }
        })
    }

    handleChoosePhoto = async() =>{
        await ImagePicker.requestCameraRollPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
        })
        if (!result.cancelled) {
            this.setState({imageURI: result.uri});
            const { uri, base64 } = result
            
            const uriArr = uri.split('.');
            const fileType = uriArr[uriArr.length - 1];
            const file = `data:${fileType};base64,${base64}`;

            this.setState({image: base64});
        }

        
        //alert(result.base64);
        //console.log(result.uri);   
    }

    editProfile = async() =>{
        let USERtoken = await AsyncStorage.getItem('token');
        //alert(USERtoken);
        const cubaNidulu = this.state.image;
        cubaNidulu.replace(/(?:\r\n|\r|\n)/g, '');
        // alert(cubaNidulu);
        // console.log(cubaNidulu);
        const fetchUrl = url +'/user/'+ this.state.id;
        //const url = 'https://backend-dot-autoprint-backend.et.r.appspot.com/user/'+ this.state.id;

        // const imgUrlBase64 = Base64.encode(this.state.image);
        // console.log(imgUrlBase64);
        // alert(imgUrlBase64);


        var changes = {
            username: this.state.username,
            fullname: this.state.fullname,
            email: this.state.email,
            image: this.state.image,
        };

        const axiosConfig = {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization':'superadmin_576a0a1284a853b56f50e876273cdadbfd8ec13408223f1492617a75399921c4',
            
        };

        // Axios({
        //     url: url,
        //     headers: axiosConfig,
        //     method: 'put',
        //     data: changes
        // })
        // .then((res)=>{
        //     alert("Success")
        // })
        // .catch((err)=>{
        //     alert(err);
        //     cons
        // })

        //alert(this.state.username + ' ' + this.state.email + ' ' + this.state.fullname);
        fetch(fetchUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
            'Authorization': USERtoken },
            body: JSON.stringify({
                email: this.state.email,
                fullname: this.state.fullname,
                imageBase64: this.state.image.replace(/(?:\r\n|\r|\n)/g, ''),
                phoneNumber: this.state.phoneNum,
                username: this.state.username
                })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            // alert( 'Profile update success ' 
            // + responseJson.username + ' ' 
            // + responseJson.email + ' ' 
            // + responseJson.fullname);
            alert("Profile Update Successful");
            Actions.Profile();
        })
        .catch((error)=>{
            alert("Profile update error = " + error);
            console.error(error);
        });
    }

    
    
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageHolder}
                onPress={this.handleChoosePhoto}>
                    <Image source={this.state.imageURI ? {uri:this.state.imageURI} : require('../images/user.png')}
                    style={{width: 150, height: 150, borderRadius: 100}} />
                </TouchableOpacity>
                

                <Text style={styles.signupText}>What would you like to change?</Text>

                <View style={styles.holdViewer}>
                <Text style={styles.holdViewerText}>Username</Text>
                    <TextInput name="username" 
                    style={styles.inputBox} 
                    placeholder={this.state.usernameP} 
                    onChangeText={(username)=>this.setState({username})}/>
                </View>

                <View style={styles.holdViewer}>
                <Text style={styles.holdViewerText}>E-mail</Text>
                    <TextInput name="email" 
                    style={styles.inputBox} 
                    placeholder={this.state.emailP} 
                    onChangeText={(email)=>this.setState({email})}
                    />
                </View>
                
                <View style={styles.holdViewer}>
                <Text style={styles.holdViewerText}>Full name</Text>
                    <TextInput name="fullname" 
                    style={styles.inputBox} 
                    placeholder={this.state.fullnameP} 
                    onChangeText={(fullname)=>this.setState({fullname})}
                    />
                </View>
                
                <View style={styles.holdViewer}>
                    <Text style={styles.holdViewerText}>Phone Number</Text>
                    <TextInput name="phoneNum" 
                        style={styles.inputBox} 
                        placeholder={this.state.phoneNum !== null ? this.state.phoneNumP :"eg. 0123456789"} 
                        onChangeText={(phoneNum)=>this.setState({phoneNum})}
                    />
                </View>
                
                <TouchableOpacity style = {styles.button} 
                    onPress={this.editProfile.bind(this)}>
                    <Text style={styles.buttonText}>Edit</Text>
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
        flexGrow:1,
        alignItems: "center",
        justifyContent:"center",
        paddingVertical:16,
        flexDirection:'row'
        
    },
    imageHolder:{
        borderWidth : 2,
        borderColor: 'black',
        borderRadius: 100,
    },

    inputBox : {
        width:300,
        backgroundColor: "white",
        borderRadius:25,
        paddingHorizontal:16,
        fontSize:16,
        color:"black",
        marginVertical:0,
        paddingVertical:10
    },

     signupText: {
         color: 'white'
     },

    signupButton: {
        color:'#004ba0',
        fontWeight:'500'
    },

    button :{
        width:300,
        borderRadius:25,
        backgroundColor:'white',
        marginVertical:10,
        paddingVertical:10

    },

    buttonText : {
        fontSize:16,
        fontWeight:'500',
        color:'#63a4ff',
        textAlign:"center"
    },

    holdViewer:{
        marginVertical: 10
    },
    
    holdViewerText:{
        width:"100%", 
        marginLeft:15,
        color: "lightgrey"
    }
  });
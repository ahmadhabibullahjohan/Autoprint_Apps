import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Modal, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import { ceil, exp } from 'react-native-reanimated';
import {url} from '../config/constant';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
import base64 from 'react-native-base64';
import * as FileSystem from 'expo-file-system';
import { BottomSheet } from 'react-native-elements';

export default class createDocForm extends Component {

    constructor(){
        super();
        this.state={
            colour: "AUTO", 
            copies: null, 
            data : null, 
            duplex : "NO_DUPLEX", 
            filename : "", 
            orderId : null, 
            pageOrientation : "AUTO", 
            pages : null,
            show : false
        }
    }

    _pickDocument = async () =>{
        let result =  await DocumentPicker.getDocumentAsync({
            base64: true
        });
        //alert(result);

        if(!result.cancelled){
            const {uri, base64} = result.uri;
            const options = { encoding: FileSystem.EncodingType.Base64};
            const data = await FileSystem.readAsStringAsync(result.uri, options);

            this.setState({
                data: data , 
                filename: result.name})
            //alert(data);
        }
    }

    createDocument = async () =>{
        const userToken = await AsyncStorage.getItem("token");
        //const userId = await AsyncStorage.getItem('id');

        var checkFileType = this.state.filename.split('.')[1];
        //alert(checkFileType);

        const fetchUrl = url + "/document";
        if(this.state.copies==null || this.state.pages==null || this.state.data==null ||this.state.filename==null){
            Alert.alert("Autoprint says","Input field cannot be empty. Please check all required information before submitting.")
        }else if(checkFileType == "pdf" || checkFileType == "doc" || checkFileType == "docx"){
            
            fetch(fetchUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Authorization': userToken },
            body: JSON.stringify({
                colour: this.state.colour, 
                copies: this.state.copies, 
                data : this.state.data.replace(/(?:\r\n|\r|\n)/g, ''), 
                duplex : this.state.duplex, 
                filename : this.state.filename, 
                orderId : this.props.id, 
                pageOrientation : this.state.pageOrientation, 
                pages : this.state.pages
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                alert("Document Successfully Created");
                this.setState({show:false});
                Actions.ViewOrder({id:this.props.id});
                //kat sini bawak ke page view order (viewOrder.js)
            })
            .catch((error)=>{
                alert("Create order error = " + error);
                console.error(error);
            });
        }else{
            Alert.alert("Autoprint says","The selected file type is not suitable for printing. Please select .pdf or .doc type file!");
        }
    }

    render() {
        const placeholder1 = {
            label: 'Select a colour...',
            value: null,
            color: 'black'
        }
        const placeholder2 = {
            label: 'Select duplex type...',
            value: null,
            color: 'black'
        }
        const placeholder3 = {
            label: 'Select page orientation...',
            value: null,
            color: 'black'
        }
        return(
            <ScrollView style={styles.container}>
                <Icon name='file-pdf-o' size={100} style={styles.iconMain}/>
                <Text style={{fontSize:18, alignSelf: "center"}}>Selected File Name : {this.state.filename}</Text>
                <Modal
                transparent={true}
                visible={this.state.show}>
                    <View style={{marginTop:100}}>
                        <View style={{backgroundColor:"white", margin:50, padding:40, borderRadius:25, elevation: 10,
                        height:"80%"}}>
                            <View>
                                <Text style={styles.textPreConfirm}>Do you want to confirm with this settings ?</Text>
                                <Text style={styles.textPreConfirm}>Selected file : {this.state.filename}</Text>
                                <Text style={styles.textPreConfirm}>Print colour : {this.state.colour}</Text>
                                <Text style={styles.textPreConfirm}>Page orientation : {this.state.pageOrientation}</Text>
                                <Text style={styles.textPreConfirm}>Duplex setting : {this.state.duplex}</Text>
                                <Text style={styles.textPreConfirm}>Copies : {this.state.copies}</Text>
                                <Text style={styles.textPreConfirm}>Pages : {this.state.pages}</Text>
                            </View>
                            
                            <View style={{justifyContent:"flex-end", flexDirection:"row"}}>
                                <TouchableOpacity style = {styles.buttonPreConfirm} 
                                    onPress={() => this.setState({show:false})}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {styles.buttonPreConfirm} 
                                    onPress={() => this.createDocument()}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        
                    </View>
                </Modal>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={this._pickDocument}
                    >
                    <Icon name='file-o' size={30} style={styles.buttonText}/>
                    <Text style={styles.buttonText}>Select File</Text>
                    
                </TouchableOpacity>
            
                <View style={styles.dropdownSelect}>
                    <Text style={styles.placeholderIndicator}>Choose print colour</Text>
                    <RNPickerSelect
                    placeholder={placeholder1}
                    style={pickerStyle}
                    value={this.state.colour}
                    onValueChange={(value) => this.setState({colour: value})}
                    items={[
                        {label:'Auto', value:'AUTO'},
                        {label:'Monochrome', value:'STANDARD_MONOCHROME'},
                    ]}
                    />
                </View>

                <View style={styles.dropdownSelect}>
                    <Text style={styles.placeholderIndicator}>Choose orientation</Text>
                    <RNPickerSelect
                    placeholder={placeholder3}
                    style={pickerStyle}
                    value={this.state.pageOrientation}
                    onValueChange={(value) => this.setState({pageOrientation: value})}
                    items={[
                        {label:'Auto', value:'AUTO'},
                        {label:'Landscape', value:'LANDSCAPE'},
                        {label:'Portrait', value:'PORTRAIT'}
                    ]}
                    />
                </View>

                <View style={styles.dropdownSelect}>
                    <Text style={styles.placeholderIndicator}>Choose duplex setting</Text>
                    <RNPickerSelect
                    placeholder={placeholder2}
                    style={pickerStyle}
                    value={this.state.duplex}
                    onValueChange={(value) => this.setState({duplex: value})}
                    items={[
                        {label:'No Duplex', value:'NO_DUPLEX'},
                        {label:'Long Edge', value:'LONG_EDGE'},
                        {label:'Short Edge', value:'SHORT_EDGE'}
                    ]}
                    />
                </View>
                

                <TextInput name="copies"
                    style={styles.inputBox} 
                    placeholder={'Copies (exp: 1)'} 
                    onChangeText={(copies)=>this.setState({copies})}/>
                <TextInput name="pages" 
                    style={styles.inputBox} 
                    placeholder={'Pages (exp: 1 / 1,3,5 / 1,3-5 / 1-5)'} 
                    onChangeText={(pages)=>this.setState({pages})}
                />
                <TouchableOpacity style = {styles.button} 
                    onPress={() => this.setState({show:true})}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
                
                
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width:'100%',
    },

    inputBox : {
        width:350,
        backgroundColor: "white",
        borderRadius:25,
        paddingHorizontal:20,
        fontSize:16,
        color:"black",
        marginVertical:10,
        paddingVertical:10,
        elevation:10,
        alignSelf: "center"
    },

    textPreConfirm : {
        paddingVertical: 10,

    },

    dropdownSelect : {
        width:350,
        backgroundColor: "white",
        borderRadius:25,
        paddingHorizontal:16,
        fontSize:16,
        color:"black",
        marginVertical:10,
        elevation:10,
        alignSelf: "center"
    },

    button :{
        width:350,
        borderRadius:25,
        backgroundColor:'white',
        marginVertical:10,
        paddingVertical:10,
        elevation: 10,
        alignSelf: "center",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center"

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

    buttonText : {
        fontSize:16,
        fontWeight:'500',
        color:'#232de8',
        textAlign:"center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        marginHorizontal: 5,
        fontWeight: "bold"
    },

    placeholderIndicator : {
        fontSize : 12,
        color : '#bab1b1',
        marginLeft: 10,
        marginTop: 5,
        marginBottom : -15
    },

    iconMain : {
        alignSelf: "center",
        marginTop: 10,
        color: '#c71414', 
    }
  });

  const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
	},
	inputAndroid: {
        color: 'black',
	},
	placeholderColor: 'black',
	underline: { borderTopWidth: 0 },
};
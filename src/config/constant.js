import { Component } from "react";
import { AsyncStorage, ActivityIndicator } from 'react-native';

const api_url = function() {
    let api_url = 'http://ec2-54-254-162-215.ap-southeast-1.compute.amazonaws.com:8080';

    return api_url
}

const host_url_without_http = function() {
    let host_url_without_http='';

    return host_url_without_http
}



// export default class nani extends Component(){
//     componentDidMount(){
//         var userToken_for_save = AsyncStorage.getItem('token');
//     }
// }

export const url = api_url();
export const host_url = host_url_without_http();
//export const userToken = userToken_for_save();
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Image source={require('../images/logo_mock_2.png')}
                    style={{width: 300, height: 150}} />
                <Text style={styles.logoText}>Hi! Welcome To Autoprint</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    logoText : {
        marginTop:10,
        fontSize:18,
        color:'white',
        textAlign:'center'
    }
  });
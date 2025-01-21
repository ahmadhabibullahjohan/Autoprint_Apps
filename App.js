import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

import Login from './src/pages/login';
import SignUp from './src/pages/signup';

import Navigator from './src/routes/loginStack';
import Index from './src/routes/index';

export default function() {
    return (
      <Index/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63a4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


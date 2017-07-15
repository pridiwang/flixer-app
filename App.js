import React from 'react';
import {Button,TouchableHighlight, ScrollView,ActivityIndicator, Image, ListView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigator,TabNavigator,DrawerNavigation} from 'react-navigation';
import Expo,{Video} from 'expo';

import MainNavigator from './navigation/MainNavigator';

export default class App extends React.Component {
  render() {
      return(
       <MainNavigator />
      )
  }
}
const styles=StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'},
  player:{flex:1,width:640,height:480},

});



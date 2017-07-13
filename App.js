import React from 'react';
import {Button,TouchableHighlight, ScrollView,ActivityIndicator, Image, ListView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigator,TabNavigator,DrawerNavigation} from 'react-navigation';

import Expo,{Video} from 'expo';
import Home from './screens/Home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
  }
  render() {
      return(
         <View style={styles.container} >
        <Text>Ok</Text>         
                </View> 
      )
  }
}
const styles=StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'},
  player:{flex:1,width:640,height:480},

});



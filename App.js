import React from 'react';
import {TouchableHighlight, ScrollView,ActivityIndicator, Image, ListView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigator,TabNavigator,DrawerNavigation} from 'react-navigation';
import Home from './screens/Home';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  render() {
      return(
        <Home />
      )
  }
}



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
    let clip_url='https://flixerapp.com:8083/vod/dex/AKB0048/AKB0048_01.smil/playlist.m3u8';
    let start_time=600;
    start_ms=start_time*1000;
      return(
         <View style={styles.container} >
                <Expo.Video source={{uri:clip_url}} 
                    style={styles.player}
                    useNativeControls
                    resizeMode='cover' 
                    shouldPlay={true}
                    positionMillis={start_ms}
                                        
                    />
                    
                </View>
      )
  }
}
const styles=StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#000'},
  player:{flex:1,width:640,height:480},

});



import React from 'react';
import {Button,TouchableHighlight, ScrollView,ActivityIndicator, Image, ListView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigator,TabNavigator,DrawerNavigation} from 'react-navigation';

import Expo,{Video} from 'expo';

export default class PlayerExpo extends React.Component {
static navigationOptions = {header: null };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
  }
  render() {
    const {params}=this.props.navigation.state;
    console.log('player ');
    console.log(params);
    let clip_url=params.data.m3u8
    let start_time=params.data.start_time;
    start_ms=start_time*1000;
      return(
         <View style={styles.container} >
                <Expo.Video source={{uri:clip_url}} 
                    style={styles.player} useNativeControls
                    resizeMode='contain' 
                    shouldPlay={true}
                    positionMillis={start_ms}
                                                            
                    />
                    
                </View>
      )
  }
}
const styles=StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#000'},
  player:{flex:1,width:720,height:480}, 

});



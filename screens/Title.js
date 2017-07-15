import React from 'react';
import {TouchableOpacity, TouchableHilight, ScrollView,ActivityIndicator, Image, ListView, StyleSheet, Text, View } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import Expo from 'expo';
export default class Title extends React.Component {
  static navigationOptions=({navigation})=>({
    title:` ${navigation.state.params.name}`,
  }); 
  
  constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          id:2
      }
      
  }
  componentWillMount(){
    const {params}=this.props.navigation.state;
    console.log('WillMount');
    console.log(params);
    this.setState({id:params.data});
    var id=params.data;
    
    var url='http://flixerapp.com/api/title/'+id;
    console.log('url:'+url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds= new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2});
        this.setState({isLoading:false, 
          episode: ds.cloneWithRows(responseJson.data.episodes),
          title: responseJson.data.title,                    
        });
        
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator />
          </View> 
      )
    }else{
      var title=this.state.title;
      console.log(title);
      const {navigate}=this.props.navigation;
      return( 
        <ScrollView style={{flex:1,backgroundColor:'#000'}} contentContainerStyle={{justifyContent:'center',alignItems:'center'}} >
          
          <Image source={{uri:title.featureimage_url}} style={styles.slideBanner}  resizeMode='cover' >
          <Text style={{fontSize:24,color:'#fff',position:'absolute',bottom:0,flex:1,backgroundColor:'rgba(0,0,0,0.5)',width:320,padding:3,}}>{title.name}</Text>
          </Image>
          
          <ListView dataSource={this.state.episode} 
          contentContainerStyle={{flex:3,flexWrap:'wrap',flexDirection:'row',justifyContent:'space-around'}} 
          renderRow={(dr)=>
          <TouchableOpacity onPress={()=>navigate('PlayerExpo',{data:dr})}>
            <Image source={{uri:'https://api.flixerapp.com/poster/'+this.state.id+'.jpg'}} 
            style={{margin:2,width:102,height:140,position:'relative',flex:1}}
            ><Text style={{position:'absolute',color:'#fff',bottom:0,right:0,padding:3,backgroundColor:'rgba(100,0,0,0.5)'}} >{dr.name}</Text>
            </Image>
            </TouchableOpacity>
            }
          />
          
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideBanner:{
    width:320,height:200,
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    
  },
  slideText:{
    backgroundColor:"rgba(0,0,0,0.5)",
    color:'#ffffff',
    position:'absolute',
    bottom:5,padding:5,
    justifyContent:'center',
    alignItems:'center',
    fontSize:18,
  },
  img_movie:{   width:120,height:180,    position:'relative', margin:2, justifyContent:'center',
    alignItems:'center',},
  img_search:{   width:244,height:150,    position:'relative', margin:2, justifyContent:'center',
    alignItems:'center',},
  img_category:{   width:244,height:90,    position:'relative', margin:2, justifyContent:'center',
    alignItems:'center',},
    
  thText:{width:120,padding:3,  textAlign:'center',justifyContent:'center',alignItems:'center',   position:'absolute',
      bottom:1,    backgroundColor:"rgba(255,100,0,0.7)",    color:"#ffffff",  }
});

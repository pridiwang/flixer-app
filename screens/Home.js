import React from 'react';
import {TouchableOpacity, TouchableHilight, ScrollView,ActivityIndicator, Image, ListView, StyleSheet, Text, View,Button } from 'react-native';
import Swiper from 'react-native-swiper';

export default class Home extends React.Component {
    static navigationOptions={title:'Flixer',};
    constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }
  componentWillMount(){
    this.getHomeFromApiAsync();
  }

  getHomeFromApiAsync() {
    return fetch('http://flixerapp.com/api/home')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds= new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2});
        this.setState({isLoading:false, 
          slideShow: ds.cloneWithRows(responseJson.data.slideshow),
          slideShowAr: responseJson.data.slideshow,
          shelfAr: responseJson.data.shelf,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {navigate}=this.props.navigation;
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator />
          </View>
      )
    }else{
        const {navigate}=this.props.navigation;
        var id;
      return(
          
        <ScrollView style={{backgroundColor:'#000000'}}>
          <Swiper showsButtons={false} autoplay={true} height={200} >
          {this.state.slideShowAr.map(function(sl,i){
              api_ar=sl.api_url.split('/');
              id=api_ar[api_ar.length-1];
              
            console.log(api_ar);
            console.log(id);
            
            return(
              <TouchableOpacity key={i} onPress={()=>this.HomeNavTo(sl.type,id)} >
                <View>
                <Image resizeMode="cover" source={{uri:sl.banner_url}} 
                  style={styles.slideBanner}>
                  <Text style={styles.slideText}>{sl.name}</Text>
                  </Image></View>
              </TouchableOpacity>
            )
            },this)
            }</Swiper>
            
            {this.state.shelfAr.map(function(sh,i){
              return(
                <View key={i*10}><Text style={{color:'#ffffff'}}>{sh.title}</Text>
                <ScrollView horizontal={true} showsButtons={true}>
                {sh.data.map(function(s,j){
                  if(sh.type=='movie') imgStyle=styles.img_movie;
                  if(sh.type=='search') imgStyle=styles.img_search;
                  if(sh.type=='category') imgStyle=styles.img_category;
                  if(sh.type=='movie') navto='Title';
                  if(sh.type=='search') navto='Search';
                  if(sh.type=='category') navto='Search';
                  var api_ar=s.api_url.split('/');
                  var id=api_ar[api_ar.length-1];
                    
                    return (
                        <TouchableOpacity onPress={()=>this.HomeNavTo(sh.type,s.id,s.name)} key={i*10+j}>
                      <View    >
                        <Image source={{uri:s.thumbnail_url}} style={imgStyle} >
                          <Text style={styles.thText}>{s.name} </Text>
                          </Image>
                      </View>
                      </TouchableOpacity>
                    );
                },this)

                }    
                </ScrollView></View>
            )},this)
            }
            </ScrollView>
      )
    }
  }
  HomeNavTo(type,data_id,data_name){
      const {navigate}=this.props.navigation;
      console.log('homeNavTo type:'+type+' id:'+data_id+' name:'+data_name);
      if(type=='movie') navigate('Title',{data: data_id,name:data_name});
      else navigate('Search',{data: data_id,name:data_name})

  }
  loadTitle(){
      console.log('loading Title');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  slideBanner:{
    width:360,height:200,
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
  imgBtn:{
    backgroundColor:"rgba(255,255,255,0)",
  },
  img_movie:{   width:120,height:180,    position:'relative', margin:2, justifyContent:'center',
    alignItems:'center',},
  img_search:{   width:244,height:150,    position:'relative', margin:2, justifyContent:'center',
    alignItems:'center',},
  img_category:{   width:244,height:90,    position:'relative', margin:2, justifyContent:'center',
    alignItems:'center',},
    
  thText:{width:120,padding:3,  textAlign:'center',justifyContent:'center',alignItems:'center',
     position:'absolute',
      bottom:1,    backgroundColor:"rgba(255,100,0,0.7)",    color:"#ffffff",  }
});

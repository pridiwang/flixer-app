import React from 'react';
import { ScrollView,ActivityIndicator, Image, ListView, StyleSheet, Text, View } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';


export default class Title extends React.Component {
   static navigationOptions={}; 
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
  
  componentWillMount(){
    this.getHomeFromApiAsync();
  }
  getHomeFromApiAsync() {
    const {params}=this.props.navigation.state;
    console.log('got data id');
    console.log(params.data);
    this.setState({id:params.data})
    var url='http://flixerapp.com/api/title/'+params.data;
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
      
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator />
          </View> 
      )
    }else{
      var title=this.state.title;
      console.log(title);
      return(
        <ScrollView style={{backgroundColor:'#000'}}>
          
          <Image source={{uri:title.featureimage_url}} style={styles.slideBanner} />
          <Text style={{fontSize:24,color:'#fff'}}>{title.name}</Text>
          
          <ListView dataSource={this.state.episode} 
          contentContainerStyle={{flexWrap:'wrap',flexDirection:'row'}} 
          renderRow={(dr)=>
            <Image source={{uri:'https://api.flixerapp.com/poster/'+this.state.id+'.jpg'}} 
            style={{margin:2,width:102,height:140,position:'relative'}}
            ><Text style={{position:'absolute',color:'#fff',bottom:0,right:0}} >{dr.name}</Text>
            </Image>
            
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

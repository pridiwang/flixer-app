import React from 'react';
import {TouchableHighlight, ScrollView,ActivityIndicator, Image, ListView, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import {StackNavigator,TabNavigator,DrawerNavigation} from 'react-navigation';



export default class Search extends React.Component {
  static navigationOptions={title:'Search'};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  componentWillMount(){

    var search='music';
    const {params}=this.props.navigation.state;
   console.log(params.data);
   search=params.data;
    var url='http://flixerapp.com/api/search/'+search;
    console.log('url:'+url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds= new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2});
        this.setState({isLoading:false, 
          rsItems: ds.cloneWithRows(responseJson.data),
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
      return(
        <ScrollView style={{backgroundColor:'#000'}}>
        <ListView dataSource={this.state.rsItems} 
        contentContainerStyle={{flexWrap:'wrap',flexDirection:'row'}} 
        renderRow={(dr)=>
        <TouchableHighlight onPress={()=>navigate('Title',{data:dr.id}) }>
            <Image source={{uri:dr.thumbnail_url}} style={styles.rsImg} >
            <Text style={styles.rsText}>{dr.name}</Text>
            </Image>
            </TouchableHighlight>
        }
        />
       </ScrollView>
      )
    }
  }
}

const styles=StyleSheet.create({
  containter:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  rsImg:{
    width:156,height:240,margin:1,position:'relative',justifyContent:'center',alignItems:'center'
  },
  rsText:{fontSize:18,
    width:156,position:'absolute',bottom:0,backgroundColor:'rgba(0,0,0,0.5)',
    color:'#fff',padding:2,textAlign:'center',justifyContent:'center',
  }
})

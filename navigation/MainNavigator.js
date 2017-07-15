import React from 'react';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';

import Home from '../screens/Home';
import Title from '../screens/Title';
import Search from '../screens/Search';
import PlayerExpo from '../screens/PlayerExpo';

export default StackNavigator({
    Home:   {screen: Home,},
    Title:  {screen: Title,},
    Search: {screen: Search,},
    PlayerExpo: {screen: PlayerExpo},
});
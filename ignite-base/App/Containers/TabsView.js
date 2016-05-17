import React from 'react'
import { View, DrawerLayoutAndroid, Text, ToolbarAndroid } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class TabsView extends React.Component{

  render () {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <View style={{flex: 1}}>
        <Ionicons.ToolbarAndroid
          actions={[]}
          navIconName="android-menu"
          style={{backgroundColor: '#a9a9a9', height: 56}}
          titleColor="white"
          title="Fuck yeah" />
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}
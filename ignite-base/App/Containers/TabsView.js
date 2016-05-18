import React, { PropTypes } from 'react'
import { View, DrawerLayoutAndroid, Text, ToolbarAndroid, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExampleView from './ExampleView'
import Drawer from 'react-native-drawer'

export default class TabsView extends React.Component{

  constructor (props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
  }

  getChildContext () {
    return{
      openDrawer: this.openDrawer
    }
  }

  openDrawer () {
    this.refs.drawer.toggle()
  }

  render () {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );

    return (
      <Drawer
        ref='drawer'
        type="static"
        content={() => navigationView}
        openDrawerOffset={100}
        tapToClose={true}
        tweenHandler={Drawer.tweenPresets.parallax}
        >
          <ExampleView navigator={this.props.navigator}/>
      </Drawer>
    );
  }
}

TabsView.childContextTypes = {
  openDrawer: React.PropTypes.func,
};

import React, { View, Text, Navigator, StatusBar, TouchableWithoutFeedback } from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import configureStore from './Store/Store'
import { Provider } from 'react-redux'
import Actions from './Actions/Creators'
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors, Images, Metrics } from './Themes'
// Styles
import styles from './Containers/Styles/RootStyle'
import drawerStyles from './Containers/Styles/DrawerStyle'
import I18n from './I18n/I18n.js'

const store = configureStore()
const drawerItems = [["add-location", 'location'], ["person", "profile"], ["local-hospital", "medicalInformation"], ["settings", "support"], ["share", "share"]]

//Array contains icon name and label of drawer items

export default class RNBase extends React.Component {

  componentWillMount () {
    const { dispatch } = store
    dispatch(Actions.startup())
  }

  componentDidMount () {
    this.navigator.drawer = this.drawer
  }

  _changePath(path){
    switch(path){
      case 'profile':
        const Profile = Routes.ProfileScreen
        this.navigator.push(Profile)
        break
      default:
        const AllComponentsScreen = Routes.AllComponentsScreen
        this.navigator.push(AllComponentsScreen)
        break
    }
    this.drawer.close()
}

  renderDrawerContent () {
  // I tried this but it don't work. The renderDrawerContent run before the main render run so i can't pass this.navigator to navigator. 
  // It give me unidentified value >_<
  // return (
  //       <DrawerContent navigator={this.navigator}/>
  //       )

    return (
      <View style={{marginTop: 30, padding: 10}}>
        {drawerItems.map((item, i) =>
          <TouchableWithoutFeedback key ={i} onPress={this._changePath.bind(this, item[1])}>
            <View style={drawerStyles.section}>
              <Icon name={item[0]} size={Metrics.icons.medium} color="white" style={drawerStyles.icon}/>
              <Text style={drawerStyles.text}>
                {I18n.t(item[1])}
              </Text>
            </View>
          </TouchableWithoutFeedback>)  
        }
      </View>
    )

  }

  renderApp () {
    return (
      <Provider store={store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />
          <Drawer
            ref={(ref) => { this.drawer = ref }}
              content={this.renderDrawerContent()}
              type="static"
              tapToClose={true}
              openDrawerOffset={0.2} // 20% gap on the right side of drawer
              panCloseMask={0.2}
              closedDrawerOffset={-3}
              styles={{
                drawer: {backgroundColor:Colors.drawerColor},
                main: {paddingLeft: 3}
              }}
              tweenHandler={Drawer.tweenPresets.parallax}
            >
            <Navigator
              ref={(ref) => { this.navigator = ref }}
              initialRoute={Routes.AllComponentsScreen}
              configureScene={Router.configureScene}
              renderScene={Router.renderScene}
              navigationBar={NavigationBar.render()}
              style={styles.container}
            />
          </Drawer>
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}

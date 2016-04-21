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
import PushNotification from 'react-native-push-notification'

const store = configureStore()
const drawerItems = [
                      ["home", 'home'], 
                      ["person", "profile"], 
                      ["local-hospital", "emergency"], 
                      ["email", "recommend"], 
                      ["share", "feedback"], 
                      ["settings", "about"]
                  ]

//Array contains icon name and label of drawer items

PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (token) => {
    console.log('TOKEN:', token)
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: (notification) => {
    console.log('NOTIFICATION:', notification)
  },

  // ANDROID ONLY: (optional) GCM Sender ID.
  senderID: '56113279400',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: false,

  /**
    * IOS ONLY: (optional) default: true
    * - Specified if permissions will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: false
})

export default class RNBase extends React.Component {

  componentWillMount () {
    const { dispatch } = store
    dispatch(Actions.startup())
    dispatch(Actions.requestLocation())
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
      case 'home':
        const AllComponentsScreen = Routes.AllComponentsScreen
        this.navigator.push(AllComponentsScreen)
        break
      case 'emergency':
        const Emergency = Routes.EmergencyScreen
        this.navigator.push(Emergency)
        break
      case 'recommend':
        const Recommend = Routes.RecommendScreen
        this.navigator.push(Recommend)
        break
      case 'feedback':
        const Feedback = Routes.FeedbackScreen
        this.navigator.push(Feedback)
        break
      case 'about':
        const About = Routes.AboutScreen
        this.navigator.push(About)
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
              closedDrawerOffset={-3}
              styles={{
                drawer: {backgroundColor:Colors.drawerColor},
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

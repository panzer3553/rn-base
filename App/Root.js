import React, { 
  View, 
  Text, 
  Navigator, 
  StatusBar, 
  TouchableWithoutFeedback,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import Actions from './Actions/Creators'
import Drawer from 'react-native-drawer'
import Swiper from './Containers/SwiperScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors, Images, Metrics } from './Themes'
import { connect } from 'react-redux'
// Styles
import styles from './Containers/Styles/RootStyle'
import drawerStyles from './Containers/Styles/DrawerStyle'
import I18n from './I18n/I18n.js'
import PushNotificationsController from './Containers/PushNotificationsController'

const drawerItems = [
  ["home", 'home'], 
  ["person", "profile"], 
  ["local-hospital", "emergency"], 
  ["email", "recommend"], 
  ["share", "feedback"], 
  ["settings", "about"]
]

const STORAGE_KEY_FIRST_LOAD = "FIRST_LOAD"

export default class RNBase extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      firstLoad: false
    }
  }

  componentWillMount () {
    const {dispatch} = this.props
    dispatch(Actions.requestLocation())
  }

  componentDidMount () {
    this.navigator.drawer = this.drawer
    AsyncStorage.getItem(STORAGE_KEY_FIRST_LOAD).then((value) => {
      if(value !== null){
        this.setState({firstLoad: false})
      }else {
        this.setState({firstLoad: true})
        this.navigator.push(Routes.SwiperScreen)
      }
    })
  }

  _changePath(path){
    switch(path){
      case 'profile':
        const Profile = Routes.ProfileScreen
        console.log(this.navigator.currentRoute)
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
    var App = (<Drawer
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
          </Drawer>)

    return (
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />
          {App}
          <PushNotificationsController navigator={this.navigator}/>
        </View>
    )
  }

  render () {
    return this.renderApp()
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(RNBase)
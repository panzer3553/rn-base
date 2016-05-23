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
import Swiper from './Containers/SwiperScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors, Images, Metrics } from './Themes'
import { connect } from 'react-redux'
// Styles
import styles from './Containers/Styles/RootStyle'
import drawerStyles from './Containers/Styles/DrawerStyle'
import I18n from './I18n/I18n.js'
import PushNotificationsController from './Containers/PushNotificationsController'
import config, { drawerItems } from './Config/AppSetting'

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
    dispatch(Actions.fetchImages('Bq8Eu0CwaH'))
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


  renderNavigator () {
    return  (
      <Navigator
        ref={(ref) => { this.navigator = ref }}
        initialRoute={Routes.TabScreen}
        configureScene={Router.configureScene}
        renderScene={Router.renderScene}
        style={styles.container}
      />
    )
  }
  
  renderStatusBar () {
    return (
      <StatusBar
        barStyle='light-content'
      />
    )
  }  

  // this func must be on the top of app for showing alert :)
  renderNotificationAlertOnForeGround () {
    return (<PushNotificationsController navigator={this.navigator}/>)
  }

  render () {
    return (
      <View style={styles.applicationView}>
        { this.renderNavigator() }
        { this.renderStatusBar() }
        { this.renderNotificationAlertOnForeGround() }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(RNBase)
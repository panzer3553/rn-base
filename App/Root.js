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


  renderApp () {
    var App = 
            <Navigator
              ref={(ref) => { this.navigator = ref }}
              initialRoute={Routes.TabScreen}
              configureScene={Router.configureScene}
              renderScene={Router.renderScene}
              style={styles.container}
            />

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
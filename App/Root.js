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
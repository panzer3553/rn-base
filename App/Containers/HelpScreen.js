import {Images, Metrics, Colors} from '../Themes'
import { connect } from 'react-redux'
import Styles from './Styles/HelpScreenStyle'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
import NavigationBar from '../Components/NavigationBar'
import React, {
  Component,
  PropTypes,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  LayoutAnimation,
  Alert
} from 'react-native'

class HelpScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.dismiss = this.dismiss.bind(this)
  }

  dismiss () {
    this.props.navigator.pop()
  }

  render () {
    const leftItem={layout: 'icon', title: 'Back', icon: 'ios-arrow-back', onPress: this.dismiss}
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title='Help'
          style={{backgroundColor: Colors.drawerColor}}
          leftItem={leftItem}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ////
  }
}

export default connect(mapStateToProps)(HelpScreen)

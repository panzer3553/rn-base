import { connect } from 'react-redux'
import Styles from './Styles/HelpScreenStyle'
import Actions from '../Actions/Creators'
import {Images, Metrics} from '../Themes'
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

// I18n
import I18n from '../I18n/I18n.js'

class HelpScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    
  }

  render () {

    return (
      <View style={[Styles.container, {height: this.state.visibleHeight}]}>
        <View style={Styles.form}>
        </View>
      </View>
    )

  }

}

HelpScreen.propTypes = {
  dispatch: PropTypes.func,
  navigator: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(HelpScreen)

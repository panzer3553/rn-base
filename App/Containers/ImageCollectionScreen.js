import {Images, Metrics} from '../Themes'
import { connect } from 'react-redux'
import Styles from './Styles/HelpScreenStyle'
import Actions from '../Actions/Creators'
import I18n from '../I18n/I18n.js'
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

class ImageCollectionScreen extends Component {

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
          <Image 
            source={{uri:'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-09ae09fc-60e3-44e3-a5d9-01f495ea9ab0-picture.jpg'}}
            style={{width: 64, height: 64}}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    imagesInfo: state.getEmergency.imagesInfo
  }
}

export default connect(mapStateToProps)(ImageCollectionScreen)

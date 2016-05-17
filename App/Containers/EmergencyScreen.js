import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
// external libs
import Icon from 'react-native-vector-icons/Ionicons'
// I18n
import I18n from '../I18n/I18n.js'
import { connect } from 'react-redux'

import React, { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  PropTypes, 
  StyleSheet, 
  WebView
} from 'react-native'

export default class EmergencyScreen extends React.Component {
	
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
  	}
  }

  render () {
    const {address, type, username, phone, latitude, longitude} = this.props 
    let mapUri = 'https://www.google.com/maps/preview?saddr=' + '16.0708433' + ',' + '108.20834097' + 
    '&daddr=' + '16.070843' + ',' + '108.208097'
  	return(
	  	<View style={{flex:1, marginTop: 64}}>
      <View style={{flex:1, top: -100}}>
	  		<WebView 
          style={{backgroundColor: 'rgba(255,255,255,0.8)'}}
          source={{uri: mapUri}}
        />
      </View>
      <View style={{bottom: 180, backgroundColor: 'red'}}>
        <Text>AAAA</Text>
      </View>
	  	</View>
  	)
  }
}

const mapStateToProps = (state) => {
  return {
    latitude: state.mapscreen.latitude,
    longitude: state.mapscreen.longitude
  }
}


export default connect(mapStateToProps)(EmergencyScreen)
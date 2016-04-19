import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
// external libs
import Icon from 'react-native-vector-icons/Ionicons'
// I18n
import I18n from '../I18n/I18n.js'

import React, { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  PropTypes, 
  StyleSheet, 
  Alert, 
} from 'react-native'

export default class ProfileScreen extends React.Component {
	
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
  	}
  }

  render () {
  	return(
	  	<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
	  		<Text>In development</Text>
	  	</View>
  	)
  }
}
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import Icon from 'react-native-vector-icons/Ionicons'
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
	  	<View style={styles.container}>
	  		<Text>In development</Text>
	  	</View>
  	)
  }
  
}

var styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});
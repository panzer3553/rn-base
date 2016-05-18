import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import I18n from '../I18n/I18n.js'
import NavigationBar from '../Components/NavigationBar' 

import React, { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  PropTypes, 
  StyleSheet, 
  Alert, 
} from 'react-native'

export default class Developing extends React.Component {
	
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    const leftItem={layout: 'icon', title: 'Save', icon: 'android-menu', onPress: this.context.openDrawer}
  	return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationBar
        title= {I18n.t('feedback')}
        style={{backgroundColor: Colors.drawerColor}}
        leftItem={leftItem}/>
	  	<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
	  		<Text>In development</Text>
	  	</View>
     </View>
  	)
  }
}

Developing.contextTypes = {
  openDrawer: React.PropTypes.func,
};

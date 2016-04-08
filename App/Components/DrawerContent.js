import React, { View, Text, Navigator, StatusBar, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors, Images, Metrics } from '../Themes'

import I18n from '../I18n/I18n.js'
import styles from './Styles/DrawerStyle'
const drawerItems = [["add-location", 'location'], ["person", "profile"], ["local-hospital", "medicalInformation"], ["settings", "support"], ["share", "share"]]
import Routes from '../Navigation/Routes'

export default class DrawerContent extends React.Component {
	 
  constructor (props) {
   	super(props)
   	console.log(this.props);
    this.state = {}
  }

  // static propTypes = {
  //   navigator: PropTypes.object.isRequired,
  // }

  changePath(){
  	const { navigator } = this.props
    const route = Routes.LoginScreen
    navigator.push(route)
  }

  render(){
  	  return (
        <View style={{marginTop: 30, padding: 10}}>
          {drawerItems.map((item, i) =>
           <TouchableWithoutFeedback key ={i} onPress={this.changePath.bind(this)}>
            <View style={styles.section}>
              <Icon name={item[0]} size={Metrics.icons.medium} color="white" style={styles.icon}/>
              <Text style={styles.text}>
                {I18n.t(item[1])}
              </Text>
            </View>
          </TouchableWithoutFeedback>)  
          }
          </View>
        )
  }
}
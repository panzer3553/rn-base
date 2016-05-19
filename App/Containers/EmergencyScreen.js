import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
// external libs
import Icon from 'react-native-vector-icons/Ionicons'
// I18n
import I18n from '../I18n/I18n.js'
import { connect } from 'react-redux'
import NavigationBar from '../Components/NavigationBar' 
import MapScreen from '../Components/MapScreen'
var {height, width} = Dimensions.get('window');

import React, { 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  PropTypes, 
  StyleSheet, 
  WebView,
  Dimensions,
  TouchableWithoutFeedback,
  Image
} from 'react-native'

export default class EmergencyScreen extends React.Component {
	
  constructor (props) {
    super(props)
    this.state = {
      images: [
      {uri: 'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-94ab0fe1-7936-4b19-8411-4cd78f77b68b-picture.jpg'},
      {uri: 'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-94ab0fe1-7936-4b19-8411-4cd78f77b68b-picture.jpg'},
      {uri: 'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-94ab0fe1-7936-4b19-8411-4cd78f77b68b-picture.jpg'},
      {uri: 'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-94ab0fe1-7936-4b19-8411-4cd78f77b68b-picture.jpg'},
      {uri: 'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-94ab0fe1-7936-4b19-8411-4cd78f77b68b-picture.jpg'},
      {}
      ]
    }
  }

  render () {
    const leftItem={layout: 'icon', icon: 'android-menu', onPress: this.context.openDrawer}
    const {emergencyData} = this.props
  	return(
	  	<View style={{flex:1, backgroundColor: 'white'}}>
        <NavigationBar
          title= {I18n.t('emergency')}
          style={{backgroundColor: Colors.drawerColor}}
          leftItem={leftItem}/>
        <View style={{flex: 2}}>
          <MapScreen />
        </View>
        <View style={{flex: 1, padding: 16}}>
          <Text>Address: {emergencyData ? emergencyData.emergency.address : ""}</Text>
          <Text>Type: {emergencyData ? emergencyData.emergency.type : ""}</Text>
          <Text>Location: {emergencyData ? '(' + emergencyData.emergency.location.longitude + ', ' + emergencyData.emergency.location.latitude + ")" : ""}</Text>
          <Text>Contact Phone</Text>
          <View style={styles.imgContainer}>
              <ScrollView style={styles.imgContainer} automaticallyAdjustContentInsets={false} horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.imgContent}>
                { this.state.images.map((image,index) => {
                    return(
                        <View key={index}>
                            <Image style={styles.image} source={{ uri: image.uri }}/>
                        </View>
                    )
                  })
                }
                </View>
              </ScrollView>
        </View>
        </View>
	  	</View>
  	)
  }
}

var styles = StyleSheet.create({
  imgContent:{
    height:150,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    flexDirection:"row",
    flexWrap:"wrap",
  },
  image:{
    height:100,
    width:100,
    marginRight:5,
    alignItems:"flex-end",
    justifyContent:"flex-end",
    paddingBottom:5,
    paddingRight:10,
  },
  imgContainer:{
    width: width-20,
  },

})

EmergencyScreen.contextTypes = {
  openDrawer: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    emergencyData: state.emergencyReceive.data
  }
}

export default connect(mapStateToProps)(EmergencyScreen)
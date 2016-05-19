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
import Lightbox from 'react-native-lightbox'

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
  Image,
  ActionSheetIOS,
  Platform,
  TouchableHighlight,
  Linking
} from 'react-native'
const {height, width} = Dimensions.get('window');

export default class EmergencyScreen extends React.Component {
	
  constructor (props) {
    super(props)
    this.state = {
      images: [
      {uri: 'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg'},
      {uri: 'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-94ab0fe1-7936-4b19-8411-4cd78f77b68b-picture.jpg'},
      {uri: 'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-94ab0fe1-7936-4b19-8411-4cd78f77b68b-picture.jpg'},
      {uri: 'http://files.parsetfss.com/6869fbd8-8b0f-4f09-9ec6-3f6eeaf669c0/tfss-94ab0fe1-7936-4b19-8411-4cd78f77b68b-picture.jpg'},
      ]
    }
    this.openMaps = this.openMaps.bind(this)
  }

  getEmergencyLocation () {
    if(this.props.emergencyData) {
      const {longitude, latitude} = this.props.emergencyData.emergency.location
      return {longitude: longitude, latitude: latitude}
    }
    else
      return null
  }

  handleGetDirections() {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Direction to emergency',
          options: ['Open in Apple Maps', 'Open in Google Maps', 'Cancel'],
          destructiveButtonIndex: -1,
          cancelButtonIndex: 2,
        },
        this.openMaps
      );
    } else if (Platform.OS === 'android') {
      const {longitude, latitude} = this.props.emergencyData.emergency.location
      const {slatitude, slongitude} = this.props
      desAddress= slatitude + ', ' + slongitude
      srcAddress = latitude + ', ' + longitude 
      const directionUrl  = 'saddr=' + srcAddress + '&daddr=' + desAddress 
      Linking.openURL('http://maps.google.com/maps?' + directionUrl);
    }
  }

  openMaps(option) {
    const {longitude, latitude} = this.props.emergencyData.emergency.location
    const {slatitude, slongitude} = this.props
    desAddress= slatitude + ', ' + slongitude
    srcAddress = latitude + ', ' + longitude 
    const directionUrl  = 'saddr=' + srcAddress + '&daddr=' + desAddress 
    switch (option) {
      case 0:
        Linking.openURL('http://maps.apple.com/?' + directionUrl);
        break;

      case 1:
        var nativeGoogleUrl = 'comgooglemaps-x-callback://?' +
          directionUrl + '&x-success=f8://&x-source=F8';
        Linking.canOpenURL(nativeGoogleUrl).then((supported) => {
          var url = supported ? nativeGoogleUrl : 'http://maps.google.com/?' + directionUrl;
          Linking.openURL(url);
        });
        break;
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
          <MapScreen emergency={this.getEmergencyLocation()}/>
          <TouchableHighlight style={{position: 'absolute', top: 10, right: 10}} onPress={() => {if(emergencyData){this.handleGetDirections()}}}>
            <Icon name="navigate" size={24} color="blue"/>
          </TouchableHighlight>
        </View>
        <ScrollView style={{flex: 1, padding: 16}}>
          <Text>Address: {emergencyData ? emergencyData.emergency.address : ""}</Text>
          <Text>Type: {emergencyData ? emergencyData.emergency.type : ""}</Text>
          <Text>Location: {emergencyData ? '(' + emergencyData.emergency.location.longitude + ', ' + emergencyData.emergency.location.latitude + ")" : ""}</Text>
          <Text>Contact Phone</Text>
          <View style={styles.imgContainer}>
              <ScrollView style={styles.imgContainer} automaticallyAdjustContentInsets={false} horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.imgContent}>
                { this.state.images.map((image,index) => {
                    return(
                        <Lightbox key={index} activeProps={{style: {width: width, height: width}}}>
                            <Image style={styles.image} source={{ uri: image.uri }}/>
                        </Lightbox>
                    )
                  })
                }
                </View>
              </ScrollView>
        </View>
        </ScrollView>
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
    width: 100,
    height: 100,
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
    emergencyData: state.emergencyReceive.data,
    slatitude: state.mapscreen.latitude,
    slongitude: state.mapscreen.longitude
  }
}

export default connect(mapStateToProps)(EmergencyScreen)
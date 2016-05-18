// An All Components Screen is a great way to dev and quick-test components
import React, { View, Text, PropTypes, Alert, AsyncStorage, Image, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/AllComponentsScreenStyle'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import MapScreen from '../Components/MapScreen'
import BubblePopUp from './BubblePopUp.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import {MKButton,MKColor} from 'react-native-material-kit'
import Communications from 'react-native-communications'
import NavigationBar from '../Components/NavigationBar' 
var ImagePickerManager = require('NativeModules').ImagePickerManager;
import I18n from '../I18n/I18n.js'
const STORAGE_KEY_PROFILE = 'PROFILE_ID'

const fireItems = [ 
  {icon: 'fire', text: 'Show Info Screen', func: 'showHelpScreen'}, 
  {icon: 'fire', text: 'Show Location', func: 'showUserLocation'}, 
  {icon: 'fire', text: 'Location Info', func: 'JSONLocation'}, 
]

const options = {
  title: 'Select Image', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'medium', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.2, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
}

const Fab = MKButton.plainFab()
  .withStyle({width:Metrics.button.large, height: Metrics.button.large, borderRadius: Metrics.button.large/2, backgroundColor: Colors.snow})
  .build()

const SmallFab = MKButton.plainFab()
  .withStyle({width:Metrics.button.medium, height: Metrics.button.medium, borderRadius: Metrics.button.medium/2, backgroundColor: Colors.snow})
  .build()

export default class AllComponentsScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.state = {
      isPopupShow: false,
      items: [],
      image: null
    }
  }

  componentWillMount () {

  }

  handleShowPopUp (_items) {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigator.push(Routes.GalleryScreen)
    })
  }

  handleClosePopUp () {
    this.setState({isPopupShow: false})
  }

  showConfirmDialog (_title, _message, _phoneNumber, type) {
    Alert.alert(
      _title,
      _message + _phoneNumber,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel')},
        {text: 'OK', onPress: () =>  Communications.phonecall(_phoneNumber, false)},
      ]
    )
    const {dispatch} = this.props  
    AsyncStorage.getItem(STORAGE_KEY_PROFILE).then((value) => {
      if (value !== null){
        dispatch(Actions.updateLocationAndSaveEmergency(type, value))
      }
    })
    // THE EMERGENCY SAVE HAS MOVED TO MAPSCREENSAGA
    //this.saveEmergency({
    //  location: {
    //        __type: 'GeoPoint',
    //        latitude: this.props.latitude,
    //        longitude: this.props.longitude
    //  },
    //  time: new Date(),
    //  type: type,
    //})
    //console.log(this.props)
  }

  saveEmergency(emergency){
    const {dispatch} = this.props
    dispatch(Actions.saveEmergency(emergency, value))
  } 

  sendExtremeEmergency () {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch} = this.props  
      dispatch(Actions.updateLocationAndSaveEmergency("alarm"))
      this.props.navigator.push(Routes.CameraScreen)
    })
  }

  render () {
    const bottomButtons = this.state.isPopupShow ? null : (
        <View style={styles.icons_container}>
          <Fab onPress={this.showConfirmDialog.bind(this, 
            'Do you want to make this call ?',
            'Only make this call when you are in an emergency situation! ' +
            'Please confirm to make the call to FIRE STATION: ',
            '+84982709185', 
            'fire')}>
            <Icon name="fire" size={Metrics.icons.medium} color="red" />
          </Fab>
          <Fab  onPress={this.showConfirmDialog.bind(this, 
            'Do you want to make this call ?',
            'Only make this call when you are in an emergency situation! ' +
            'Please confirm to make the call to  AMBULANCE: ',
            '+84982709185',
             'ambulance')}>
            <Icon name="ambulance" size={Metrics.icons.medium} color="red" />
          </Fab>
          <Fab  onPress={this.showConfirmDialog.bind(this, 
            'Do you want to make this call ?',
            'Only make this call when you are in an emergency situation! ' +
            'Please confirm to make the call to POLICE STATION: ',
            '+84982709185', 
            'police' )}>
            <Icon name="bell" size={Metrics.icons.medium} color="red" />
          </Fab>
       </View>   
    )
    const leftItem={layout: 'icon', title: 'Save', icon: 'android-menu', onPress: this.context.openDrawer}
    return (
      <View style={styles.screenContainer}>
        <NavigationBar
          title= {I18n.t('home')}
          style={{backgroundColor: Colors.drawerColor}}
          leftItem={leftItem}/>
        <View style={{flex: 1}}>
        <MapScreen />
        <View style={styles.infoIconContainer}>
          <SmallFab onPress={this.handleShowPopUp.bind(this, fireItems)}>
            <Icon name="info" size={Metrics.icons.small} color="red" />
          </SmallFab>
        </View>
        <View style={styles.extremeIconContainer}>
          <SmallFab onPress={this.sendExtremeEmergency.bind(this)}>
            <Icon name="warning" size={Metrics.icons.small} color="red" />
          </SmallFab>
        </View>
        <BubblePopUp  
          items={this.state.items}
          elementWidth={Metrics.screenWidth * 4 / 5}
          elementHeight={Metrics.screenHeight / 15}
          isVisible={this.state.isPopupShow}
          onClose={this.handleClosePopUp.bind(this)}
          navigator={this.props.navigator}
          dispatch={this.props.dispatch}
        />
      {bottomButtons}
      </View>
     </View>
    )
  }
}

AllComponentsScreen.contextTypes = {
  openDrawer: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    //latitude: state.mapscreen.latitude,
    //longitude: state.mapscreen.longitude,
  }
}

export default connect(mapStateToProps)(AllComponentsScreen)
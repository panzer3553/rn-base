import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ToastAndroid,
  Platform,
  Alert
} from 'react-native';
import Camera from 'react-native-camera';
import TimerMixin from 'react-timer-mixin';
import NavigationBar from '../Components/NavigationBar' 
import I18n from '../I18n/I18n.js'
import { Colors } from '../Themes'
import Routes from '../Navigation/Routes'

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

export default class CameraScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      isAuto: true,
      numberofPicture: 0
    }
    this.dismiss = this.dismiss.bind(this)
    this.goToGallery = this.goToGallery.bind(this)
  }

  componentDidMount () {
    this.intervalTimer = TimerMixin.setInterval(() => {this.takePicture(); this.setState({numberofPicture: this.state.numberofPicture + 1})}, 2000);
    this.clearTimer = TimerMixin.setTimeout(() => {TimerMixin.clearInterval(this.intervalTimer);this.setState({isAuto: false})}, 10000);
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  takePicture () {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  componentWillUnmount () {
    TimerMixin.clearInterval(this.intervalTimer)
    TimerMixin.clearTimeout(this.clearTimer);
    MessageBarManager.unregisterMessageBar();
  }

  dismiss () {
    this.props.navigator.pop()
  }

  goToGallery () {
    this.props.navigator.push(Routes.GalleryScreen)
  }

  render () {
    const leftItem={layout: 'icon', title: 'Back', icon: 'ios-arrow-back', onPress: this.dismiss}
    const rightItem={layout: 'title', title: 'Done', onPress: this.goToGallery}
    const text = this.state.isAuto ? <Text style={styles.capture}>Automatic take picture ({this.state.numberofPicture})</Text> : null
    return (
      <View style={{flex: 1}}>
      <NavigationBar
          title= 'Camera'
          style={{backgroundColor: Colors.drawerColor}}
          leftItem={leftItem}
          rightItem={rightItem}/>
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View style={styles.bottomView}>
        {text}
        </View>
        <MessageBarAlert ref="alert" />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width + 3
  },
  capture: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 10
  },
  bottomView: {
    position: 'absolute',
    flex: 0,
    left: 0,
    bottom: 30,
    alignItems: 'center', 
    width: Dimensions.get('window').width + 3 
  }
});

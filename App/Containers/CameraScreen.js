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
import Icon from 'react-native-vector-icons/Ionicons'
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

export default class CameraScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      isAuto: true
    }
  }

  componentDidMount () {
    this.intervalTimer = TimerMixin.setInterval(() => {this.takePicture()}, 1500);
    this.clearTimer = TimerMixin.setTimeout(() => {TimerMixin.clearInterval(this.intervalTimer);this.setState({isAuto: false})}, 10000);
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  takePicture () {
    this.camera.capture().catch(err => console.error(err));
  }

  componentWillUnmount () {
    TimerMixin.clearInterval(this.intervalTimer)
    TimerMixin.clearTimeout(this.clearTimer);
    MessageBarManager.unregisterMessageBar();
  }

  pressTakeButton () {
    this.showMessage()
    this.camera.capture().catch(err => console.error(err));
  }

  showMessage () {
    MessageBarManager.showAlert({
      message: 'Take picture successful',
      alertType: 'info',
      // See Properties section for full customization
      // Or check `index.ios.js` or `index.android.js` for a complete example
      viewTopOffset: 60,
      duration: 2000,
      messageStyle: { color: 'white', fontSize: 16 }
    });
  }

  render () {
    const text = this.state.isAuto ? <Text style={styles.capture}>Automatic take picture</Text> : <Icon onPress={() => this.pressTakeButton()} name="ios-camera" size={48} color="white" />
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Platform.OS === 'android' ? Camera.constants.CaptureTarget.disk : Camera.constants.CaptureTarget.cameraRoll}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View style={styles.bottomView}>
        {text}
        </View>
        <MessageBarAlert ref="alert" />
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

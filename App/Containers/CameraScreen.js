import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ToastAndroid,
  Platform
} from 'react-native';
import Camera from 'react-native-camera';
import TimerMixin from 'react-timer-mixin';

export default class CameraScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      isAuto: true,
      numberofPicture: 0
    }
  }

  componentDidMount () {
    this.intervalTimer = TimerMixin.setInterval(() => {this.takePicture(); this.setState({numberofPicture: this.state.numberofPicture + 1})}, 1000);
    this.clearTimer = TimerMixin.setTimeout(() => {TimerMixin.clearInterval(this.intervalTimer);this.setState({isAuto: false})}, 10000);
  }

  takePicture () {
    this.camera.capture()
      .then((data) => {this.setState({imageList: this.state.imageList.concat(data)})})
      .catch(err => console.error(err));
  }

  componentWillUnmount () {
    TimerMixin.clearInterval(this.intervalTimer)
    TimerMixin.clearTimeout(this.clearTimer);
  }

  render () {
    const text = this.state.isAuto ? <Text style={styles.capture}>Automatic take picture ({this.state.numberofPicture})</Text> : null
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View >
        {text}
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
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
    color: '#000',
    padding: 10,
    margin: 10
  }
});

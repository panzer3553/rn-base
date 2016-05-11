import React, {
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert
} from 'react-native';
import Camera from 'react-native-camera';
import TimerMixin from 'react-timer-mixin';

export default class CameraScreen extends Component {

  componentDidMount () {
    this.intervalTimer = TimerMixin.setInterval(() => {this.takePicture()}, 2000);
    this.clearTimer = TimerMixin.setTimeout(() => {TimerMixin.clearInterval(this.intervalTimer)}, 10000);
  }

  takePicture () {
    this.camera.capture()
      .then((data) => console.log(data.path))
      .catch(err => console.error(err));
  }

  componentWillUnmount() {
    TimerMixin.clearInterval(this.intervalTimer)
    TimerMixin.clearTimeout(this.clearTimer);
  }


  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.disk}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
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
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

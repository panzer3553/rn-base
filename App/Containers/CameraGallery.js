import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  LayoutAnimation,
  ScrollView,
  CameraRoll,
  View,
  Dimensions,
  PropTypes
} from 'react-native';
var {height, width} = Dimensions.get('window');
CustomImageManager = require('NativeModules').CustomImageManager;
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../Components/NavigationBar' 
import { Colors } from '../Themes'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'

export default class ImageCamera extends React.Component{

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      images: [],
      active: false,
      selected: [],
    };
    this.dismiss = this.dismiss.bind(this)
    this.uploadToServer = this.uploadToServer.bind(this)
  }

  componentDidMount() {
    const fetchParams = {
      first: 10,
    };
    CustomImageManager.getImages(fetchParams).done((data) => this.storeImages(data), (err) => this.logImageError(err));
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image)
    const selected = [];
    this.setState({
      images: images,
    });

    for (var i = 0; i < images.length; i++) {
      selected.push(false);
    }
  }


  logImageError(err) {
    console.log(err);
  }

  _select(index) {
    let {selected} = this.state;
    selected[index] = !selected[index];
    this.setState({
      active: true,
      selected,
    });
  }

  dismiss () {
    this.props.navigator.pop()
  }

  uploadToServer () {
    const {dispatch} = this.props
    const {emergencyId} = this.props;//'H6lrirRO1U'
    dispatch(Actions.uploadImage(this.state.images, emergencyId, this.state.selected))
  }


  render() {
    console.log(this.state.images)
    const {active,selected} = this.state;
    const leftItem={layout: 'icon', title: 'Back', icon: 'ios-arrow-back', onPress: this.dismiss}
    const rightItem={layout: 'title', title: 'Upload', onPress: this.uploadToServer}
    return (
      <View style={{flex: 1}}>
      <NavigationBar
          title= 'Gallery'
          style={{backgroundColor: Colors.drawerColor}}
          leftItem={leftItem}
          rightItem={rightItem}/>
      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>
        { this.state.images.map((image,index) => {
            return(
              <TouchableWithoutFeedback underlayColor="transparent" key={index} onPress = {() => this._select(index)}>
                <View>
                  <Image style={styles.image} source={{ uri: image.uri }}>
                    {active? 
                      (selected[index]? 
                        <Icon style={styles.icon} name="ios-checkmark" color="#0089fa" size={25}></Icon>:
                        <Icon style={styles.icon} name="ios-circle-outline" color="#fff" size={25}></Icon>):
                      <View></View>
                    }
                  </Image>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
        </View>
      </ScrollView>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    emergencyId: state.emergencyData.ok.objectId
  }
}

export default connect(mapStateToProps)(ImageCamera)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    imageGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    image: {
        width: 150,
        height: 150,
        margin: 5,
    },
    icon:{
      backgroundColor:"transparent",
      left: 120,
  }
});
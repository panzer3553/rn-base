import React, {
	View, 
	Component, 
	Image, 
	TouchableHighlight,
	PropTypes
} from 'react-native'
import MapView from 'react-native-maps'
import styles from './Styles/MapScreenStyle' 
import {isEqual} from 'lodash'

export default class MapScreen extends React.Component {

  static propTypes = {
      latitude: PropTypes.number,
      longitude: PropTypes.number,
  }

	constructor () {
		super();
		this.state = {
			region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
			},
		}
	}

  componentDidMount(){
    console.log(this.props.markers)
  }

  render () {
  	return (
  		<MapView 
  		  style={styles.map}
  		  region={{
          latitude: this.props.latitude || 0,
          longitude: this.props.longitude || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        showsUserLocation
     	>
      {this.props.markers.map((marker, i) => (
      <MapView.Marker 
        key ={i} 
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      />
      ))}
      </MapView>
  		)
  	}
}

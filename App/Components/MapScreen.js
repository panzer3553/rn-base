import React, { View, Component, Image, TouchableHighlight, PropTypes } from 'react-native'
import MapView from 'react-native-maps'
import styles from './Styles/MapScreenStyle' 
import { connect } from 'react-redux'

export default class MapScreen extends React.Component {

  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }

	constructor (props) {
		super(props)
		this.state = {
			region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
			}
		}
	}

  render () {
  	return (
  		<MapView 
  		  style={styles.map}
  		  region={{
          latitude: this.props.latitude || 0,
          longitude: this.props.longitude || 0,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08
        }}
        showsUserLocation={true}>
        {this.props.emergency ? <MapView.Marker
          coordinate={this.props.emergency}
          title="Emergency"
        /> : null}
      </MapView>
  		)
  	}
}

const mapStateToProps = (state) => {
  return {
    latitude: state.mapscreen.latitude,
    longitude: state.mapscreen.longitude
  }
}


export default connect(mapStateToProps)(MapScreen)
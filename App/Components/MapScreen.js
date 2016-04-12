
import React, {
	View, 
	Component, 
	Image, 
	TouchableHighlight 
} from 'react-native'

import MapView from 'react-native-maps'

import styles from './Styles/MapScreenStyle' 

export default class MapScreen extends React.Component {

	render () {
		return (
		  <MapView 
		  style={styles.map}
		    initialRegion={{
		      latitude: 37.78825,
		      longitude: -122.4324,
		      latitudeDelta: 0.0922,
		      longitudeDelta: 0.0421,
		    }}
		  />
		)
	}
}
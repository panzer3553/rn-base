
import React, {
	View, 
	Component, 
	Image, 
	TouchableHighlight 
} from 'react-native'

import MapView from 'react-native-maps'

import styles from './Styles/MapScreenStyle' 

export default class MapScreen extends React.Component {


	constructor (props) {
		super(props);
		console.log('GoogleMap constructor');
		this.onRegionChange = this.onRegionChange.bind(this);
		this.state = {
			region: {
			    latitude: 0.0,
			    longitude: 0.0,
			    latitudeDelta: 0.0,
			    longitudeDelta: 0.0,
			},
			watchID: (null: ? number)
		}
	}

	componentDidMount () {
		//init map with current 
		navigator.geolocation.getCurrentPosition(
			(position) => {
				var initialPosition = JSON.stringify(position)
        		this.setState({region: {latitude: position.coords.latitude,
        								longitude: position.coords.longitude,
        								latitudeDelta: 0.0,
			    						longitudeDelta: 0.0}
			    					})	
			},
			(error) => {
				//alert(error.message);
			}
		)
	}

	compoentWillUnMount () {
		navigator.geolocation.clearWatch(this.watchID)
	}


	onRegionChange(region) {
		this.setState({ region })
	}


  render () {
	return (
		<MapView 
		  style={styles.map}
		  region={this.state.region}
		  />
		)
	}
}

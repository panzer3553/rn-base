
import React, {
 	MapView, 
	View, 
	Component, 
	Image, 
	TouchableHighlight 
} from 'react-native'

import styles from './../Containers/Styles/MapScreenStyle' 

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
				var initialPosition = JSON.stringify(position);
        		this.setState({initialPosition});
			},
			(error) => {
				//alert(error.message);
			}
		)
	}

	compoentWillUnMount () {
		navigator.geolocation.clearWatch(this.watchID);
	}


	onRegionChange(region) {
		this.setState({ region });
	}

	render () {
		return (
				<MapView
				  style={styles.map}
				  showsUserLocation={true}
				  followUserLocation={true}
				  showsCompass={true}
				  showsPointsOfInterest={true}
				  annotations={this.state.annotations}
				  onRegionChange={this.onRegionChange}
				/>

		);
	}
}
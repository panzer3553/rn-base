
import React, {
	View, 
	Component, 
	Image, 
	TouchableHighlight,
	PropTypes
} from 'react-native'
import MapView from 'react-native-maps'
import styles from './Styles/MapScreenStyle' 

export default class MapScreen extends React.Component {


	constructor (props) {
		super(props);
		this.state = {
			region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
			},
		}
	}

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({region: {latitude: position.coords.latitude,
        						longitude: position.coords.longitude,
        						latitudeDelta: 0.01,
        						longitudeDelta: 0.01,
			        	}})
      },
      (error) => console.log(error),
    )
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
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

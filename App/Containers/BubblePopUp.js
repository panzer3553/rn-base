
import styles from './Styles/BubblePopUpStyle'
import listStyles from './Styles/CustomListViewStyle'
import Triangle from '../Components/Triangle'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import I18n from '../I18n/I18n.js'
import { connect } from 'react-redux'
import R from 'ramda'
import Linking from 'Linking'
import React, {
	StyleSheet,
	View, 
	Component, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	PropTypes,
	Platform,
} from 'react-native'

export default class BubblePopUp extends React.Component {

	constructor (props) {
		super(props)
		this.state = {
			isVisible: false,
			itemFuncName: null,
		}
	}

	static propTypes = {
	    isVisible: PropTypes.bool,
	    onClose: PropTypes.func,
  	}

	render () {

		const elementWidth  = this.props.elementWidth
		const elementHeight = this.props.elementHeight
		const elementCounts = this.props.items.length
		const talkBubbleHeight = elementHeight * (elementCounts) + Metrics.fonts.large + elementHeight + elementCounts * 2

		if (this.props.isVisible){
			return (
				<View style={styles.screenContainer}>
			        <View style={styles.bubbleContainer}
			        	  width={elementWidth}
			        	  marginLeft={10}
			        	  marginTop={10}>
						<View style={styles.squareContainer} 
								width={elementWidth}
								height={talkBubbleHeight}>
							<View 
								style={styles.headerContainer}
								elementHeight = {elementHeight}>
								<Text style={styles.headerText}
								height={elementHeight}
								>Instruction</Text>
							</View>
							 {this.props.items.map((item, i) => 	
								  <TouchableHighlight  
								  		key ={i} 
								  		width={elementWidth}
								  		height={elementHeight}
								  		onPress ={ 	this.handlePressItem.bind(this, item.func)}
								  		key={i}>
								      <View >
								        <View style={listStyles.rowContainer} 
								        	height={elementHeight}>
								          <Icon      
								      		 name={item.icon}	      		
								      		 size={Metrics.icons.small}
								      		 color={'blue'}
								      		 />
								          <View  style={listStyles.textContainer}>
								            <Text style={listStyles.title}>{item.text}</Text>
								            <Text style={listStyles.description}
								                  numberOfLines={1}>{item.func}
								            </Text>
								          </View>
								        </View>
								        <View style={listStyles.separator}/>
								      </View>
								    </TouchableHighlight>)}
				    	    <View height={elementHeight}> 
      			    	  		<TouchableOpacity 
      			    	  			style={styles.closeButtonWraper} 
      			    	  			onPress={this.props.onClose}>
					              <View style={styles.closeButton}
					              height={elementHeight}>
					                <Text style={styles.closeText}>{I18n.t('cancel')}</Text>
					              </View>
					            </TouchableOpacity>
		    			   	</View>
						</View>

						<View style={styles.triangleContainer}>
		    			   	<Triangle style={styles.triangleRight}
			          			size={30}
								color={'white'}
								left={5}
								top={elementHeight} 
							/>
						</View>
	    			</View>
				</View>
			)
		}

		return (
			null
		)
	}

	handlePressItem(_itemFuncName) {
		switch (_itemFuncName) {
			case 'showHelpScreen': 
				this.showHelpScreen()
				break
			case 'showUserLocation': {
				this.showUserLocation()
				break
			}
			case 'JSONLocation':
				this.showJSONInfo()
				break
			case 'showMapLinkWithDirection': 
				this.showMapLinkWithDirection()
				break

			default: {
				alert(_itemFuncName)
				break
			}
		}	
	}

	showHelpScreen () {
	    const { navigator } = this.props
	    const route = Routes.HelpScreen
	    navigator.push(route)
	}

	showUserLocation () {
		//Close popup first
		if (typeof this.props.onClose === 'function') {
            this.props.onClose()
        }
        // move to current location
		const {dispatch} = this.props
		dispatch(Actions.requestLocation())
	}

	showJSONInfo () {
		//Close popup first
		if (typeof this.props.onClose === 'function') {
            this.props.onClose()
        }

        //show JSON info test
		const { latitude, longitude } = this.props
	
		const {dispatch} = this.props
		dispatch(Actions.requestJsonByCoords(latitude, longitude))
		//const json = this.props.json

	}

	showMapLinkWithDirection () {
		//Close popup first
		if (typeof this.props.onClose === 'function') {
            this.props.onClose()
        }
        const srcAddress = 'Cupertino'
        const desAddress = 'San+Francisco'
        //const srcAddress = '16.061144, 108.227092'
        //const desAddress = '16.071144, 108.227092'
        const mode = (Platform.OS === 'ios') ? 'dirflg=d' : 'mode=bicycling'
        //const {dispatch} = this.props
		//dispatch(Actions.requestDirection(desAddress, srcAddress, mode))
	    
	}

	// redirectToMap(desAdress, srcAdress, mode) {
	// 	const baseUrl = (Platform.OS === 'ios') ? 'http://maps.apple.com/?' : 'http://maps.google.com/maps?'
	// 	const directionUrl = baseUrl + 'saddr=' + srcAdress + '&daddr=' + desAdress + '&' + mode
	// 	console.log('URL=' + directionUrl)
	//     Linking.canOpenURL('http://maps.apple.com/?saddr=Cupertino&daddr=San+Francisco').then(supported => {
	//         if (supported) {
	//             Linking.openURL(directionUrl)
	//         } else {
	//             console.log('Don\'t know how to go')
	//         }
	//     }).catch(err => console.error('An error occurred', err))
	// }
}


const mapStateToProps = (state) => {
  return {
    latitude: state.mapscreen.latitude,
    longitude: state.mapscreen.longitude,
  }
}

export default connect(mapStateToProps)(BubblePopUp)

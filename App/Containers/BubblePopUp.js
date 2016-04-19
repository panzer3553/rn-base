
import styles from './Styles/BubblePopUpStyle'
import listStyles from './Styles/CustomListViewStyle'
import Triangle from '../Components/Triangle'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import CircleIcon from '../Components/CircleIcon'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import I18n from '../I18n/I18n.js'
import React, {
	StyleSheet,
	View, 
	Component, 
	Text,
	TouchableHighlight,
	TouchableOpacity,
	PropTypes,
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
		const talkBubbleHeight = elementHeight * (elementCounts + 3) 

		if (this.props.isVisible){
			return (
				<View style={styles.screenContainer}>
			        <View style={styles.bubbleContainer}
			        	  width={elementWidth}
			        	  marginLeft={10}
			        	  marginTop={10}>
						<View style={styles.squareContainer} 
								width={elementWidth}
								height={talkBubbleHeight} 
						>
							<View style={styles.headerContainer}
								elementHeight = {elementHeight}>
								<Text style={styles.headerText}>Instruction</Text>
							</View>
							 {	this.props.items.map((item, i) => 	
								  <TouchableHighlight  
								  		width={elementWidth}
								  		onPress ={ 	this.handlePressItem.bind(this, item.func)}
								  		key={i}>
								      <View >
								        <View style={listStyles.rowContainer} >
								          <Icon      
								      		 name={item.icon}	      		
								      		 size={Metrics.icons.small}
								      		 color={'blue'}
								      		 />
								          <View  style={listStyles.textContainer}>
								            <Text style={listStyles.title}>{item.text}</Text>
								            <Text style={listStyles.description}
								                  numberOfLines={1}>{item.func}</Text>
								          </View>
								        </View>
								        <View style={listStyles.separator}/>
								      </View>
								    </TouchableHighlight>)
							}
				    	    <View > 
      			    	  		<TouchableOpacity 
      			    	  			style={styles.closeButtonWraper} 
      			    	  			onPress={this.props.onClose}>
					              <View style={styles.closeButton}>
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

	showUserLocation() {
		//Close popup first
		if (typeof this.props.onClose === 'function') {
            this.props.onClose()
        }

		const {dispatch} = this.props
		dispatch(Actions.requestLocation())
	}

	showJSONInfo() {
		if (typeof this.props.onClose === 'function') {
            this.props.onClose()
        }

		const {dispatch} = this.props
		const  lat = 16.089327
		const  lng = 108.220243
		dispatch(Actions.requestMapJSON(lat, lng, 'json'))
	}

}




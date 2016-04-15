
import styles from './Styles/BubblePopUpStyle'
import Triangle from '../Components/Triangle'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import CustomListView from './CustomListView'
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

var itemCount = 0;

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
  	};
	
	render () {

		const elementWidth  = this.props.elementWidth
		const elementHeight = this.props.elementHeight
		const elementCounts = this.props.items.length
		const talkBubbleHeight = elementHeight * (elementCounts + 2) 

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
							<CustomListView  
								style={styles.squareContainer} 
								items={this.props.items}
								navigator={this.props.navigator}
								dispatch={this.props.dispatch}
								onClose={this.props.onClose}
								onPressItem={this.handlePressItem.bind(this)}
								itemFuncName={this.state.itemFuncName}

							/>
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
			<View>
			</View>
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

}





import styles from './Styles/BubblePopUpStyle'
import Triangle from '../Components/Triangle'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Actions from '../Actions/Creators'
import CustomListView from './CustomListView'
import React, {
	StyleSheet,
	View, 
	Component, 
	Text,
	TouchableHighlight,
	PropTypes,
} from 'react-native'

var itemCount = 0;

export default class BubblePopUp extends Component {

	constructor (props) {
		super(props)
		this.state = {
			isVisible: false,
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
		const leftPopUpPos	= (Metrics.screenWidth - elementWidth) / 2
		const talkBubbleHeight = elementHeight * (elementCounts + 2) 

		if (this.props.isVisible){
			return (
				<View style={styles.screenContainer}>
			        <View style={styles.bubbleContainer}
			        	  width={elementWidth}>
						<View style={styles.squareContainer} 
								width={elementWidth}
								height={talkBubbleHeight} 
						>
							<CustomListView  
								style={styles.squareContainer} 
								items={this.props.items}
						/>
			    	    <View > 
	      			    	  		<TouchableHighlight 
	      			    	  			onPress={this.props.onClose}
	      			    	  			>
	      
	      			    	  				<Text> CLOSE BUTTON </Text>
	      			    	  		</TouchableHighlight>
	    			   	</View>

						</View>

						<View>
		    			   	<Triangle style={styles.triangleRight}
			          			size={30}
								color={'white'}
								left={elementWidth + 30/2}
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

	handlePressItem(item) {
		//console.log('FakePopupScreen press ' + item.text)	
		switch (item.func) {
			default: {
				alert(item.func);
				break;
			}
		}
		
		
	}

}




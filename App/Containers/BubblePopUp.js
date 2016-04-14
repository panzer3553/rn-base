
import fakePopupStyles from './Styles/FakePopupScreenStyle'
import Triangle from '../Components/Triangle'
import styles from './Styles/AllComponentsScreenStyle'
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
		const topPopUpPos	= this.props.topPopUpPos
		const leftPosClick	= this.props.leftPosClick
		const leftPopUpPos	= (Metrics.screenWidth - elementWidth) / 2
		const talkBubbleHeight = elementHeight * (elementCounts + 2) 

		if (this.props.isVisible){
			return (
				<View style={fakePopupStyles.container}>
		        <View style={fakePopupStyles.talkBubble}
		        	  width={elementWidth}
		        	  height={talkBubbleHeight} 
		        	  top={topPopUpPos}
		        	  left={leftPopUpPos}>
			          <View style={fakePopupStyles.talkBubbleSquare} 
			          		width={elementWidth}
			          		height={talkBubbleHeight} 
			          	/>

		          	<Triangle style={fakePopupStyles.triangleRight}
		          			size={30}
							color={'white'}
							left={elementWidth} />			
			        <CustomListView 
					    	items={this.props.items}/>
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




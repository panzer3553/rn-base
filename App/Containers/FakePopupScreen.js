
import fakePopupStyles from './Styles/FakePopupScreenStyle'
import styles from './Styles/AllComponentsScreenStyle'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, {
	StyleSheet,
	View, 
	ListView,
	Component, 
	Text,
	TouchableHighlight,
} from 'react-native'

var itemCount = 0;

export default class FakePopupScreen extends React.Component {

	constructor (props) {
		super(props)
		this.state = {}
	}
	
	render () {

		if (this.props.visibility){
			console.log('visibility')
			return (
				<View style={fakePopupStyles.container}>
			        <View style={fakePopupStyles.talkBubble}>
			          <View style={fakePopupStyles.talkBubbleSquare} />
			          <View style={fakePopupStyles.talkBubbleTriangle} />
			        </View>
			        <Text> SELECT EMERGENCY TYPE</Text>
			        <View  style={fakePopupStyles.listContainer} >
			        {	this.props.items.map((item, i) => 	
				        <TouchableHighlight 
				        	key={i} 
				        	onPress={this.handlePressItem.bind(this, item)} >
        			        <View 
        			        	style={fakePopupStyles.rowContainer}
        			        	height={25} >
					        	<Icon name={item.icon} /> 
					        	<Text style={fakePopupStyles.rowText}> 
					        		{item.text}    
					        	</Text>
        			    	</View>
				        </TouchableHighlight>)
			        }
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
		console.log('FakePopupScreen press ' + item.text)
	}

	handleCall() {
		
	}

}



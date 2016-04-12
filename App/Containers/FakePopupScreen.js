
import fakePopupStyles from './Styles/FakePopupScreenStyle'
import styles from './Styles/AllComponentsScreenStyle'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Communications from 'react-native-communications'
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

		const elementWidth  = this.props.elementWidth
		const elementHeight = this.props.elementHeight
		const elementCounts = this.props.items.length
		const topPopUpPos	= this.props.topPopUpPos
		const leftPosClick	= this.props.leftPosClick
		const leftPopUpPos	= (Metrics.screenWidth - elementWidth) / 2
		const talkBubbleHeight = elementHeight * (elementCounts + 2)
		console.log(topPopUpPos + '__' + talkBubbleHeight )
		if (this.props.visibility){
			console.log('visibility')
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
			          		top={topPopUpPos}/>
			          <View style={fakePopupStyles.talkBubbleTriangle} 
			          		left={leftPosClick}
			          		borderTopWidth={26}
		          		    borderLeftWidth= {13}
						    borderRightWidth={13}
			          		top={topPopUpPos + talkBubbleHeight}	
			          		/>
			        <View style={fakePopupStyles.titleContainer}
			        	width={elementWidth}>  
			        	<Text style={fakePopupStyles.title}></Text>  
			        </View>
			        <View  	style={fakePopupStyles.listContainer} 
			        		width={elementWidth}
			        		height={elementCounts * elementHeight}
			        		top={topPopUpPos + elementHeight}>  
			        {	this.props.items.map((item, i) => 	
				        <TouchableHighlight 
				        	key={i} 
				        	onPress={this.handlePressItem.bind(this, item)} 
				        	>
        			        <View 
        			        	style={fakePopupStyles.rowContainer}
        			        	width={elementWidth}
        			        	height={elementHeight} >
					        	
						        <View style={fakePopupStyles.rowIcon}> 
						        	<Icon name={item.icon} 
						        	width={elementHeight}
						        	height={elementHeight}
						        	/> 
						        </View>
						         <View style={fakePopupStyles.rowText}> 
						        	<Text 
						   				style={fakePopupStyles.rowText}
							        	width={elementWidth}> 
						        		{item.text}    
						        	</Text>
	        			    	</View>
	        			    </View>
				        </TouchableHighlight>)
			        }
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
		console.log('FakePopupScreen press ' + item.text)	
		
	}

	handleCall() {

	}

}



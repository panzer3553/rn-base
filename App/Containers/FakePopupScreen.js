
import fakePopupStyles from './Styles/FakePopupScreenStyle'
import styles from './Styles/AllComponentsScreenStyle'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Communications from 'react-native-communications'
import Actions from '../Actions/Creators'
import React, {
	StyleSheet,
	View, 
	ListView,
	Component, 
	Text,
	TouchableHighlight,
	PropTypes,
} from 'react-native'

var itemCount = 0;

export default class FakePopupScreen extends Component {

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

  	componentWillReceiveProps (nextProps: any) {
  		var willBeVisible = nextProps.isVisible
  		var isVisible = this.props.isVisible

  		if (willBeVisible != isVisible) {
  			if (willBeVisible) {
  				this.setState({isVisible: true})
  			}
  		}
  	}
	
	render () {

		const elementWidth  = this.props.elementWidth
		const elementHeight = this.props.elementHeight
		const elementCounts = this.props.items.length
		const topPopUpPos	= this.props.topPopUpPos
		const leftPosClick	= this.props.leftPosClick
		const leftPopUpPos	= (Metrics.screenWidth - elementWidth) / 2
		const talkBubbleHeight = elementHeight * (elementCounts + 2)
		const willBeVisible = this.props.isVisible

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
			          		top={topPopUpPos}/>
			          <View style={fakePopupStyles.talkBubbleTriangle} 
			          		left={leftPosClick}
			          		borderTopWidth={26}
		          		    borderLeftWidth= {13}
						    borderRightWidth={13}
			          		top={topPopUpPos + talkBubbleHeight}	
			          		/>
			        <View style={fakePopupStyles.titleContainer}
			        	width={elementWidth}			        	
			        	top={topPopUpPos} >  
			        	<Text style={fakePopupStyles.title}>THIS IS HEADER</Text>  
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
			        <View style={fakePopupStyles.footerContainer}
        			        	width={elementWidth}
        			        	height={elementHeight} 
        			        	top={topPopUpPos + talkBubbleHeight - elementHeight}>
        			      <View style={fakePopupStyles.rowText}> 
						        	<Text> 
						   		   		THIS IS FOOTER
						        	</Text>
    			    	  </View>
    			    	  
    			    	  
      			    	  <View style={fakePopupStyles.button}

      			    	  		> 
      			    	  		<TouchableHighlight onPress={this.props.onClose}
      			    	  		style={fakePopupStyles.button}>
      
      			    	  		<Text> CLOSE BUTTON </Text>
      			    	  		</TouchableHighlight>
    			    	  </View>
    			    	  
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
			case 'fireCall': {
				this.handleCall()
				break;
			}
			case 'showUserLocation': {
				this.showUserLocation()
				break;
			}
			default: {
				alert(item.func);
				break;
			}
		}
		
		
	}

	handleCall() {
		Communications.phonecall('+84982709185', false)
	}

	showUserLocation() {
	    //const { dispatch } = this.props
	    //dispatch(Actions.requestLocation())
	}
}




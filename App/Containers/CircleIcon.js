import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/CircleIconStyle'
import React, {
	StyleSheet,
	View, 
	Component,
	TouchableHighlight
} from 'react-native'

export default class CircleIcon extends React.Component {

	constructor (props) {
		super(props)
		this.state = {}

		this.handlePress = this.handlePress.bind(this)
	}

	handlePress() {
		console.log('CircleIcon CLICK ')
	}


	render () {
		return (
             <TouchableHighlight
             	width={this.props.width}
             	height={this.props.height}
                onPress={this.props.onPress}
             	>
                <Icon
                  name={this.props.name}
                  size={this.props.iconSize}
	              color={this.props.color}
                  >
                </Icon>
             </TouchableHighlight>  
		)
	}
}
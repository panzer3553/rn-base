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
	}


	render () {
		return (
             <TouchableHighlight style={styles.icon_background_circle}>
                <Icon
                  name={this.props.name}
                  style={styles.icon_circle}
                  size={this.props.size}
	              color={this.props.color}
                  onPress={this.props.onPress}
                  >
                </Icon>
             </TouchableHighlight>  
		)
	}
}
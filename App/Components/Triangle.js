import React, {
	StyleSheet,
	View, 
	Component, 
} from 'react-native'

export default class Triangle extends Component {

	constructor (props) {
		super (props)
	}

	render () {
		return (
			<View
				style={this.props.style}
				left={this.props.left}
				top={this.props.top}
			    backgroundColor={'transparent'}
			    borderStyle={'solid'} 
			    borderLeftColor={'transparent'}
			    borderRightColor={'transparent'}

				borderLeftWidth={this.props.size / 3}
				borderRightWidth={this.props.size / 3}
				borderBottomWidth={this.props.size}
				borderBottomColor={this.props.color}>
			</View>
		)
	}
}


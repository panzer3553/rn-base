import React, {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component,
  PropTypes
} from 'react-native'
import styles from './Styles/CustomListViewStyle'
import CircleIcon from '../Components/CircleIcon'
import { Colors, Images, Metrics } from '../Themes'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'

export default class CustomListView extends Component {

  static propTypes= {
    itemFuncName: PropTypes.string,
	onPressItem: PropTypes.func
  }	

  constructor (props) {
	super(props)
	var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
	this.state = {	
	  dataSource: ds.cloneWithRows(this.props.items)
	}
  }

  onPressRow (rowData) {
	if(typeof this.props.onPressItem === 'function') {
	  this.props.onPressItem(rowData.func)
	}
  }

  renderRow (rowData, sectionID, rowID) {
	return (
	  <TouchableHighlight  
		width={this.props.width}
		onPress ={this.onPressRow.bind(this, rowData)}>
		<View>
		  <View style={styles.rowContainer} >
		    <View style={styles.textContainer}>
		      <Text style={styles.title}>{rowData.text}</Text>
		      <Text style={styles.description} numberOfLines={1}>{rowData.func}</Text>
		    </View>
		  </View>
		<View style={styles.separator}/></View>
	  </TouchableHighlight>
	)
  }

  render() {
	return (
	  <ListView 
		top={this.props.top}
		width={this.props.width}
		height={this.props.height}
		dataSource={this.state.dataSource}
		renderRow={this.renderRow.bind(this)}
	  />
	)
  }
}


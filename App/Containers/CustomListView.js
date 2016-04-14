import React, {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} from 'react-native'
import styles from './Styles/CustomListViewStyle'
import CircleIcon from '../Components/CircleIcon'
import { Colors, Images, Metrics } from '../Themes'


export default class CustomListView extends Component {

	constructor(props) {
		super(props)
		var ds = new ListView.DataSource(
			{rowHasChanged: (r1, r2) => r1 !== r2}
		)
		this.state = {	
			dataSource: ds.cloneWithRows(this.props.items)
		}
	}

	componentWillMount() {

	}

	onPressRow(rowData) {
		alert(rowData.func)
	}
	 renderRow(rowData, sectionID, rowID)  {
	 	return (
		  <TouchableHighlight  
		        underlayColor='#ddddd'
		        onPress = {this.onPressRow.bind(this, rowData)}>
		      <View >
		        <View style={styles.rowContainer} >
		          <CircleIcon      
		      		 name={rowData.icon}
		             width={20}	
		             height={20}		      		
		      		 iconSize={Metrics.icons.small}
		      		 color={'blue'}
		      		 />
		          <View  style={styles.textContainer}>
		            <Text style={styles.title}>{rowData.text}</Text>
		            <Text style={styles.description}
		                  numberOfLines={1}>{rowData.func}</Text>
		          </View>
		        </View>
		        <View style={styles.separator}/>
		      </View>
		    </TouchableHighlight>
	    )
	}

	render() {
		return (
		    <ListView 
		    	top={this.props.top}
		    	height={this.props.height}
		      	dataSource={this.state.dataSource}
		      	renderRow={this.renderRow.bind(this)}

		    />
		)
	}
}


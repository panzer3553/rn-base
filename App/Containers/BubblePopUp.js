
import styles from './Styles/BubblePopUpStyle'
import Triangle from '../Components/Triangle'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import I18n from '../I18n/I18n.js'
import { connect } from 'react-redux'
import R from 'ramda'
import Linking from 'Linking'
import config, { homeInfoListData, imageUploadOptions } from '../Config/AppSetting'
import React, {
  StyleSheet,
  View, 
  Component, 
  Text,
  TouchableHighlight,
  TouchableOpacity,
  PropTypes,
  Platform
} from 'react-native'
var ImagePickerManager = require('NativeModules').ImagePickerManager;

export default class BubblePopUp extends React.Component {

  static propTypes = {
   isVisible: PropTypes.bool,
   onClose: PropTypes.func,
  }
  
  constructor (props) {
	super(props)
	this.state = {
	  isVisible: false,
	  itemFuncName: null,
	}
  }

  renderSeparator () {
  	return (<View style={styles.separator}/>)
  }

  renderTriangle (height) {
    return (
	  <View style={styles.triangleContainer}>
	    <Triangle 
	     style={styles.triangleRight}
		 size={30}
		 color={'white'}
		 left={5}
		 top={height} 
	    />
	  </View>
    )
  }

  renderCancelButton (height) {
  	return (
	  <View height={height}> 
	    <TouchableOpacity style={styles.closeButtonWraper} onPress={this.props.onClose}>
	      <View style={styles.closeButton} height={height}>
	        <Text style={styles.closeText}>{I18n.t('cancel')}</Text>
	      </View>
	    </TouchableOpacity>
	  </View>
  	)
  }

  renderTitle(height) {
  	return (
	  <View 
		style={styles.headerContainer}
		elementHeight = {height}>
		<Text style={styles.headerText}>Instruction</Text>
	  </View>
  	)
  }

  renderRow (item, height) {
  	return (
		<View 
		  style={styles.rowContainer} 
		  height={height}>
		  <Icon      
			name={item.icon}	      		
			size={Metrics.icons.small}
			color={'blue'}
		  />
		  <View  style={styles.textContainer}>
		  	<Text style={styles.title}>{item.text}</Text>
			<Text style={styles.description} numberOfLines={1}>{item.func}</Text>
		  </View>
	  	</View>
  	)
  }

  renderList (width, elementHeight) {
  	return (
	  this.props.items.map((item, i) => 	
		<TouchableHighlight  
		  key={i} 
		  width={width}
		  height={elementHeight}
		  onPress ={this.handlePressItem.bind(this, item.func)}
		>
		  <View>
		    { this.renderRow(item, elementHeight) }
		    { this.renderSeparator() }
		  </View>
		</TouchableHighlight>)
  	)
  }

  render () {
    const width  = this.props.elementWidth
    const minimumElementHeight = Metrics.fonts.medium + Metrics.fonts.small // row: title + description
    const elementHeight = (this.props.elementHeight > minimumElementHeight) ? this.props.elementHeight : minimumElementHeight
    const elementCounts = this.props.items.length
    const titleHeight = elementHeight
    const talkBubbleHeight = elementHeight * (elementCounts + 2) + 0.5 * (elementCounts - 2) + elementCounts

	if(this.props.isVisible) {
	  return (
		  <View style={styles.screenContainer}>
			<View 
			  style={styles.bubbleContainer}
			  width={width}
			  marginLeft={10}
			  marginTop={10}>
			  <View 
			    style={styles.squareContainer} 
				height={talkBubbleHeight}
				img={this.props.img}>
				{ this.renderTitle((elementHeight > Metrics.fonts.large) ? elementHeight : Metrics.fonts.large) }
				{ this.renderList() }
				{ this.renderCancelButton(elementHeight) }
			  </View>
			  { this.renderTriangle(elementHeight) }
			</View>
		  </View>
	  )
	}
	  
	return (null)
  }

  handlePressItem (_itemFuncName) {
	switch (_itemFuncName) {
	  case 'showHelpScreen': 
		this.showHelpScreen()
		break
	  case 'showUserLocation': 
		this.showUserLocation()
		break
	  case 'JSONLocation':
		this.showJSONInfo()
		break
	  case 'uploadImage':
		this.uploadImage()
		break
		
	  default:
		alert(_itemFuncName)
		break
	}	
  }

  showHelpScreen () {
	const { navigator } = this.props
	const route = Routes.HelpScreen
	navigator.push(route)
  }

  showUserLocation () {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose()
    }

	const { dispatch } = this.props
	dispatch(Actions.requestLocation())
  }

  showJSONInfo () {
	if (typeof this.props.onClose === 'function') {
       this.props.onClose()
    }

	const { latitude, longitude } = this.props
	const { dispatch } = this.props
	dispatch(Actions.requestJsonByCoords(latitude, longitude))
  }


  uploadImage () {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose()
    }

	ImagePickerManager.showImagePicker(imageUploadOptions, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true}
        const {dispatch} = this.props
        const emergencyObjectId = ''
      	dispatch(Actions.uploadImage(response, 'L6hyfERXEl'))
      }
    })

    if (this.state.image) {

    }

  }

}

const mapStateToProps = (state) => {
  return {
	///
  }
}

export default connect(mapStateToProps)(BubblePopUp)

import React, {
  Component,
  Animated,
  Image,
  ScrollView,
  StatusBarIOS,
  StyleSheet,Text,
  TouchableHighlight,
  TouchableOpacity,
  View, 
  Picker, 
  Modal, 
  ListView, 
  RecyclerViewBackedScrollView, 
  AsyncStorage
} from 'react-native'
import { Colors, Images, Metrics } from '../Themes'
import {Router, Routes, NavigationBar} from '../Navigation/'
import {MKCheckbox, MKColor} from 'react-native-material-kit'
import SearchBar from 'react-native-search-bar'
import Icon from 'react-native-vector-icons/Ionicons'
import ModalPicker from 'react-native-modal-picker'
import { connect } from 'react-redux'
import styles from './Styles/SwiperStyles.js'
import Actions from '../Actions/Creators'
import config, { userGroupListData } from '../Config/AppSetting'
import CityPicker from '../Components/CityPicker'
import Swiper from 'react-native-swiper'
import CheckboxGroups from '../Components/CheckboxGroups'

const STORAGE_KEY_FIRST_LOAD = "FIRST_LOAD"

class Intro extends Component {

  constructor (props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {userGroups: [], city: null, index: 0, groupIds: [], countryCode: null}
  }

  _onMomentumScrollEnd (e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
  }
  
  async pressSkip () {
    const {dispatch} = this.props
    dispatch(Actions.skipSwiper())
    const {groupIds, city, countryCode} = this.state
    dispatch(Actions.saveProfile({userGroups: groupIds, city: city, country: countryCode}))
    try {
      await AsyncStorage.setItem(STORAGE_KEY_FIRST_LOAD, 'false')
      this.props.navigator.push(Routes.TabScreen)
    } catch (error) {
      console.log(error)
    }
  }

  onCheckedItem (value) {
    const { groupIds } = this.state
    console.log('onCheckedItem')

    this.setState({
        groupIds: [...value],
        index: 1
    })
  }

  render () {
    let index = 0

    const {groupIds} = this.state

    return (
      <View style={styles.backgroundFixed}>
        <View style={styles.logo}>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>SmartSOS</Text>
          </View>
        </View>
      <View style={styles.sliders}>
        <Swiper 
          height={Metrics.screenHeight - 125} 
          showsButtons={false} autoplay={false} 
          index={this.state.index} 
          loop={false}
          onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,1)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
          <View style={styles.slide}>
            <View style={styles.logoIconContainer}>
              <Icon name="medkit" size={100} color="white"></Icon>
            </View>
            <Text style={styles.slideText}>SmartSOS will help you with emergency situations</Text>
          </View>
          <View style={styles.slide}>
            <View style={styles.logoIconContainer}>
              <Icon name="android-contacts" size={100} color="white"></Icon>
            </View>
            <View>
              <Text style={styles.slideText}>Looks like you haven't selected a User Group. Please select one.</Text>
            </View>
            <CheckboxGroups 
              items={userGroupListData} 
              onSelect={(value) => this.onCheckedItem(value)}
              checked={groupIds}
              labelColor={'black'}
              iconColor={'black'}
            />
          </View>
          <View style={styles.slide}>
            <View style={styles.logoIconContainer}>
              <Icon name="android-pin" size={100} color="white"></Icon>
            </View>
            <Text style={styles.slideText}>Please select a city where you would receive emergencies notifications</Text>
            <CityPicker onChange={(value) => this.setState({city: value.name, countryCode: value.country, index: 2})}/>
          </View>
        </Swiper>
      </View>
      <View style={styles.btnContainer}>
        <TouchableHighlight style={[styles.btn,{backgroundColor:"#1E72DA"}]} onPress={this.pressSkip.bind(this)}> 
          <Text style={styles.btnText}>NEXT</Text>
        </TouchableHighlight>
      </View>
    </View>
    )
  }
}

export default class SwiperScreen extends Component {

  render () {
    return(
      <View style={styles.container}>
        <Intro/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ////
  }
}

export default connect(mapStateToProps)(Intro)

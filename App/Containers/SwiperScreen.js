import Swiper from 'react-native-swiper'
import React,{
  Component,
  Animated,
  Image,
  ScrollView,
  StatusBarIOS,
  StyleSheet,Text,
  TouchableHighlight,
  View, 
  Picker, 
  Modal, 
  ListView, 
  RecyclerViewBackedScrollView, 
  AsyncStorage,
} from 'react-native'
import SearchBar from 'react-native-search-bar'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import ModalPicker from 'react-native-modal-picker'
import { connect } from 'react-redux'
import styles from './Styles/SwiperStyles.js'
import Actions from '../Actions/Creators'
import {Router, Routes, NavigationBar} from '../Navigation/'
import config from '../Config/AppSetting'
import CityPicker from '../Components/CityPicker'
import {MKCheckbox, MKColor} from 'react-native-material-kit' 
const STORAGE_KEY_FIRST_LOAD = "FIRST_LOAD"

class Intro extends Component{

  _onMomentumScrollEnd(e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
  }

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {userGroups: [], city: null, index: 0, groupIds: [], countryCode: null}
  }
  
  async pressSkip(){
    const {dispatch} = this.props
    dispatch(Actions.skipSwiper())
    const {groupIds, city, countryCode} = this.state
    dispatch(Actions.saveProfile({groups: groupIds, 
                                  city: city, 
                                  country: countryCode,
        }))
    try {
      await AsyncStorage.setItem(STORAGE_KEY_FIRST_LOAD, 'false')
      this.props.navigator.push(Routes.AllComponentsScreen)
    } catch (error) {
      console.log(error)
    }
  }

  _onCheckedItem (item) {
    let tempUserGroupArr  = [...this.state.userGroups]
    let tempGroupIdArr    = [...this.state.groupIds]
    console.log('GROUPS: BEFORE ' + tempGroupIdArr + '__LENGTH ' + tempGroupIdArr.length)
    let found = -1
    for (let i = 0; i < tempGroupIdArr.length; i++) {

      if (this.state.groupIds[i] === item.groupId ) {

          this.setState({
            userGroups: [...tempUserGroupArr.filter((_, idx) => idx !== i)],
            groupIds: [...tempGroupIdArr.filter((_, idx) => idx !== i)],
            index: 1,
          })
          found = i
          console.log('UNCHECK ' + item.groupId)
          break
      }
    }

    if (found == -1) {

      this.setState({
        userGroups: [...tempUserGroupArr, item.label],
        groupIds: [...tempGroupIdArr, item.groupId],
        index: 1,
      })
      console.log('CHECK ' + item.groupId)
    }
  }

  render(){
    let index = 0;
    const data = [
      //{ key: index++, section: true, label: 'Users group' },
      { key: index++, label: 'Police station', groupId: 'policeStation'},
      { key: index++, label: 'Fire station', groupId: 'fireStation'},
      { key: index++, label: 'Ambulance', groupId: 'ambulance'},
      { key: index++, label: 'Medical User', groupId: 'medicalUser' },
      { key: index++, label: 'Militarian User', groupId: 'militarianUser' },
      { key: index++, label: 'Volunteer', groupId: 'volunteer' },
      { key: index++, label: 'Normal', groupId: 'normal' },
    ]
    return (
    <View style={styles.backgroundFixed}>
        <View style={styles.logo}>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>SmartSOS</Text>
          </View>
        </View>
        <View style={styles.sliders}>
          <Swiper height={Metrics.screenHeight-125} showsButtons={false} autoplay={false} index={this.state.index} loop={false}
            onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,1)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
              <View style={styles.slide}>
                <Text style={styles.slideTextTitle}>Welcome</Text>
                <Text style={styles.slideText}>SmartSOS will help you with emergency situations</Text>
              </View>
              <View style={styles.slide}>
                <View style={styles.logoIconContainer}>
                  <Icon name="android-contacts" size={100} color="white"></Icon>
                </View>
                <Text style={styles.slideText}>Looks like you haven't selected a User Group. Please select:</Text>
              <View>
                  {data.map((item, i) =>
                 <TouchableHighlight key ={i} >
                    <View style={styles.checkboxRow}>
                      <MKCheckbox
                         checked={false}
                         style={styles.checkbox}
                         onCheckedChange={(event) => this._onCheckedItem(item)}
                      />
                      <Text 
                        numberOfLines={1}
                        style={styles.checkboxText}
                      >
                        {item.label}
                      </Text>
                    </View>
                 </TouchableHighlight>)}
              </View>
              </View>
              <View style={styles.slide}>
                <View style={styles.logoIconContainer}>
                  <Icon name="android-pin" size={100} color="white"></Icon>
                </View>
                <Text style={styles.slideText}>Please select a city where you would receive emergencies notifications</Text>
                <CityPicker
                  onChange={(value) => this.setState({city: value.name, countryCode: value.country, index: 2})}
                 />
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

export default class SwiperScreen extends Component{

  render() {
    return(
      <View style={styles.container}>
        <Intro></Intro>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(Intro)

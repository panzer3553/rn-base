import Swiper from 'react-native-swiper'
import React,{Component,Animated,Image,ScrollView,StatusBarIOS,StyleSheet,Text,TouchableHighlight,View, Picker} from 'react-native'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'

var styles = StyleSheet.create({
    container:{
    height:Metrics.screenHeight,
    width:Metrics.screenWidth
  },
  backgroundFixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#F67C01'
  },
  sliders: {
    position: 'absolute',
    width: Metrics.screenWidth,
    bottom: 70,
    left:0
  },
  slide: {
    flex: 1,
    height: Metrics.screenHeight -200,
    alignItems: 'center',
    paddingBottom:50
  },
  slideText:{
    color: "#fff",
    textAlign:"center"
  },
  slideTextTitle:{
    color: "#fff",
    textAlign:"center",
    fontWeight:"700"
  },
  logo:{
    alignItems:"center",
    position:"absolute",
    width: Metrics.screenWidth,
    top: 50,
    left: 0,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  logoText:{
    color:"#fff",
    textAlign:"left",
    fontSize: 35,
    fontWeight:"700",
    backgroundColor:"transparent",
  },
  logoIconContainer:{
    backgroundColor:"transparent",
    paddingRight:5,
    marginTop:5,
    marginBottom: 40
  },
  logoTextContainer:{
    backgroundColor:"transparent"
  },
  btnContainer:{
    position:"absolute",
    width: Metrics.screenWidth,
    bottom: 0,
    left: 0,
    height: 40,
    flexDirection: "row"
  },
  btn:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  btnText:{
    color:"#fff",
    fontWeight:"500",
    fontSize:14
  },
  pickerContainer: {
    marginTop: 16,
    width: Metrics.screenWidth * 2 / 3,
    backgroundColor: Colors.snow,
    padding: 4,
    paddingLeft: 8,
    flexDirection: "row"
  },
  dropDownIcon: {
    position: 'absolute',
    right: 8  
  }
})

class Intro extends Component{
  _onMomentumScrollEnd(e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
    console.log(state, context.state)
  }

  render(){
    return (
    <View style={styles.backgroundFixed}>
        <View style={styles.logo}>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>SmartSOS</Text>
          </View>
        </View>
        <View style={styles.sliders}>
          <Swiper height={Metrics.screenHeight-200} showsButtons={false} autoplay={false}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,1)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
              <View style={styles.slide}>
                <Text style={styles.slideTextTitle}>Welcome</Text>
                <Text style={styles.slideText}>Sign up for free music on your phone,tablet</Text>
                <Text style={styles.slideText}>and computer.</Text>
              </View>
              <View style={styles.slide}>
                <View style={styles.logoIconContainer}>
                  <Icon name="android-contacts" size={100} color="white"></Icon>
                </View>
                <Text style={styles.slideText}>Looks like you haven't selected a User Group. Please select one.</Text>
                <View style={styles.pickerContainer}>
                  <Text>Select a group</Text>
                  <Icon name="ios-arrow-down" size={18} color="black" style={styles.dropDownIcon}></Icon>
                </View>
              </View>
              <View style={styles.slide}>
                <View style={styles.logoIconContainer}>
                  <Icon name="android-pin" size={100} color="white"></Icon>
                </View>
                <Text style={styles.slideText}>Please select a city where you would receive emergencies notifications</Text>
                <View style={styles.pickerContainer}>
                  <Text>Select a city</Text>
                  <Icon name="ios-arrow-down" size={18} color="black" style={styles.dropDownIcon}></Icon>
                </View>
              </View>
          </Swiper>
        </View>
        <View style={styles.btnContainer}>
          <TouchableHighlight style={[styles.btn,{backgroundColor:"#201437"}]}>
            <Text style={styles.btnText}>LOG IN</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.btn,{backgroundColor:"#29b859"}]}>
            <Text style={styles.btnText}>SIGN UP</Text>
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


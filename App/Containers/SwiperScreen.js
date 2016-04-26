import Swiper from 'react-native-swiper'
import React,{Component,Animated,Image,ScrollView,StatusBarIOS,StyleSheet,Text,TouchableHighlight,View, Picker, Modal, ListView, RecyclerViewBackedScrollView} from 'react-native'
import { Colors, Images, Metrics } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import ModalPicker from 'react-native-modal-picker'

var styles = StyleSheet.create({
    containerModal: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.snow
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
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
  },
    modalButton: {
    marginTop: 10,
  },
    separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
    row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
    text: {
      flex: 1,
    }
})

const cities = [{ "name" : "An Giang" , "cityCode" : 8476 },
{ "name" : "Bà Rịa - Vũng Tàu" , "cityCode" : 8464 },
{ "name" : "Bắc Giang" , "cityCode" : 84240 },
{ "name" : "Bắc Kạn" , "cityCode" : 84281 },
{ "name" : "Bạc Liêu" , "cityCode" : 84781 },
{ "name" : "Bắc Ninh" , "cityCode" : 84241 },
{ "name" : "Bến Tre" , "cityCode" : 8475 },
{ "name" : "Bình Định" , "cityCode" : 8456 },
{ "name" : "Bình Dương" , "cityCode" : 84650 },
{ "name" : "Bình Phước" , "cityCode" : 84651 },
{ "name" : "Bình Thuận" , "cityCode" : 8462 },
{ "name" : "Cà Mau" , "cityCode" : 84780 },
{ "name" : "Cần Thơ" , "cityCode" : 84710 },
{ "name" : "Cao Bằng" , "cityCode" : 8426 },
{ "name" : "Đà Nẵng" , "cityCode" : 84511 },
{ "name" : "Đắk Lắk" , "cityCode" : 84500 },
{ "name" : "Đắk Nông" , "cityCode" : 84501 },
{ "name" : "Điện Biên" , "cityCode" : 84230 },
{ "name" : "Đồng Nai" , "cityCode" : 8461 },
{ "name" : "Đồng Tháp" , "cityCode" : 8467 },
{ "name" : "Gia Lai" , "cityCode" : 8459 },
{ "name" : "Hà Giang" , "cityCode" : 84219 },
{ "name" : "Hà Nam" , "cityCode" : 84351 },
{ "name" : "Hà Nội" , "cityCode" : 844   },
{ "name" : "Hà Tĩnh" , "cityCode" : 8439 },
{ "name" : "Hải Dương" , "cityCode" : 84320 },
{ "name" : "Hải Phỏng" , "cityCode" : 8431 },
{ "name" : "Hậu Giang" , "cityCode" : 84711 },
{ "name" : "Hòa Bình" , "cityCode" : 84218 },
{ "name" : "Hồ Chí Minh" , "cityCode" : 848  },
{ "name" : "Hưng Yên" , "cityCode" : 84321 },
{ "name" : "Khánh Hoà" , "cityCode" : 8458 },
{ "name" : "Kiên Giang" , "cityCode" : 8477 },
{ "name" : "Kon Tum" , "cityCode" : 8460 },
{ "name" : "Lai Châu" , "cityCode" : 84231 },
{ "name" : "Lâm Đồng" , "cityCode" : 8463 },
{ "name" : "Lạng Sơn" , "cityCode" : 8425 },
{ "name" : "Lào Cai" , "cityCode" : 8420 },
{ "name" : "Long An" , "cityCode" : 8472 },
{ "name" : "Nam Định" , "cityCode" : 84350 },
{ "name" : "Nghệ An" , "cityCode" : 8438 },
{ "name" : "Ninh Bình" , "cityCode" : 8430 },
{ "name" : "Ninh Thuận" , "cityCode" : 8468 },
{ "name" : "Phú Thọ" , "cityCode" : 84210 },
{ "name" : "Phú Yên" , "cityCode" : 8457 },
{ "name" : "Quảng Bình" , "cityCode" : 8452 },
{ "name" : "Quảng Nam" , "cityCode" : 84510 },
{ "name" : "Quảng Ngãi" , "cityCode" : 8455 },
{ "name" : "Quảng Ninh" , "cityCode" : 8433 },
{ "name" : "Quảng Trị" , "cityCode" : 8453 },
{ "name" : "Sóc Trăng" , "cityCode" : 8479 },
{ "name" : "Sơn La" , "cityCode" : 8422 },
{ "name" : "Tây Ninh" , "cityCode" : 8466 },
{ "name" : "Thái Bình" , "cityCode" : 8436 },
{ "name" : "Thái Nguyên" , "cityCode" : 84280 },
{ "name" : "Thanh Hoá" , "cityCode" : 8437 },
{ "name" : "Thừa Thiên - Huế" , "cityCode" : 8454 },
{ "name" : "Tiền Giang" , "cityCode" : 8473 },
{ "name" : "Trà Vinh" , "cityCode" : 8474 },
{ "name" : "Tuyên Quang" , "cityCode" : 8427 },
{ "name" : "Vĩnh Long" , "cityCode" : 8470 },
{ "name" : "Vĩnh Phúc" , "cityCode" : 84211 },
{ "name" : "Yên Bái" , "cityCode" : 8429 }]

class Intro extends Component{
  _onMomentumScrollEnd(e, state, context) {
    // you can get `state` and `this`(ref to swiper's context) from params
    console.log(state, context.state)
  }

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {userGroups: "Select a group", dataSource: ds.cloneWithRows(cities.map((city) => city.name)), modalVisible: false,
            city: 'Select a city'}
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }
  

  renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={() => {this.pressRow(rowData)}} key={rowID}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  pressRow(rowData){
    this.setState({city: rowData})
    this.setModalVisible(false)
  }

  render(){
    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Users group' },
      { key: index++, label: 'Police station' },
      { key: index++, label: 'Fire station' },
      { key: index++, label: 'Ambulance' },
      { key: index++, label: 'Medical User' },
      { key: index++, label: 'Militarian User' },
      { key: index++, label: 'Volunteer' },
      { key: index++, label: 'Other' },
    ]
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
                <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ this.setState({userGroups:option.label})}}>
                <View style={styles.pickerContainer}>
                  <Text>{this.state.userGroups}</Text>
                  <Icon name="ios-arrow-down" size={18} color="black" style={styles.dropDownIcon}></Icon>
                </View>
                </ModalPicker>
              </View>
              <View style={styles.slide}>
                <View style={styles.logoIconContainer}>
                  <Icon name="android-pin" size={100} color="white"></Icon>
                </View>
                <Text style={styles.slideText}>Please select a city where you would receive emergencies notifications</Text>
              <Modal
                  animated={true}
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {this.setModalVisible(false)}}
                  >
                  <View style={styles.containerModal}>
                    <ListView
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)}
                      renderSeparator={(sectionID, rowID) => <View style={styles.separator} />}
                      renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                    />
                  </View>
                </Modal>
                <View style={styles.pickerContainer} onPress={this.setModalVisible.bind(this, true)}>
                  <Text onPress={this.setModalVisible.bind(this, true)}>{this.state.city}</Text>
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


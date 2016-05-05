import React, {Modal, ScrollView, View, TouchableOpacity, Text, StyleSheet, Component} from 'react-native'
import cities from '../Config/CitiesData'
import SearchBar from 'react-native-search-bar'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics, Base } from '../Themes/'
import fuzzy from 'fuzzy'

export default class CityPicker extends Component {
  
  constructor(props){
    super(props)
    this.state ={
      modalVisible: false,
      city: null,
      cities: cities.map((city) => city.name)
    }
  }

  _renderCity(city, index) {
    return (
      <TouchableOpacity
        key={index}
        style={styles.list}
        onPress={()=> this._onSelect(city, index)}
        activeOpacity={0.99}>
        {this._renderCityDetail(city)}
    </TouchableOpacity>);
  }

  _renderCityDetail(city) {
    return (
      <View>
          <Text>
            {city}
          </Text>
      </View>)
  }

  componentDidMount () {
    if(this.props.value){
      this.setState({city: this.props.value})
    }
  }

  _onSelect(city, index) {

    this.setState({
      modalVisible: false,
      city: city
    })

    if (this.props.onChange) {
      this.props.onChange({
        name: city,
        country: cities[index].countryCode
      });
    }
  }

  _onChangeText(text) {
    let results = fuzzy.filter(text, this.states.cities)
    let matches = results.map(function(el) { return el.string; })
    console.log(matches)
    this.setState({
      cities: matches,
    })
  }

  render(){
    return(
    <View>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={()=> this.setState({modalVisible: true})}
        activeOpacity={0.7}
      >
      <Icon name='ios-home-outline'
          size={Metrics.icons.x_small}
          style={{color: Colors.formTextColor}}/>
      <Text style={styles.label}>{this.state.city || "Select a city"}</Text>
      <Icon name="ios-arrow-right" size={Metrics.icons.x_small} color="black" style={[styles.dropDownIcon, {color: Colors.formTextColor}]}></Icon>
      </TouchableOpacity>      

      <Modal
        animated={true}
        transparent={false}
        visible={this.state.modalVisible}>
      <ScrollView
        ref={(scrollView) => { this._scrollView = scrollView; }}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollsToTop={true}
        contentOffset={{y:-30}}>
        <SearchBar
        ref='searchBar'
        placeholder='Search'
        onChangeText={(text)=> this._onChangeText.bind(this, text)}
        />
        {this.state.cities.map((city, index) => this._renderCity(city, index))}
      </ScrollView>
      </Modal>
      </View>
    )}
}

var styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
  },
  list:{
    height:40,
    paddingLeft:20,
    justifyContent:"center",
    borderBottomColor:"#aaa",
    borderBottomWidth: 0.5
  },
  pickerContainer: {
    backgroundColor: Colors.snow,
    paddingLeft: 16,
    paddingBottom: 8,
    flexDirection: "row",
    borderBottomColor:"#999",
    borderBottomWidth: 1

  },

  dropDownIcon: {
    position: 'absolute',
    right: 8  
  },
  label: {
    fontSize: 16,
    marginTop: 4,
    marginLeft: 12,
  }
});

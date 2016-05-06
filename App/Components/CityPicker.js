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
    this._onChangeText = this._onChangeText.bind(this)
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
    let results = fuzzy.filter(text, cities.map((city) => city.name))
    let matches = results.map(function(el) { return el.string; })
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
      <Text>{this.state.city || "Select a city"}</Text>
      <Icon name="ios-arrow-down" size={18} color="black" style={styles.dropDownIcon}></Icon>
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
        onChangeText={(text) => {this._onChangeText(text)}}
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

});

import React,{
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  View,
  TextInput
} from 'react-native'
import fuzzy from 'fuzzy'

export default class extends Component{
  constructor() {
    super();

    const stateData = {"AL": "Alabama","AK": "Alaska","AS": "American Samoa","AZ": "Arizona","AR": "Arkansas","CA": "California","CO": "Colorado","CT": "Connecticut","DE": "Delaware","DC": "District Of Columbia","FM": "Federated States Of Micronesia","FL": "Florida","GA": "Georgia","GU": "Guam","HI": "Hawaii","ID": "Idaho","IL": "Illinois","IN": "Indiana","IA": "Iowa","KS": "Kansas","KY": "Kentucky","LA": "Louisiana","ME": "Maine","MH": "Marshall Islands","MD": "Maryland","MA": "Massachusetts","MI": "Michigan","MN": "Minnesota","MS": "Mississippi","MO": "Missouri","MT": "Montana","NE": "Nebraska","NV": "Nevada","NH": "New Hampshire","NJ": "New Jersey","NM": "New Mexico","NY": "New York","NC": "North Carolina","ND": "North Dakota","MP": "Northern Mariana Islands","OH": "Ohio","OK": "Oklahoma","OR": "Oregon","PW": "Palau","PA": "Pennsylvania","PR": "Puerto Rico","RI": "Rhode Island","SC": "South Carolina","SD": "South Dakota","TN": "Tennessee","TX": "Texas","UT": "Utah","VT": "Vermont","VI": "Virgin Islands","VA": "Virginia","WA": "Washington","WV": "West Virginia","WI": "Wisconsin","WY": "Wyoming"}
    this.states = [];
    for (let key in stateData) {
      if (stateData.hasOwnProperty(key)) {
        this.states.push(stateData[key])
      }
    }

    this.state = {
      states: this.states,
    };
  }

  _onChangeText(text) {
    let results = fuzzy.filter(text, this.states)
    let matches = results.map(function(el) { return el.string; })
    this.setState({
      states: matches,
    })
  }

  render() {
    const statesList = this.state.states.map(function(elem, index) {
      return <View key={index} style={styles.list}><Text style={styles.text}>{elem}</Text></View>
    })

    return(
      <ScrollView style={styles.container}>
        <TextInput
          ref='searchBar'
          placeholder='Search a city'
          style={{height: 60, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text)=> this._onChangeText(text)}
        />
        {statesList}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    marginTop: 60
  },
  list:{
    height:40,
    paddingLeft:20,
    justifyContent:"center",
    borderBottomColor:"#aaa",
    borderBottomWidth: 1
  }
})

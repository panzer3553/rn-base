// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { View, ScrollView, Text, StyleSheet, Alert, PropTypes } from 'react-native'
import { connect } from 'react-redux'
import NavigationBar from '../Components/NavigationBar' 

export default class ExampleView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  constructor (props) {
    super(props);
  
    this.state = {}
    this.hello = this.hello.bind(this)
  }

  hello () {
    Alert.alert("hello")
  }

  render () {
    let leftItem={layout: 'icon', title: 'Save', icon: 'android-arrow-back', onPress: this.hello}
    return (
      <View style={styles.container}>
        <NavigationBar
          title= "Hello"
          style={{backgroundColor: 'blue'}}
          leftItem={leftItem}/>
        <Text> Hello World</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})

export default connect()(ExampleView)

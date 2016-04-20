import React from 'react-native'
import t from 'tcomb-form-native'
var { AppRegistry, StyleSheet, Text, View, TouchableHighlight, ScrollView, Alert } = React;
import { connect } from 'react-redux'

import Actions from '../Actions/Creators'

var Form = t.form.Form

// here we are: define your domain model
var Person = t.struct({
  firstName: t.String,              // a required string
  lastName: t.String,  // an optional string
  birthday: t.Date,
  email: t.String,
  mobile: t.Number,
  address: t.String                // a required number
})

var options = {
    fields: {
    name: {
      // name field configuration here..
    },
    surname: {
      // surname field configuration here..
    },
    birthday: {
      config: {
        format: (date) =>  new Date(date).toISOString().slice(0, 10)
    }
  }
}
}

export default class ProfileScreen extends React.Component{

  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue()
    console.log(value)
    const { dispatch } = this.props
    dispatch(Actions.saveProfile(value))
  }

  render(){
    return (
      <ScrollView style={styles.container}>
        <Form
          ref="form"
          type={Person}
          options={options}
          value={this.props.profileData.profile}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    profileData: state.profileData
  }
}

export default connect(mapStateToProps)(ProfileScreen)

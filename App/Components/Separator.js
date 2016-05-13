import React from 'react-native'
import formStyles from './Styles/FieldStyle'
import { View, Text} from 'react-native'

export default class Separator extends React.Component{

  render(){
     return(
      <View style={formStyles.separatorContainer}>
        {
          (this.props.label)?
          <Text style={formStyles.separator}>{this.props.label.toUpperCase()}</Text>
          : null
        }
      </View>
    )
  }
}

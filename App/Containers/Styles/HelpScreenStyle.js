import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 70,
    backgroundColor: Colors.deepOcean
  },
  form: {
    backgroundColor: Colors.background,
    margin: 10,
    borderRadius: 4
  },  
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})

import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'

export default StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: Metrics.fonts.medium,
    fontWeight: 'bold',
    color: '#48BBEC',
    alignItems: 'center' 
  },
  description: {
    fontSize: Metrics.fonts.small,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center' ,
    borderRadius: 10
  },
  icon: {
    width: Metrics.icons.small,
    height: Metrics.icons.small,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
})
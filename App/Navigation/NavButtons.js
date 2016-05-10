import React, { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/NavigationStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'
import I18n from '../I18n/I18n.js'

export default {

  backButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Icon name='ios-arrow-back'
          size={Metrics.icons.large}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Icon 
          name='navicon'
          size={Metrics.icons.large}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  forgotPasswordButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Text style={styles.navButtonText}>{I18n.t('forgotPassword')}</Text>
      </TouchableOpacity>
    )
  },

  saveButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Text style={styles.navButtonText}>{I18n.t('save')}</Text>
      </TouchableOpacity>
    )
  }

}

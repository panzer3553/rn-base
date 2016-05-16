import React, { TouchableOpacity, Text, Platform } from 'react-native'
import styles from './Styles/NavigationStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'
import I18n from '../I18n/I18n.js'

export default {

  backButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Icon name={Platform.OS === 'android' ? 'android-arrow-back' : 'ios-arrow-back'}
          size={30}
          color={Colors.snow}
          style={[styles.navButtonLeft, styles.backButton]}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Icon name={'navicon'}
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
  }
  
}

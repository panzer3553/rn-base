import React, { TouchableOpacity, Text, Platform } from 'react-native'
import styles from './Styles/NavigationStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'
import I18n from '../I18n/I18n.js'
const isAndroid = Platform.OS === 'android'

export default {

  backButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Icon name={isAndroid ? 'android-arrow-back' : 'ios-arrow-back'}
          size={isAndroid ? Metrics.icons.x_small : Metrics.icons.medium}
          color={Colors.snow}
          style={[styles.navButtonLeft, isAndroid && styles.navButtonLeftAndroid]}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Icon name={isAndroid ? 'android-menu' : 'navicon'}
          size={isAndroid ? Metrics.icons.x_small : Metrics.icons.medium}
          color={Colors.snow}
          style={[styles.navButtonLeft, isAndroid && styles.navButtonLeftAndroid]}
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
        <Text style={[styles.navButtonText, isAndroid && styles.navButtonTextAndroid]}>{I18n.t('save')}</Text>
      </TouchableOpacity>
    )
  }

}

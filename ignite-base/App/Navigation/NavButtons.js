<<<<<<< HEAD
import React from 'react'
import { TouchableOpacity, Text, Platform } from 'react-native'
import styles from './Styles/NavigationStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'
// I18n
=======
import React, { TouchableOpacity, Text, Platform } from 'react-native'
import styles from './Styles/NavigationStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Metrics } from '../Themes'
>>>>>>> 3713b55e22ddbab60a1b1b6a28851ca06c445d65
import I18n from '../I18n/I18n.js'
const isAndroid = Platform.OS === 'android'

export default {

  backButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
<<<<<<< HEAD
        <Icon name={isAndroid ? 'android-arrow-back' : 'ios-arrow-back'}
          size={isAndroid ? Metrics.icons.android_icon : Metrics.icons.medium}
          color={Colors.snow}
          style={[styles.navButtonLeft, isAndroid && styles.navButtonLeftAndroid]}
=======
        <Icon name={Platform.OS === 'android' ? 'android-arrow-back' : 'ios-arrow-back'}
          size={30}
          color={Colors.snow}
          style={[styles.navButtonLeft, styles.backButton]}
>>>>>>> 3713b55e22ddbab60a1b1b6a28851ca06c445d65
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
<<<<<<< HEAD
        <Icon name={isAndroid ? 'android-menu' : 'navicon'}
          size={isAndroid ? Metrics.icons.android_icon : Metrics.icons.medium}
=======
        <Icon name={'navicon'}
          size={Metrics.icons.large}
>>>>>>> 3713b55e22ddbab60a1b1b6a28851ca06c445d65
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

  doneButton (onPressFunction) {
    return (
      <TouchableOpacity onPress={onPressFunction}>
        <Text style={[styles.navButtonText, isAndroid && styles.navButtonTextAndroid]}>{I18n.t('done')}</Text>
      </TouchableOpacity>
    )
  }
  
}

import React, {Platform} from 'react-native'

const { width, height } = React.Dimensions.get('window')

// Used via Metrics.baseMargin
// or Metrics.fonts.tiny
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  baseMargin: 10,
  smallMargin: 5,
  horizontalLineHeight: 1,
  screenWidth: width + 3,// React.Dimensions.get('window') width is wrong , padding -3 pixel -> so plus 3 
  screenHeight: height,
  navBarHeight: Platform.OS === 'android' ? 56 : 64,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    android_icon: 24,
    x_small: 25,
    medium: 30,
    large: 40,
    xl: 60
  },
  fonts: {
    title: 40,
    input: 18,
    regular: 17,
    medium: 14,
    small: 12,
    tiny: 8.5,
    large: 24,
  },
  button:{
    large: 80,
    medium: 60,
  },
}

export default metrics

import React from 'react-native'

const { width, height } = React.Dimensions.get('window')

// Used via Metrics.baseMargin
// or Metrics.fonts.tiny
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  baseMargin: 10,
  smallMargin: 5,
  horizontalLineHeight: 1,
  screenWidth: width,
  screenHeight: height,
  navBarHeight: 64,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
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
  }
}

export default metrics

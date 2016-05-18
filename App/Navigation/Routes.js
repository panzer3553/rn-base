import { Transitions } from '../Themes/'
import I18n from '../I18n/I18n.js'
import { Navigator } from 'react-native'
export default new class Routes {

  // Here are the "Containers" in our app (e.g. Screens).
  //
  // These routes are implemented as getter functions
  // because I like the simple calling notation, but
  // they're lazily evaluated to prevent recursion
  // when the screens themselves use this Routes file.

  get SwiperScreen () {
    return {
      component: require('../Containers/SwiperScreen').default,
      customConfiguration: Transitions.modal,
      displayNavBar: false
    }
  }
  get CameraScreen () {
    return {
      customConfiguration: Navigator.SceneConfigs.PushFromRight ,
      component: require('../Containers/CameraScreen').default,
      leftButton: 'BACK',
      rightButton: 'SAVE',
      displayNavBar: true
    }
  }
  get GalleryScreen () {
    return {
      customConfiguration: Navigator.SceneConfigs.PushFromRight ,
      component: require('../Containers/CameraGallery').default,
      leftButton: 'BACK',
      displayNavBar: true
    }
  }

  get TabScreen () {
    return {
      customConfiguration: Transitions.modal,
      component: require('../Containers/TabView').default,
    }
  }

  get HelpScreen () {
    return {
      customConfiguration: Navigator.SceneConfigs.PushFromRight ,
      component: require('../Containers/HelpScreen').default,
      leftButton: 'BACK',
      displayNavBar: true
    }
  }

  get ImageCollectionScreen () {
    return {
      customConfiguration: Navigator.SceneConfigs.PushFromRight ,
      component: require('../Containers/ImageCollectionScreen').default,
      leftButton: 'BACK',
      displayNavBar: true
    }
  }
  
}
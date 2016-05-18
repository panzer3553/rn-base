import { Transitions } from '../Themes/'

// I18n
import I18n from '../I18n/I18n.js'

export default new class Routes {

  // Here are the "Containers" in our app (e.g. Screens).
  //
  // These routes are implemented as getter functions
  // because I like the simple calling notation, but
  // they're lazily evaluated to prevent recursion
  // when the screens themselves use this Routes file.

  get SwiperScreen () {
    return {
      title: I18n.t('about'),
      component: require('../Containers/SwiperScreen').default,
      customConfiguration: Transitions.modal,
      displayNavBar: false
    }
  }
  get CameraScreen () {
    return {
      title: I18n.t('camera'),
      customConfiguration: Transitions.modal,
      component: require('../Containers/CameraScreen').default,
      leftButton: 'BACK',
      rightButton: 'SAVE',
      displayNavBar: true
    }
  }
  get GalleryScreen () {
    return {
      title: I18n.t('camera'),
      customConfiguration: Transitions.modal,
      component: require('../Containers/EmergencyScreen').default,
      leftButton: 'BACK',
      displayNavBar: true
    }
  }

  get TabScreen () {
    return {
      title: I18n.t('camera'),
      customConfiguration: Transitions.modal,
      component: require('../Containers/TabView').default,
    }
  }
}
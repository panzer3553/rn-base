import { Transitions } from '../Themes/'
import I18n from '../I18n/I18n.js'

export default new class Routes {

  // Here are the "Containers" in our app (e.g. Screens).
  //
  // These routes are implemented as getter functions
  // because I like the simple calling notation, but
  // they're lazily evaluated to prevent recursion
  // when the screens themselves use this Routes file.

  get HomeScreen () {
    return {
      title: I18n.t('home'),
      component: require('../Containers/HomeScreen').default,
      leftButton: 'HAMBURGER',
      displayNavBar: true
    }
  }

  get ProfileScreen () {
    return {
      title: I18n.t('profile'),
      component: require('../Containers/ProfileScreen').default,
      rightButton: 'SAVE',
      leftButton: 'HAMBURGER',
      displayNavBar: true
    }
  }

  get HelpScreen () {
    return {
      title: I18n.t('helpInfo'),
      component: require('../Containers/HelpScreen').default,
      customConfiguration: Transitions.modal,
      leftButton: 'BACK',
      displayNavBar: true
    }
  }

  get EmergencyScreen () {
    return {
      title: I18n.t('helpInfo'),
      component: require('../Containers/Developing').default,
      customConfiguration: Transitions.modal,
      leftButton: 'HAMBURGER',
    }
  }

  get RecommendScreen () {
    return {
      title: I18n.t('recommend'),
      component: require('../Containers/Developing').default,
      customConfiguration: Transitions.modal,
      leftButton: 'HAMBURGER',
      displayNavBar: true
    }
  }

  get SendScreen () {
    return {
      title: I18n.t('emergency'),
      component: require('../Containers/Developing').default,
      customConfiguration: Transitions.modal,
      leftButton: 'HAMBURGER',
      displayNavBar: true
    }
  }  

  get FeedbackScreen () {
    return {
      title: I18n.t('feedback'),
      component: require('../Containers/Developing').default,
      customConfiguration: Transitions.modal,
      leftButton: 'HAMBURGER',
      displayNavBar: true
    }
  }

  get AboutScreen () {
    return {
      title: I18n.t('about'),
      component: require('../Containers/Developing').default,
      customConfiguration: Transitions.modal,
      leftButton: 'HAMBURGER',
      displayNavBar: true
    }
  }

  get SwiperScreen (){
    return {
      title: "Swiper",
      component: require('../Containers/SwiperScreen').default,
      displayNavBar: false
    }
  }
  
}

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

  get AllComponentsScreen () {
    return {
      title: I18n.t('home'),
      component: require('../Containers/AllComponentsScreen').default,
      leftButton: 'HAMBURGER'
    }
  }

    get ProfileScreen () {
    return {
      title: I18n.t('profile'),
      component: require('../Containers/ProfileScreen.android.js').default,
      rightButton: 'SAVE',
      leftButton: 'HAMBURGER',
    }
  }

  get HelpScreen () {
    return {
      title: I18n.t('helpInfo'),
      component: require('../Containers/HelpScreen').default,
      customConfiguration: Transitions.modal,
      leftButton: 'BACK'
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
    }
  }
  get SendScreen () {
    return {
      title: I18n.t('emergency'),
      component: require('../Containers/Developing').default,
      customConfiguration: Transitions.modal,
      leftButton: 'HAMBURGER',
    }
  }  
  get FeedbackScreen () {
    return {
      title: I18n.t('feedback'),
      component: require('../Containers/Developing').default,
      customConfiguration: Transitions.modal,
      leftButton: 'HAMBURGER',
    }
  }
  get AboutScreen () {
    return {
      title: I18n.t('about'),
      component: require('../Containers/Developing').default,
      customConfiguration: Transitions.modal,
      leftButton: 'HAMBURGER',
    }
  }

}

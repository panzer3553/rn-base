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
      component: require('../Containers/ProfileScreen').default,
      rightButton: 'SAVE',
      leftButton: 'HAMBURGER',
    }
  }

    get EmergencyScreen () {
    return {
      title: I18n.t('emergency'),
      component: require('../Containers/Developing').default,
      leftButton: 'HAMBURGER'
    }
  }

    get RecommendScreen () {
    return {
      title: I18n.t('recommend'),
      component: require('../Containers/Developing').default,
      leftButton: 'HAMBURGER'
    }
  }

    get FeedbackScreen () {
    return {
      title: I18n.t('feedback'),
      component: require('../Containers/Developing').default,
      leftButton: 'HAMBURGER'
    }
  }

    get AboutScreen () {
    return {
      title: I18n.t('about'),
      component: require('../Containers/Developing').default,
      leftButton: 'HAMBURGER'
    }
  }
}

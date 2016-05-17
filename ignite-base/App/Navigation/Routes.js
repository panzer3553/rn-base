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

  get PresentationScreen () {
    return {
      title: I18n.t('welcome'),
      component: require('../Containers/PresentationScreen').default,
      leftButton: 'HAMBURGER'
    }
  }

  get AllComponentsScreen () {
    return {
      title: I18n.t('componentExamples'),
      component: require('../Containers/AllComponentsScreen').default,
      leftButton: 'BACK'
    }
  }

  get UsageExamplesScreen () {
    return {
      title: I18n.t('usageExamples'),
      component: require('../Containers/UsageExamplesScreen').default,
      leftButton: 'BACK'
    }
  }

  get LoginScreen () {
    return {
      title: I18n.t('login'),
      component: require('../Containers/LoginScreen').default,
      customConfiguration: Transitions.modal,
      rightButton: 'FORGOT_PASSWORD',
      leftButton: 'BACK'
    }
  }

  get CityPickerScreen () {
    return {
      title: 'Select a city',
      component: require('../Components/CityPicker').default,
      customConfiguration: Transitions.modal,
      rightButton: 'DONE',
      leftButton: 'BACK'
    }
  }

  get ProfileScreen () {
    return {
      title: 'Profile',
      component: require('../Containers/ProfileScreen').default,
      customConfiguration: Transitions.modal,
      rightButton: 'DONE',
      leftButton: 'HAMBURGER'
    }
  }

  get TabsViewScreen () {
    return {
      title: 'Home',
      component: require('../Containers/TabsView').default,
      customConfiguration: Transitions.modal
    }
  }

}

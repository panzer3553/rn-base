import React from 'react-native'
import NavigationBarRouteMapper from './NavigationBarRouteMapper'

// Stylesheet
import styles from './Styles/NavigationStyle'

const { Navigator } = React

class NavigationBar extends Navigator.NavigationBar {
  render() {
    var routes = this.props.navState.routeStack;

    if (routes.length) {
      var route = routes[routes.length - 1];

      if (route.displayNavBar === false) {
        return null;
      }
    }

    return super.render();
  }
}

export default {
  render () {
    return (
      <NavigationBar
      	navigationStyles={Navigator.NavigationBar.StylesIOS}
        routeMapper={NavigationBarRouteMapper}
        style={styles.navigationBar}
        />
    )
  }
}

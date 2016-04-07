import React, { View, Text, Navigator, StatusBar, TouchableWithoutFeedback } from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import configureStore from './Store/Store'
import { Provider } from 'react-redux'
import Actions from './Actions/Creators'
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styles
import styles from './Containers/Styles/RootStyle'
import drawerStyles from './Containers/Styles/DrawerStyle'
import I18n from './I18n/I18n.js'

const store = configureStore()

export default class RNBase extends React.Component {

  componentWillMount () {
    const { dispatch } = store
    dispatch(Actions.startup())
  }

  componentDidMount () {
    this.navigator.drawer = this.drawer
  }

  _changePath(){
    const Login = Routes.LoginScreen
    this.navigator.push(Login)
    this.drawer.close()
  }

  renderDrawerContent () {
  return (
        <View style={{marginTop: 30, padding: 10}}>
          <TouchableWithoutFeedback onPress={this._changePath.bind(this)}>
            <View style={drawerStyles.section}>
              <Icon name="add-location" size={30} color="#FFF" style={drawerStyles.icon}/>
              <Text style={drawerStyles.text}>
                {I18n.t('location')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this._changePath.bind(this)}>
            <View style={drawerStyles.section}>
              <Icon name="person" size={30} color="#FFF" style={drawerStyles.icon}/>
              <Text style={drawerStyles.text}>
                {I18n.t('profile')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this._changePath.bind(this)}>
            <View style={drawerStyles.section}>
              <Icon name="local-hospital" size={30} color="#FFF" style={drawerStyles.icon}/>
              <Text style={drawerStyles.text}>
                {I18n.t('medicalInformation')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this._changePath.bind(this)}>
            <View style={drawerStyles.section}>
              <Icon name="settings" size={30} color="#FFF" style={drawerStyles.icon}/>
              <Text style={drawerStyles.text}>
                {I18n.t('support')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this._changePath.bind(this)}>
            <View style={drawerStyles.section}>
              <Icon name="share" size={30} color="#FFF" style={drawerStyles.icon}/>
              <Text style={drawerStyles.text}>
                {I18n.t('share')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )  
    }

  renderApp () {
    return (
      <Provider store={store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />

          <Drawer
            ref={(ref) => { this.drawer = ref }}
              content={this.renderDrawerContent()}
              type="static"
              tapToClose={true}
              openDrawerOffset={0.2} // 20% gap on the right side of drawer
              panCloseMask={0.2}
              closedDrawerOffset={-3}
              styles={{
                drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor:"#E64A19"},
                main: {paddingLeft: 3}
              }}
              tweenHandler={(ratio) => ({
                main: { opacity:(2-ratio)/2 }
              })}
            >
            <Navigator
              ref={(ref) => { this.navigator = ref }}
              initialRoute={Routes.AllComponentsScreen}
              configureScene={Router.configureScene}
              renderScene={Router.renderScene}
              navigationBar={NavigationBar.render()}
              style={styles.container}
            />
          </Drawer>
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}

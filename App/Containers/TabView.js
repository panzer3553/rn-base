import React, { 
  View, 
  Text, 
  Navigator, 
  StatusBar, 
  TouchableWithoutFeedback,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AllComponentsScreen from './AllComponentsScreen'
import ProfileScreen from './ProfileScreen'
import Developing from './Developing'
import EmergencyScreen from './EmergencyScreen'
import Drawer from 'react-native-drawer'
import I18n from '../I18n/I18n.js'
import { Colors, Images, Metrics } from '../Themes'
import drawerStyles from './Styles/DrawerStyle'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
const drawerItems = [
  ["home", 'home'], 
  ["person", "profile"], 
  ["local-hospital", "instruction"], 
  ["warning", "emergency"], 
  ["share", "feedback"], 
  ["settings", "about"]
]

export default class TabsView extends React.Component{

  constructor (props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
    this.navigateTab = this.navigateTab.bind(this)
  }

  getChildContext () {
    return{
      openDrawer: this.openDrawer
    }
  }

  openDrawer () {
    this.refs.drawer.open()
  }

  navigateTab (tab) {
    this.props.dispatch(Actions.navigate(tab))
    this.refs.drawer.close()
  }

  renderContent () {
    switch (this.props.tab) {
      case 'home':
        return <AllComponentsScreen navigator={this.props.navigator}/>
      case 'profile':
        return <ProfileScreen navigator={this.props.navigator}/>
      case 'instruction':
        return <Developing navigator={this.props.navigator}/>
      case 'emergency':
        return <EmergencyScreen navigator={this.props.navigator} />
      case 'feedback':
        return <Developing navigator={this.props.navigator} />
      case 'about':
        return <Developing navigator={this.props.navigator} />
    }
    throw new Error(`Unknown tab ${this.props.tab}`)
  }

  renderDrawerContent () {
    return (
      <View style={{marginTop: 30, padding: 10}}>
        {drawerItems.map((item, i) =>
          <TouchableWithoutFeedback key ={i} onPress={() => this.navigateTab(item[1])}>
            <View style={drawerStyles.section}>
              <Icon name={item[0]} size={Metrics.icons.medium} color="white" style={drawerStyles.icon}/>
              <Text style={drawerStyles.text}>
                {I18n.t(item[1])}
              </Text>
            </View>
          </TouchableWithoutFeedback>)  
        }
      </View>
    )
  }

  render () {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );

    return (
      <Drawer
        ref='drawer'
        content={this.renderDrawerContent()}
        type="static"
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        styles={{
          drawer: {backgroundColor:Colors.drawerColor},
        }}
        tweenHandler={Drawer.tweenPresets.parallax}
        >
          {this.renderContent()}
      </Drawer>
    );
  }
}

TabsView.childContextTypes = {
  openDrawer: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    tab: state.navigation.tab
  }
}

export default connect(mapStateToProps)(TabsView)

import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, Image, ToolbarAndroid } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

class F8HeaderAndroid extends React.Component {

  render() {
    const {leftItem, rightItem, extraItems} = this.props;
    let actions = [];
    if (rightItem) {
      const {title, icon, layout} = rightItem;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always',
      });
    }
    if (extraItems) {
      actions = actions.concat(extraItems.map((item) => ({
        title: item.title,
        show: 'never',
      })));
    }

    return (
        <Ionicons.ToolbarAndroid
          navIconName={leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={this.props.title}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={styles.toolbar}>
        </Ionicons.ToolbarAndroid>
    );
  }

  handleActionSelected(position) {
    let items = this.props.extraItems || [];
    if (this.props.rightItem) {
      items = [this.props.rightItem, ...items];
    }
    const item = items[position];
    item && item.onPress && item.onPress();
  }
}


class F8HeaderIOS extends React.Component {

  render() {
    const {leftItem, title, rightItem} = this.props;
    const content = React.Children.count(this.props.children) === 0
      ? <Text style={styles.titleText}>
          {title}
        </Text>
      : this.props.children;

    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS color='white' item={leftItem} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS color='white' item={rightItem} />
        </View>
      </View>
    );
  }

}

class ItemWrapperIOS extends React.Component {

  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    const {title, icon, layout, onPress} = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (icon) {
      content = <Ionicons name={icon} size={24} />;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}


var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: 56,
    backgroundColor: 'blue'
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});

const Header = Platform.OS === 'ios' ? F8HeaderIOS : F8HeaderAndroid;
Header.height = HEADER_HEIGHT;

module.exports = Header;


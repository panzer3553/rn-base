import React, { Component, StyleSheet, PropTypes, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconToggle from './IconToggle';


const DEFAULT_ICON_COLOR = 'black'
const DEFAULT_OPACITY = 0.9
const DEFAULT_LABEL_COLOR = 'black'
const DEFAULT_OVERLAY_COLOR = 'brown'
const DEFAULT_ICON_SIZE = 24

export default class Checkbox extends Component {

    static propTypes = {

        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onCheck: PropTypes.func
    };

    static defaultProps = {
        disabled: false
    };

    render() {
        const { checked, disabled, value, onCheck } = this.props;
        const iconColor = this.props.iconColor ? this.props.iconColor : DEFAULT_ICON_COLOR
        const iconSize = this.props.iconSize ? this.props.iconSize : DEFAULT_ICON_SIZE
        const labelColor = this.props.labelColor ? this.props.labelColor : DEFAULT_LABEL_COLOR
        const overlayColor = this.props.overlayColor ? this.props.overlayColor : DEFAULT_OVERLAY_COLOR
        const status = (()=> {
            if (disabled) {
                return 'disabled'
            } else if (checked) {
                return 'checked'
            } else {
                return 'default'
            }
        });

        return (
            <TouchableHighlight
                onPress={() => { disabled ? null : onCheck(!checked, value) }}
                underlayColor={disabled ? 'rgba(0,0,0,0)' : overlayColor}
                activeOpacity={1}
            >
                <View style={styles.container}>
                    <IconToggle
                        disabled={disabled}
                        color={iconColor}
                        onPress={() => { disabled ? null : onCheck(!checked, value) }}
                    >
                        <Icon name={checked ? 'check-box' : 'check-box-outline-blank'}
                              size={iconSize}
                              color={iconColor}
                              key={value}
                              style={{opacity: DEFAULT_OPACITY, margin: 4}}
                        />
                    </IconToggle>
                    <View
                        style={styles.labelContainer}
                        onPress={() => onCheck(!checked, value)}
                    >
                        <Text style={[styles.label, {color:labelColor}]}>
                            {this.props.label}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    label: {
        marginLeft: 16,
        opacity: 1,
        flex: 1
    }
});
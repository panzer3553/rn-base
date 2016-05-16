import React, { Component, PropTypes, View } from 'react-native'
import Checkbox from './Checkbox'

export default class CheckboxGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        };
    }

    static propTypes = {
        onSelect: PropTypes.func,
        checked: PropTypes.array,
        items: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string,
            disabled: PropTypes.bool
        }))
    };

    static defaultProps = {
        
    }

    componentWillMount = () => {
        const { checked } = this.props;

        if (checked && checked.length) {
            this.value = checked;
        }
    }

    render() {
        const { items, iconColor, iconSize, labelColor, overlaycolor } = this.props;
        return (
            <View>
                {
                    items && items.length && items.map((item) => {
                        const { value } = item;
                        return (
                            <Checkbox
                                ref={value}
                                key={`Checkbox${value}`}
                                value={value}
                                onCheck={this._onChange}
                                checked={this.state.selected && this.state.selected.indexOf(value) !== -1}
                                iconSize={iconSize}
                                iconColor={iconColor}
                                labelColor={labelColor}
                                overlaycolor={overlaycolor}
                                {...item}
                            />
                        )
                    })
                }
            </View>
        )
    }

    _onChange = (checked, value) => {
        const { selected } = this.state;

        if (checked) {
            this.setState({
                selected: [...selected, value]
            });
        } else {
            let index = selected.indexOf(value);
            this.setState({
                selected: [
                    ...selected.slice(0, index),
                    ...selected.slice(index + 1)
                ]
            });
        }

        const { onSelect } = this.props;
        onSelect && onSelect(this.value);
    }

    get value() {
        return this.state.selected
    }

    set value(value) {
        this.setState({
            selected: value
        });

        const { onSelect } = this.props;
        onSelect && onSelect(value);
    }
}
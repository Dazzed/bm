 /**
 * react-native-check-box
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/crazycodeboy/react-native-check-box
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types';


export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
        }
    }

    static propTypes = {
        ...View.propTypes,
        leftText: PropTypes.string,
        leftTextView: PropTypes.element,
        leftSubText: PropTypes.string,
        leftSubTextView: PropTypes.element,
        rightText: PropTypes.string,
        rightSubText: PropTypes.string,
        leftTextStyle: Text.propTypes.style,
        leftSubTextStyle: Text.propTypes.style,
        rightTextView: PropTypes.element,
        rightTextViewStyle: Text.propTypes.style,
        rightTextStyle: Text.propTypes.style,
        rightSubTextView: PropTypes.element,
        rightSubTextStyle: Text.propTypes.style,
        checkedImage: PropTypes.element,
        unCheckedImage: PropTypes.element,
        onClick: PropTypes.func.isRequired,
        isChecked: PropTypes.bool,
        isDisabled: PropTypes.bool,

    }
    static defaultProps = {
        isChecked: false,
        leftTextStyle: {},
        leftSubTextStyle: {},
        rightTextStyle: {}
    }

    _renderLeft() {
        if (this.props.leftTextView)return this.props.leftTextView;
        if (!this.props.leftText)return null;
        if (!this.props.leftSubText)return null;
        return (
            <View>
            <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
            <Text style={[styles.leftSubText, this.props.leftSubTextStyle]}>{this.props.leftSubText}</Text>
            </View>
        )
    }
    _renderRight() {
        if (this.props.rightTextView)return this.props.rightTextView;
        if (!this.props.rightText)return null;
        return (
            <View style={[this.props.rightTextViewStyle]}>
            <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
            <Text style={[styles.rightSubText, this.props.rightSubTextStyle]}>{this.props.rightSubText}</Text>
            </View>
        )
    }

    _renderImage() {
        if (this.state.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
        } else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
        }
    }

    genCheckedImage() {
        var source = this.state.isChecked ? require('./img/ic_check_box.png') : require('./img/ic_check_box_outline_blank.png');

        return (
            <Image source={source}/>
        )
    }

    onClick() {
        if(!this.props.isDisabled) {
            this.setState({
                isChecked: !this.state.isChecked
            })
            this.props.onClick();
        } else {
            console.log('onClick:',this.state.isChecked);
            if(this.state.isChecked) {
                this.setState({
                    isChecked: !this.state.isChecked
                })
                this.props.onClick();
            }
        }
        
    }

    render() {
        return (
            <TouchableHighlight
                style={this.props.style}
                onPress={()=>this.onClick()}
                underlayColor='transparent'
            >
                <View style={styles.container}>
                    {this._renderLeft()}
                    {this._renderImage()}
                    {this._renderRight()}
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftText: {
        flex: 1,
    },
    rightText: {
        flex: 1,
        marginLeft: 10
    }
})

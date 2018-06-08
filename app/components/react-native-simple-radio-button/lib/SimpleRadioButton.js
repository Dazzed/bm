'use strict'

import Style from './Style.js'

var React = require('react')
var ReactNative = require('react-native')
var createReactClass = require('create-react-class');

var {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation
} = ReactNative

var RadioForm = createReactClass({
  getInitialState: function () {
    return {
      is_active_index: this.props.initial
    }
  },

  getDefaultProps: function () {
    return {
      radio_props: {},
      initial: 0,
      buttonColor: '#2196f3',
      formHorizontal: false,
      labelHorizontal: true,
      animation: true,
      labelColor: '#000',
      disabled: false
    }
  },

  updateIsActiveIndex: function(index) {
    this.setState({ is_active_index: index });
    this.props.onPress(this.props.radio_props[index], index)
  },

  _renderButton: function (obj, i) {
    return (
      <RadioButton
        isSelected={this.state.is_active_index === i}
        obj={obj}
        key={i}
        index={i}
        buttonColor={this.props.buttonColor}
        buttonSize={this.props.buttonSize}
        buttonOuterSize={this.props.buttonOuterSize}
        borderWidth={this.props.borderWidth}
        labelHorizontal={this.props.labelHorizontal}
        labelColor={this.props.labelColor}
        labelStyle={this.props.labelStyle}
        labelWrapStyle={this.props.labelWrapStyle}
        labelWrapActive={this.props.radioLabelActive}
        style={this.props.radioStyle}
        animation={this.props.animation}
		    disabled={this.props.disabled}
        onPress={(value, index) => {
			this.props.onPress(value, index)
			this.setState({is_active_index: index})
        }}
      />
    )
  },

  render: function () {
    var render_content = false
    if (this.props.radio_props.length) {
      render_content = this.props.radio_props.map(this._renderButton)
    } else {
      render_content = this.props.children
    }
    return (
      <View style={[
        Style.radioFrom,
        this.props.style,
        this.props.formHorizontal && Style.formHorizontal
      ]}>
        {render_content}
      </View>
    )
  }
})

var RadioButton = createReactClass({
  shouldComponentUpdate: function (nextProps, nextState) {
    return true
  },
  getDefaultProps: function () {
    return {
      isSelected: false,
      buttonColor: '#2196f3',
      labelHorizontal: true,
      disabled: false,
    }
  },
  componentWillUpdate () {
    if (this.props.animation) {
      LayoutAnimation.spring()
    }
  },
  render: function () {
    var c = this.props.children
    var renderContent = false
    renderContent = c ? (
      <View style={[
        Style.radioWrap,
        this.props.style,
        !this.props.labelHorizontal && Style.labelVerticalWrap
      ]}>
        {c}
      </View>
    ) : (
      <View style={[
        Style.radioWrap,
        this.props.style,
        !this.props.labelHorizontal && Style.labelVerticalWrap
      ]}>
        <RadioButtonInput {...this.props} />
        <RadioButtonLabel {...this.props} />
      </View>
    )
    return (
      <View>
        {renderContent}
      </View>
    )
  }
})

export class RadioButtonInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      buttonColor: props.buttonColor || '#2196f3'
    }
  }
  render () {
    var innerSize = {width: 20, height:20}
    var outerSize = {width: 20+10, height:20+10 }
    if (this.props.buttonSize) {
      innerSize.width = this.props.buttonSize
      innerSize.height = this.props.buttonSize
      outerSize.width = this.props.buttonSize + 10
      outerSize.height = this.props.buttonSize + 10
    }
    if (this.props.buttonOuterSize) {
      outerSize.width = this.props.buttonOuterSize
      outerSize.height = this.props.buttonOuterSize
    }
    var outerColor = this.props.buttonOuterColor
    var borderWidth = this.props.borderWidth
    var innerColor = this.props.buttonInnerColor
    if (this.props.buttonColor) {
      outerColor = this.props.buttonOuterColor
      innerColor = this.props.buttonColor
    }
	var c = (
		<View style={[
		  Style.radioNormal,
      this.props.isSelected && Style.radioActive,
		  this.props.isSelected && innerSize,
		  this.props.isSelected && {backgroundColor:innerColor}
		]}></View>
	)
	var radioStyle = [
	  Style.radio,
	  {
		borderColor:outerColor,
		borderWidth:borderWidth
	  },
	  this.props.buttonStyle,
	  outerSize
  	]

	if (this.props.disabled) {
		return (
	      <View style={this.props.buttonWrapStyle} >
	        <View style={radioStyle}>
	          {c}
	  		</View>
	      </View>
	    )
	}

    return (
      <View style={this.props.buttonWrapStyle} >
        <TouchableOpacity
          style={radioStyle}
          onPress={() => { this.props.onPress( this.props.obj.value, this.props.index) }
          }>
         {c}
        </TouchableOpacity>
      </View>
    )
  }
}

RadioButtonInput.defaultProps = {
  buttonInnerColor: '#2196f3',
  buttonOuterColor: '#9EA1AA',
  disabled: false
}

export class RadioButtonLabel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      buttonColor: '#2196f3',
    }
  }
  render () {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
			if (!this.props.disabled) {
				this.props.onPress( this.props.obj.value, this.props.index)}
			}
		}>
        <View style={[
          this.props.labelWrapStyle,
          Style.labelWrapStyle,
        ]}>
          <View style={Style.labelWrap}>
            <Text style={[
              Style.radioLabel,
              !this.props.labelHorizontal && Style.labelVertical,
              {color: this.props.labelColor},
              this.props.labelStyle,
              this.props.isSelected && this.props.labelWrapActive,            
            ]}>{this.props.obj.label} 
            {this.props.obj.info && <Text style={[Style.radioInfo]}>{"\n"}{this.props.obj.info}</Text>}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default RadioForm
export {RadioButton}

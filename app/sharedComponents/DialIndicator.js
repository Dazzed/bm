import React from 'react';
import {
  View,
  Text,
  Animated
} from 'react-native';
import { colorStore } from '../mobxStores';
import { observer } from 'mobx-react';
import watchstyle from '../style/watchlist';
import fonts from '../style/fonts';

@observer
export default class DialIndicator extends React.Component {

  constructor(props) {
    super(props);
    this.height = this.props.height;
    this.width = this.props.width;
    this.rotationAdjust = 3.75;
    this.dialNibWidth = 2.5;
    this.dialNibLength = 15;
    this.verticalDialOffset = 90;
    this.nibInset = 3;
    this.nibLength = 9;
    this.nibThickness = 1.5;
    // Initializing variables for layout. Don't change
    this.rotationMin = 0;
    this.rotationMax = 180;
    this.delayBeforeMovingDial = 500;
    // Where it's going
    this.activeDialPosition = this.props.position;
    // Starting point
    this.initialDialPosition = 0;
    this.animationSpeed = 1000;
    // Used to generate all the nibs
    this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    // Colors
    this.red = colorStore.theme.red;
    this.green = colorStore.theme.green;
    // This prevents the nibs from highlighting until the dial indicator has passed just over them
    this.fixRedNibHighlightedAdjustAmount = .03;
    this.fixGreenNibHighlightAmount = .01;
    // Animated value that causes all the magic
    this.state = {
      dialPosition: new Animated.Value(this.initialDialPosition)
    }
  }

  animateToValue(newValue) {
    
    let initAnimation = Animated.timing(
      this.state.dialPosition,
      {
        toValue: 1,
        duration: this.animationSpeed,
        useNativeDriver: true
      }
    );
    
    let toValueAnimation = Animated.timing(
      this.state.dialPosition,
      {
        toValue: newValue,
        duration: this.animationSpeed,
        useNativeDriver: true
      },
    );
    
    let animations = [initAnimation, toValueAnimation];
    Animated.sequence(animations).start()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.position !== this.props.position) {
      this.animateToValue(nextProps.position)
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.animateToValue(this.activeDialPosition)
    }, this.delayBeforeMovingDial)
  }

  renderText() {
    const { theme } = colorStore;
    if(this.props.displayText) {
      return <View style={{alignSelf: 'center', position: 'absolute', top: this.height * .38}}>
        <Text style={[{ color: theme.lightGray }, watchstyle.vol, fonts.hindGunturRg]}>{this.props.textLine1}</Text>
        <Text style={[{ color: theme.lightGray }, watchstyle.vol, fonts.hindGunturRg]}>{this.props.textLine2}</Text>
      </View>
    } else {
      return null;
    }
  }
  
  renderDialArrow() {
    if(this.props.showArrow) {
      let triangleBaseWidth = 5;
      let rotation = 180;
      let distanceFromEdgeOfDial = -12;
      let arrowAlignOffset = 1;
      let inlineStyle = {
        width: 0,
        height: 0,
        position: 'relative',
        borderBottomWidth: triangleBaseWidth,
        borderRightWidth: triangleBaseWidth / 2,
        borderLeftWidth: triangleBaseWidth * 2.5,
        borderTopWidth: triangleBaseWidth,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'black',
      }
      let containerStyle = {
        width: 20,
        top: -triangleBaseWidth + arrowAlignOffset,
        right: distanceFromEdgeOfDial,
        transform: [
          { rotate: rotation + 'deg' }
        ],
      }
      
      return <View style={containerStyle}>
        <View style={inlineStyle}></View>
      </View>  
    }
    
  }

  renderDialIndicator() {
    const { theme } = colorStore;

    let inlineIndicatorStyle = {
      // borderWidth: 1,
      // borderColor: 'red',
      position: 'absolute', top: this.verticalDialOffset + '%',
      width: '100%',
      height: this.dialNibWidth,
      transform: [
        {rotate: this.state.dialPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [this.rotationMin + "deg", this.rotationMax + "deg"]
        })},
        {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
      ]
    }
    let inlineIndicatorNibStyle = {
      position: 'absolute',
      left: 0,
      height: '100%',
      width: this.dialNibLength + '%',
      backgroundColor: theme.darkSlate
    }
    return <Animated.View style={inlineIndicatorStyle}>
      <View style={inlineIndicatorNibStyle}></View>
      {this.renderDialArrow()}
    </Animated.View>
  }

  renderDial() {
    const { theme } = colorStore;

    let inlineContainerStyle = {
      // borderColor: 'purple',
      // borderWidth: 1,
      position: 'absolute',
      alignSelf: 'center',
      width: this.width,
      height: this.height
    }

    let sharedInlineNibStyles = {
        // borderWidth: 1,
        // borderColor: 'purple',
        position: 'absolute',
        left: this.nibInset,
        height: '100%',
        width: this.nibLength + '%',
        backgroundColor: theme.lightGray
    }

    let sharedDialInlineStyles = {
      // borderWidth: 1,
      // borderColor: 'red',
      position: 'absolute',
      top: this.verticalDialOffset + '%',
      width: '100%',
      height: this.nibThickness
    }

    let gitNibPositionByIndex = (index, list) => {
      return index / list.length;
    }

    let getRotationByIndex = (index, list) => {
      return ( gitNibPositionByIndex(index, list) ) * this.rotationMax + this.rotationAdjust;
    }

    let limitInterpolationToFloatMax = (input) => {
      if(input <= 1) {
        return input
      } else {
        return 1
      }
    }

    let limitInterpolationToFloatMin = (input) => {
      if(input <= 0) {
        return 0
      } else {
        return input
      }
    }

    return <View style={inlineContainerStyle}>
      {this.list.map((elem, i) => {
        let rotation = getRotationByIndex(i, this.list)
        let dialInlineStyles = {
          ...sharedDialInlineStyles,
          transform: [{ rotate: rotation + 'deg'}]
        }
        let inlineNibStyle = {
          ...sharedInlineNibStyles
        }
        return <View key={i} style={dialInlineStyles}>
          <Animated.View style={inlineNibStyle}></Animated.View>
        </View>
      })}
      //  RED NIBS
      {this.list.map((elem, i) => {
        if(i > 12) {
          return null;
        }
        let rotation = getRotationByIndex(i, this.list)
        let dialInlineStyles = {
          ...sharedDialInlineStyles,
          transform: [{ rotate: rotation + 'deg'}]
        }
        let nibPosition = gitNibPositionByIndex(i, this.list) + this.fixRedNibHighlightedAdjustAmount
        let inlineNibStyle = {
          ...sharedInlineNibStyles,
          backgroundColor: this.red,
          opacity: this.state.dialPosition.interpolate({
            inputRange: [0, limitInterpolationToFloatMin(nibPosition - .01), nibPosition, 1],
            outputRange: [1, 1, 0, 0]
          })
        }
        return <View key={i} style={dialInlineStyles}>
          <Animated.View style={inlineNibStyle}></Animated.View>
        </View>
      })}
      //  GREEN NIBS
      {this.list.map((elem, i) => {
        if(i < 12) {
          return null;
        }
        let rotation = getRotationByIndex(i, this.list)
        let dialInlineStyles = {
          ...sharedDialInlineStyles,
          transform: [{ rotate: rotation + 'deg'}]
        }
        let nibPosition = gitNibPositionByIndex(i, this.list) + this.fixGreenNibHighlightAmount;
        let inlineNibStyle = {
          ...sharedInlineNibStyles,
          backgroundColor: this.green,
          opacity: this.state.dialPosition.interpolate({
            inputRange: [0, nibPosition, limitInterpolationToFloatMax(nibPosition + .01),  1],
            outputRange: [0, 0, 1, 1]
          })
        }
        return <View key={i} style={dialInlineStyles}>
          <Animated.View style={inlineNibStyle}></Animated.View>
        </View>
      })}
      {this.renderDialIndicator()}
    </View>
  }

  render() {
    let inlineStyle = {
      // borderWidth: 1,
      // borderColor: 'red',
      width: '100%',
      height: this.height,
      position: 'relative'
    }
    return <View style={inlineStyle}>
      {this.renderDial()}
      {this.renderText()}
    </View>
  }
}

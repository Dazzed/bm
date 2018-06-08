import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View
} from 'react-native';


class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),          // Initial value for opacity: 0
    };
  }
  componentDidMount() {
    Animated.timing(                            // Animate over time
      this.state.fadeAnim,                      // The animated value to drive
      {
        toValue: 1,                             // Animate to opacity: 1, or fully opaque
      }
    ).start();                                  // Starts the animation
  }
  render() {
    return (
      <Animated.View                            // Special animatable View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: this.state.fadeAnim,          // Bind opacity to animated value
          backgroundColor: '#ffffff',
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

module.exports = FadeInView;
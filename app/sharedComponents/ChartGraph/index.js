import React from 'react';
import {
  View,
  Text,
  Animated
} from 'react-native';
import { observer } from 'mobx-react';
import LargeGraph from './LargeGraph';
import SmallGraph from './SmallGraph';

@observer
export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    }

  }

  renderLargeGraphOrSmallGraph() {
    if(this.props.viewLargeGraph) {
      return <LargeGraph height={this.state.height} width={this.state.width} {...this.props}/>
    } else {
      return <SmallGraph height={this.state.height} width={this.state.width} {...this.props}/>
    }
  }

  onLayout(event) {
    const {x, y, width, height} = event.nativeEvent.layout;
    this.setState({
      height: height,
      width: width
    })
  }

  render() {
    let inlineStyle = {
      // borderWidth: 1,
      // borderColor: 'red',
      width: '100%',
      height: '100%',
      position: 'relative'
    }
    return <View style={inlineStyle} onLayout={(event) => this.onLayout(event)}>
      {this.renderLargeGraphOrSmallGraph()}
    </View>
  }
}
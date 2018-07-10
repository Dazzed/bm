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
import ResponsiveImage from 'react-native-responsive-image';
import chart from '../style/chart';

@observer
export default class ChartGraph extends React.Component {

  constructor(props) {
    super(props);
    this.height = this.props.height;
    this.width = this.props.width;
    this.state = {
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  }


  renderSmallGraph() {

    let inlineContainerStyle = {
      borderWidth: 1,
      borderColor: 'red',
      flex: 1,
      height: 200
    }

    let inlineGraphContainerStyle = {
      borderWidth: 1,
      borderColor: 'green',
      flex: 7
    }

    let inlineTimeStampContainerStyle = {
      borderWidth: 1,
      borderColor: 'blue',
      flex: 1
    }

    return <View style={inlineContainerStyle}>
      <View style={inlineGraphContainerStyle}>
        <Text>Line graph here</Text>
      </View>
      <View style={inlineTimeStampContainerStyle}>
        <Text>Timeline here</Text>
      </View>
    </View>
  }

  renderLargeGraphOrSmallGraph() {
    return this.renderSmallGraph()
  }

  render() {
    let inlineStyle = {
      borderWidth: 1,
      borderColor: 'red',
      width: '100%',
      height: '100%',
      position: 'relative',
      marginTop: 18
    }
    return <View style={inlineStyle}>
      {this.renderLargeGraphOrSmallGraph()}
    </View>
  }
}

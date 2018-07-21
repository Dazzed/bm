import React from 'react';
import {
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import { observer } from 'mobx-react';
import LargeGraph from './LargeGraph';
import SmallGraph from './SmallGraph';
import { chartStore, colorStore } from "../../mobxStores";
import { parseLargeGraphData } from "./utility";
import fonts from '../../style/fonts';
import trending from '../../style/trending';

@observer
export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensions: undefined
    }
  }

  renderLargeGraphOrSmallGraph() {
    const { chartDetailDataJS } = chartStore;
    const { theme } = colorStore;

    // console.log('===================== THIS PROPS HEIGHT', this.props.height);

    if(this.props.viewLargeGraph) {
      return <LargeGraph data={chartDetailDataJS} height={this.props.height} width={this.props.width} {...this.props}/>
    } else {
      return <SmallGraph data={chartDetailDataJS} height={this.state.height} width={this.state.width} {...this.props}/>
    }
  }

  onLayout = event => {
      if (this.state.dimensions) return // layout was already called
      let {width, height} = event.nativeEvent.layout
      // console.log('======================= on layout height width', height, width)
      this.setState({dimensions: {width, height}})
  }

  renderLoadingOrContent() {
      return <View>
        {this.renderLargeGraphOrSmallGraph()}
      </View>
  }



  render() {
    let inlineStyle = {
      // borderWidth: 2,
      // borderColor: 'red',
      flex: 1,
      width: '100%',
      // height: '100%',
      // position: 'relative'
    }
    return <View style={inlineStyle} onLayout={(event) => this.onLayout(event)}>
        {this.renderLoadingOrContent()}
    </View>
  }
}

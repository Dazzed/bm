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
      height: 0,
      width: 0
    }
  }

  renderLargeGraphOrSmallGraph() {
    const { chartDetailDataJS } = chartStore;
    const { theme } = colorStore;

    if( !chartDetailDataJS || chartDetailDataJS.length === 0 ) {
      return <View style={{flex: 1, height: this.state.height, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[{ color: theme.lightGray }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>No Results</Text>
      </View>
    }

    if(this.props.viewLargeGraph) {
      return <LargeGraph data={parseLargeGraphData(chartDetailDataJS, this.state.height, this.state.width)} height={this.state.height} width={this.state.width} {...this.props}/>
    } else {
      return <SmallGraph data={chartDetailDataJS} height={this.state.height} width={this.state.width} {...this.props}/>
    }
  }

  onLayout(event) {
    const {x, y, width, height} = event.nativeEvent.layout;
    this.setState({
      height: height,
      width: width
    })
  }

  renderLoadingOrContent() {
    const { stockChartLoading } = chartStore;
    if(stockChartLoading) {
      return <View style={{flex: 1, height: this.state.height, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    } else {
      return this.renderLargeGraphOrSmallGraph()
    }
  }


  render() {
    let inlineStyle = {
      // borderWidth: 1,
      // borderColor: 'red',
      width: '100%',
      height: this.props.height,
      position: 'relative'
    }
    return <View style={inlineStyle} onLayout={(event) => this.onLayout(event)}>
        {this.renderLoadingOrContent()}
    </View>
  }
}
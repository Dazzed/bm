import React from 'react';
import { chartStore, colorStore } from "../../mobxStores";
import { observer } from "mobx-react";
import { LineChart, Path, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { ClipPath, Defs, Rect } from 'react-native-svg'

import {
    View,
    Text,
    Animated,
    ActivityIndicator
} from 'react-native';
import HorizontalLine from './HorizontalLine';
import { parseSmallGraphData, flipYAxisValue } from './utility';
import fonts from '../../style/fonts';
import trending from '../../style/trending';

@observer
export default class SmallGraph extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { theme } = colorStore;
        const { stockChartLoading, chartDetailDataJS } = chartStore;

        if(stockChartLoading) {
          return <View style={{flex: 1, height: this.props.height, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator />
          </View>
        }

        if( !chartDetailDataJS || chartDetailDataJS.length === 0 ) {
          return <View style={{flex: 1, height: this.props.height, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[{ color: theme.lightGray }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>No Results</Text>
          </View>
        }
        let inlineContainerStyle = {
            // borderWidth: 1,
            // borderColor: 'red',
            flex: 1,
            height: this.props.height,
            marginTop: 18
        }
        const { tickerDataJS, range } = chartStore;
        const { Price, previousClose } = tickerDataJS;
        const { height } = this.props.height;

        console.log(49, tickerDataJS);
        let xAxisHeight = 20;
        let graphHeight = this.props.height - xAxisHeight;
        const data = parseSmallGraphData(this.props.data, previousClose, graphHeight, range);
        let lineYPosition = flipYAxisValue(graphHeight, data.priceLineHeight);

        // prevent y line from hitting top or bottom of graph
        let yAxisPadding = 20;
        if(lineYPosition < yAxisPadding) {
          lineYPosition = yAxisPadding;
        }
        if(lineYPosition > graphHeight - yAxisPadding) {
          lineYPosition = graphHeight - yAxisPadding;
        }


        let inlineGraphContainerStyle = {
            // borderWidth: 1,
            // borderColor: 'green',
            flexDirection: 'row',
            width: '100%',
            height: graphHeight
        }
        let inlineTimeStampContainerStyle = {
            // borderWidth: 1,
            // borderColor: 'blue',
            height: xAxisHeight,
            // alignItems: 'center',
            justifyContent: 'center'
        }
        let xAxisData = data.dateData;
        let textColor = theme.darkSlate;
        const indexToClipFrom = data.lineData.length
        if (range === "1d") {
            if (data.lineData.length < 31) {
                let currentLength = data.lineData.length;
                for (var i = currentLength; i < 31; i++) {
                    data.lineData.push(Price);
                }
            }
        }

        const Clips = ({ x, width }) => (
            <Defs key={'clips'}>
                <ClipPath id="clip-path-1">
                    <Rect x={'0'} y={'0'} width={x(indexToClipFrom)} height={'100%'} />
                </ClipPath>
                <ClipPath id={'clip-path-2'}>
                    <Rect x={x(indexToClipFrom)} y={'0'} width={width - x(indexToClipFrom)} height={'100%'} />
                </ClipPath>
            </Defs>
        )

        // Line extras:
        const DashedLine = ({ line }) => (
            <Path
                key={'line-1'}
                d={line}
                stroke={'rgb(255, 255, 255)'}
                strokeWidth={2}
                fill={'none'}
                strokeDasharray={[10, 0]}
                clipPath={'url(#clip-path-2)'}
            />
        )

        return <View style={inlineContainerStyle}>
            <View style={inlineGraphContainerStyle}>
                <View style={{ flex: 1,height: graphHeight}}>
                    <LineChart
                        style={{ height: graphHeight }}
                        data={ data.lineData }
                        svg={{ stroke: theme.green }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Clips />
                        <DashedLine />
                        <HorizontalLine height={height} yVal={lineYPosition} title={"PREV CLOSE " + previousClose} />
                    </LineChart>
                </View>
            </View>
            <View style={inlineTimeStampContainerStyle}>
                <XAxis
                    style={{ marginHorizontal: 5 }}
                    data={ xAxisData }
                    formatLabel={ (value, index) => {
                        return xAxisData[value]
                    }}
                    numberOfTicks={ 3 }
                    contentInset={{ left: 30, right: 10 }}
                    svg={{ fontSize: 10, fill: textColor }}
                />
            </View>
        </View>
    }
}

//     Y axis ready if we ever need it
// <View style={{ width: 20, height: graphHeight, borderWidth: 1, borderColor: 'red', flexDirection: 'row' }}>
// <YAxis
//     data={ data.lineData }
//     svg={{
//         fill: 'grey',
//             fontSize: 10,
//     }}
//     numberOfTicks={ 10 }
//     formatLabel={ value => `${value}` }
//     />
// </View>

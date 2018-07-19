import React from 'react';
import {chartStore, colorStore} from "../../mobxStores";
import { observer } from "mobx-react";
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
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

        const { height } = this.props.height;
        const data = parseSmallGraphData(this.props.data);
        const { tickerDataJS } = chartStore;
        const { Price } = tickerDataJS;

        let xAxisHeight = 20;
        let graphHeight = this.props.height - xAxisHeight;

        let lineYPosition = flipYAxisValue(graphHeight, Price);

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

        return <View style={inlineContainerStyle}>

            <View style={inlineGraphContainerStyle}>

                <View style={{ flex: 1,height: graphHeight}}>
                    <LineChart
                        style={{ height: graphHeight }}
                        data={ data.lineData }
                        svg={{ stroke: theme.green }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <HorizontalLine height={height} yVal={lineYPosition} title={Price} />
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
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
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

import React from 'react';
import {chartStore, colorStore} from "../../mobxStores";
import { observer } from "mobx-react";
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import {
    View,
    Text,
    Animated
} from 'react-native';
import HorizontalLine from './HorizontalLine';
import { parseSmallGraphData, flipYAxisValue } from './utility';

@observer
export default class SmallGraph extends React.Component {

    constructor(props) {
        super(props);
        this.smallGraphData = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];

        this.state = {
            height: 0,
            width: 0
        }

    }

    render() {
        const { theme } = colorStore;

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



        console.log('render small graph', this.smallGraphData)



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

        // contentInset={{ top: 10, bottom: 10 }}

        let xAxisData = data.dateData;
        console.log('------ date', xAxisData)



        return <View style={inlineContainerStyle}>

            <View style={inlineGraphContainerStyle}>

                <View style={{ flex: 1,height: graphHeight, borderWidth: 1, borderColor: 'blue'}}>
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
                        console.log('--- value, index', value, index)
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

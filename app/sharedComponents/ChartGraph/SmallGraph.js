import React from 'react';
import {colorStore} from "../../mobxStores";
import { observer } from "mobx-react";
import { LineChart, Grid } from 'react-native-svg-charts'
import {
    Svg,
    Line,
    Text as TextSvg,
    Polygon,
    G,
    Defs,
    Use,
    TSpan,
    Rect,
    Polyline
} from 'react-native-svg';
import {
    View,
    Text,
    Animated
} from 'react-native';

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
            height: 200,
            marginTop: 18

        }

        let inlineGraphContainerStyle = {
            // borderWidth: 1,
            // borderColor: 'green',
            flex: 7
        }

        let inlineTimeStampContainerStyle = {
            // borderWidth: 1,
            // borderColor: 'blue',
            flex: 1
        }

        const data = this.smallGraphData;

        let height = 200;

        let lineYPosition = 100;

        return <View style={inlineContainerStyle}>
            <View style={inlineGraphContainerStyle}>

                <LineChart
                    style={{ height: height }}
                    data={ data }
                    svg={{ stroke: theme.green }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <HorizontalLine height={height} yVal={lineYPosition} />
                </LineChart>

            </View>
            <View style={inlineTimeStampContainerStyle}>
                <Text>Timeline here</Text>
            </View>
        </View>
    }

}


import React from 'react';
import {chartStore, colorStore} from "../../mobxStores";
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
import { observer } from "mobx-react";
import { generatePolygonsFromTwoLines, flipYAxisValue, parseLargeGraphData } from './utility';

@observer
export default class LargeGraph extends React.Component {

    constructor(props) {
        super(props);
    }


    getLineList() {
        const { theme } = colorStore;

        // console.log('----------------- GET LINE LIST', this.props.data)

        return [
            {
                lineTitle: 'Test line 1',
                color: theme.red,
                lineData: [
                    {
                        x: 0, y: 0
                    },
                    {
                        x: 50, y: 50
                    },
                    {
                        x: 100, y: 100
                    },
                    {
                        x: 150, y: 110
                    },
                    // {
                    //     x: 200, y: 500
                    // },
                    // {
                    //     x: 250, y: 0
                    // },
                    // {
                    //     x: 300, y: 100
                    // }
                ]
            },

            {
                lineTitle: 'Test line 1',
                color: theme.green,
                lineData: [
                    {
                        x: 0, y: 0
                    },
                    {
                        x: 50, y: 100
                    },
                    {
                        x: 100, y: 50
                    },
                    {
                        x: 150, y: 50
                    },
                //     {
                //         x: 200, y: 50
                //     },
                //     {
                //         x: 250, y: 100
                //     },
                //     {
                //         x: 300, y: 150
                //     }
                ]
            }
        ]
    }

    render() {

        const { theme } = colorStore;

        const parsedData = parseLargeGraphData(this.props.data, this.props.height, this.props.width);
        console.log('---- parsed Data', parsedData);

        let inlineContainerStyle = {
            // borderWidth: 3,
            // borderColor: 'green',
            // flex: 1,
            height: this.props.height
        }

        const generateXLineGroup = (data, key) => {
            const { position, label } = data;
            return <G key={key}>
                <G>
                    <Line
                        key={ 'zero-axis' }
                        x1={ position }
                        x2={ position }
                        y1={ '0%' }
                        y2={ '100%' }
                        stroke={ theme.borderGray }
                        strokeDasharray={ [ 4, 8 ] }
                        strokeWidth={ 1 }
                    />
                    <TextSvg
                        key={Math.random()}
                        fontSize={12}
                        fill={theme.borderGray}
                        stroke={theme.borderGray}
                        y={'95%'}
                        x={ position }
                        textAnchor="middle"
                    >
                      {label}
                    </TextSvg>
                </G>
            </G>
        }


        const generateYLineGroup = (data, key) => {
            const { position, label } = data;
            let verticalOffset = 4;
            return <G key={key}>
                <Line
                    key={ 'zero-axis' }
                    y1={ position }
                    y2={ position }
                    x1={ '0%' }
                    x2={ '95%' }
                    stroke={ theme.borderGray }
                    strokeDasharray={ [ 4, 8 ] }
                    strokeWidth={ 1 }
                />
                <TextSvg
                    key={Math.random()}
                    fontSize={12}
                    fill={theme.borderGray}
                    stroke={theme.borderGray}
                    x={'95%'}
                    y={ position + verticalOffset}
                    textAnchor="middle"
                >
                    {label}
                </TextSvg>
            </G>
        }


        const generateCandlestickBars = (params, key) => {
            let thickLineTop = params.closeYPositionCoordinates;
            let thickLineBottom = params.openYPositionCoordinates
            let color = theme.red;
            if(params.close <= params.open) {
              color = theme.green;
              thickLineTop = params.openYPositionCoordinates;
              thickLineBottom = params.closeYPositionCoordinates;
            }

            let thinLineWidth = .5;
            let thickLineWidth = 2;

            return <G key={key}>
                {/* Thin line -  high / low */}
                <Rect
                    key={Math.random()}
                    x={params.xPositionCoordinates - (thinLineWidth / 2)}
                    y={params.lowYPositionCoordinates}
                    width={thinLineWidth}
                    height={params.highYPositionCoordinates - params.lowYPositionCoordinates}
                    fill={'red'}
                    strokeWidth={'1'}
                    stroke={color}
                    strokeLinejoin={'round'}
                />

                {/* Thick line - open / close */}
                <Rect
                    x={params.xPositionCoordinates - (thickLineWidth / 2)}
                    y={thickLineBottom}
                    width={thickLineWidth}
                    height={thickLineTop - thickLineBottom}
                    fill={color}
                    strokeWidth={'1'}
                    stroke={color}
                    strokeLinejoin={'round'}
                />
            </G>
        }

        let lineList = this.getLineList();

        const generateGraphPolygon = (params, key) => {
            let points = `0,${flipYAxisValue(this.props.height, 0)}`;
            params.lineData.map((elem, i) => {
                let flippedY = flipYAxisValue(this.props.height, elem.y);
                points += ` ${elem.x},${flippedY}`
            })
            return <Polyline
                key={key}
                points={points}
                fill={'none'}
                stroke={params.color}
                strokeWidth={2}
                strokeLinejoin={'round'}
            />
        }

        let lines = this.getLineList();
        let line1 = lines[0];
        let line2 = lines[1];

        let polygonsList = generatePolygonsFromTwoLines(line1, line2, this.props.height);


        // console.log('POLYGONGS', polygonsList)

        const generateGraphPolygonFill = (elem, key) => {
            let points = elem.points;
            let color = theme.red;
            if(elem.positive) {
                color = theme.green;
            }
            return <Polyline
                key={key}
                points={points}
                fill={color}
                stroke={'none'}
                strokeWidth={1}
                strokeLinejoin={'round'}
                fillOpacity={.2}
            />
        }


        return <View style={inlineContainerStyle}>
            <Svg
                height={'100%'}
                width={'100%'}
            >

                {parsedData.gridYArray.map((elem, i) => {
                    return generateYLineGroup(elem, i)
                })}

                {parsedData.gridXArray.map((elem, i) => {
                    return generateXLineGroup(elem, i)
                })}

                {parsedData.dataPoints.map((elem, i) => {
                    return generateCandlestickBars(elem, i)
                })}


            </Svg>
        </View>
    }
}

//
// {polygonsList.map((elem, i) => {
//     return generateGraphPolygonFill(elem, i)
// })}
//
// {lineList.map((elem, i) => {
//     return generateGraphPolygon(elem, i)
// })}

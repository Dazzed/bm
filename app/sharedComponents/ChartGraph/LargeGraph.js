import React from 'react';
import { chartStore, colorStore } from "../../mobxStores";
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
  Animated,
  ActivityIndicator
} from 'react-native';
import { observer } from "mobx-react";
import {
  generatePolygonsFromTwoLines,
  flipYAxisValue,
  parseLargeGraphData
} from './utility';
import fonts from '../../style/fonts';
import trending from '../../style/trending';

@observer
export default class LargeGraph extends React.Component {

    constructor(props) {
      super(props);
    }

    generateXLineGroup(data, key) {
        const { position, label } = data;
        const { theme } = colorStore;
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

    generateYLineGroup(data, key) {
        const { position, label } = data;
        const { theme } = colorStore;

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

    generateCandlestickBars(params, key) {
        const { theme } = colorStore;
        let thickLineTop = params.closeYPositionCoordinates;
        let thickLineBottom = params.openYPositionCoordinates
        let color = theme.red;
        if(params.close <= params.open) {
          color = theme.green;
          thickLineTop = params.openYPositionCoordinates;
          thickLineBottom = params.closeYPositionCoordinates;
        }

        // edit this one
        let lineWidth = 3;
        
        // these are relative calculations
        let thinLineWidth = lineWidth / 2;
        let thickLineWidth = lineWidth * 2;

        return <G key={key}>
            {/* Thin line -  high / low */}
            <Rect
              key={Math.random()}
              x={params.xPositionCoordinates - (thinLineWidth / 2)}
              y={params.lowYPositionCoordinates}
              width={thinLineWidth}
              height={params.highYPositionCoordinates - params.lowYPositionCoordinates}
              fill={color}
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

    generateGraphPolygon(params, key) {
      let formattedData = params.formattedLineData;
      let lineTargetValue = params.lineTargetValue;
      const { theme } = colorStore;
      return <Polyline
          key={key}
          points={formattedData}
          fill={'none'}
          stroke={params.color}
          strokeWidth={2}
          strokeLinejoin={'round'}
      />
    }

    generateVerticalBottomBars(params, key) {
      let barWidth = .01;
      return <Rect
        x={params.xCoord - (barWidth / 2)}
        y={params.yCoord}
        width={barWidth}
        height={params.lineHeight}
        fill={params.color}
        strokeWidth={'1'}
        stroke={params.color}
        strokeLinejoin={'round'}
      />
    }

    renderBottomVolumeLines(parsedData) {
      if(parsedData.volumeBottomLinesData) {
        return parsedData.volumeBottomLinesData.dataSet.map((elem, i) => {
          return this.generateVerticalBottomBars(elem,i);
        })
      } else {
        return null;
      }
    }

    render() {
        const { theme } = colorStore;
        const { stockChartLoading, chartDetailDataJS, indicatorsListJS } = chartStore;

        if(stockChartLoading) {
          return <View style={{ height: this.props.height, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator />
          </View>
        }

        if( !chartDetailDataJS || chartDetailDataJS.length === 0) {
          return <View style={{height: this.props.height, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[{ color: theme.lightGray }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>No Results</Text>
          </View>
        }

        const parsedData = parseLargeGraphData(this.props.data, this.props.height, this.props.width, indicatorsListJS, theme);
        // console.log('---- parsed Data', parsedData);

        let inlineContainerStyle = {
            height: this.props.height
        }

        let polygonsList = [];

        let renderIHCI = false;
        if(indicatorsListJS.indexOf('ICHI') > -1 && parsedData.ichiCloudLines.length === 2) {
          renderIHCI = true;
        }

        if(renderIHCI) {
          polygonsList = generatePolygonsFromTwoLines(parsedData.ichiCloudLines[0], parsedData.ichiCloudLines[1], this.props.height);
        }

        console.log('POLYGONGS', polygonsList)

        const generateGraphPolygonFill = (elem, key) => {

            if(!renderIHCI) {
              return null;
            }

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
                  // grey background lines horizontal
                  return this.generateYLineGroup(elem, i)
                })}

                {parsedData.gridXArray.map((elem, i) => {
                  // grey background lines vertical
                  return this.generateXLineGroup(elem, i)
                })}

                {parsedData.dataPoints.map((elem, i) => {
                  // candlestick graph
                  return this.generateCandlestickBars(elem, i)
                })}

                {parsedData.formattedLines.map((elem, i) => {
                  return this.generateGraphPolygon(elem, i)
                })}

                {parsedData.ichiCloudLines.map((elem, i) => {
                  return this.generateGraphPolygon(elem, i)
                })}

                {polygonsList.map((elem, i) => {
                  return generateGraphPolygonFill(elem, i)
                })}

                {this.renderBottomVolumeLines(parsedData)}

            </Svg>
        </View>
    }
}

//


//

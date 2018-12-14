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
              key={ Math.random() + key + 'zero-axis' }
              x1={ position }
              x2={ position }
              y1={ '0%' }
              y2={ '85%' }
              stroke={ theme.borderGray }
              strokeDasharray={ [ 4, 8 ] }
              strokeWidth={ 1 }
            />
            <TextSvg
              key={Math.random() + key}
              fontSize={12}
              fill={theme.chartLandscapeLabel}
              stroke={theme.chartLandscapeLabel}
              strokeWidth={0.25}
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
            key={ Math.random() + key + 'zero-axis' }
            y1={ position }
            y2={ position }
            x1={ '0%' }
            x2={ '88%' }
            stroke={ theme.borderGray }
            strokeDasharray={ [ 4, 8 ] }
            strokeWidth={ 1 }
          />
          <TextSvg
            key={Math.random() + key}
            fontSize={12}
            fill={theme.chartLandscapeLabel}
            stroke={theme.chartLandscapeLabel}
            strokeWidth={0.25}
            x={'94%'}
            y={ position + verticalOffset}
            textAnchor="middle"
          >
            {label} 
          </TextSvg>
        </G>
    }

    generateCandlestickBars(params, key) {
        const { theme } = colorStore;

        // disqualify before rendering errors
        let disqualified = false;
        if(params.open === -1 ||
          params.close === -1 ||
          params.high === -1 ||
          params.low === -1 ||
          params.open === undefined ||
          params.close === undefined ||
          params.high === undefined ||
          params.low === undefined
        ) {
          disqualified = true;
        }
        if(disqualified) {
          return null;
        }

        let thickLineTop = params.closeYPositionCoordinates;
        let thickLineBottom = params.openYPositionCoordinates
        let color = theme.green;
        if(params.close <= params.open) {
          color = theme.red;
          thickLineTop = params.openYPositionCoordinates;
          thickLineBottom = params.closeYPositionCoordinates;
        }

        // edit this one
        let lineWidth = 2;

        // these are relative calculations
        let thinLineWidth = lineWidth / 2;
        let thickLineWidth = lineWidth * 2;

        return <G key={key}>
          {/* Thin line -  high / low */}
          <Rect
            key={Math.random() + key}
            x={params.xPositionCoordinates - (thinLineWidth / 2) + 3}
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
            x={params.xPositionCoordinates - (thickLineWidth / 2) + 3}
            y={thickLineBottom}
            key={Math.random() + key}
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
      // console.log('params for graph', params)
      if(!formattedData) {
        return null;
      }

      if (lineTargetValue === 'bol.middle') {
        return <Polyline
          key={Math.random() + key}
          points={formattedData}
          fill={'none'}
          stroke={params.color}
          strokeWidth={2}
          strokeDasharray={[5, 5]}
          strokeLinejoin={'round'}
          opacity={.8}
        />
      } else {
        return <Polyline
          key={Math.random() + key}
          points={formattedData}
          fill={'none'}
          stroke={params.color}
          strokeWidth={2}
          strokeLinejoin={'round'}
          opacity={.8}
        />
      }
    }

    generateVerticalBottomBars(params, key) {
      let barWidth = 4;
      return <Rect
        x={params.xCoord - (barWidth / 2) + 3}
        y={params.yCoord}
        width={barWidth}
        key={Math.random() + key}
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

        let range = chartStore.range;
        const parsedData = parseLargeGraphData(this.props.data, this.props.height, this.props.width, indicatorsListJS, theme, range);
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

        // console.log('POLYGONGS', polygonsList)

        const generateGraphPolygonFill = (elem, key) => {

            if(!renderIHCI) {
              return null;
            }

            let points = elem.points;
            let color = theme.green;
            if(elem.positive) {
                color = theme.red;
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

        const renderPolygonsListOrNull = (polyGonList) => {
          if(!polyGonList) {
            return null;
          } else {
            return polygonsList.map((elem, i) => {
              return generateGraphPolygonFill(elem, i)
            })
          }
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

                {renderPolygonsListOrNull(polygonsList)}

                {this.renderBottomVolumeLines(parsedData)}

            </Svg>
        </View>
    }
}

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
} from 'react-native-svg'


class HorizontalLine extends React.Component {

  render() {
    const { theme } = colorStore;

    let yVal = this.props.yVal;

    let lineYVal = 0;
    let boxWidth = 50;
    let boxHeight = 9;
    let pointOffset = 10;
    let xPosition = 5;

    let textLeftOffset = 5;
    let textTopOffset = boxHeight * .42;

    let topLeftCorner = (xPosition) + ',' + (lineYVal - boxHeight);
    let topRightCorner = (xPosition + boxWidth) + ',' + (lineYVal - boxHeight);
    let rightPointPosition =  (xPosition + boxWidth + pointOffset) + ',' + (lineYVal);
    let bottomRightCorner = (xPosition + boxWidth) + ',' + (lineYVal + boxHeight);
    let bottomLeftCorner = (xPosition) + ',' + (lineYVal + boxHeight);

    return <Svg
      height={this.props.height}
      width={200}
    >
      <Defs>
          <G id="horizontal_line_element">
              <G>
                <Line
                    key={ 'zero-axis' }
                    x1={ '0%' }
                    x2={ '100%' }
                    y1={ 0 }
                    y2={ 0 }
                    stroke={ theme.borderGray }
                    strokeDasharray={ [ 4, 8 ] }
                    strokeWidth={ 1 }
                />
                <Polygon
                  points={`${topLeftCorner} ${topRightCorner} ${rightPointPosition} ${bottomRightCorner} ${bottomLeftCorner}`}
                  fill={theme.borderGray}
                  stroke={theme.borderGray}
                  strokeWidth="1"
                />
                <TextSvg
                  fontSize={12}
                  fill={theme.white}
                  stroke={theme.white}
                  y={textTopOffset}
                  x={boxWidth / 2 + textLeftOffset}
                  textAnchor="middle"
                >
                  {yVal}
                </TextSvg>
              </G>
          </G>
      </Defs>
      <Use href="#horizontal_line_element" x={0} y={yVal}/>
    </Svg>
  }
}



@observer
export default class ChartGraph extends React.Component {

  constructor(props) {
    super(props);
    this.height = this.props.height;
    this.width = this.props.width;
    this.state = {
    }
  }

  renderSmallGraph() {
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

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

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
  

  renderLargeGraph() {
    const { theme } = colorStore;
    
    
    let inlineContainerStyle = {
      borderWidth: 1,
      borderColor: 'red',
      flex: 1,
      height: 200
    }
    
    let gridXArray = [10, 50, 100, 150];
    let gridYArray = [10, 50, 100, 150]


    let lineYVal = 0;
    let boxWidth = 50;
    let boxHeight = 9;
    let pointOffset = 10;
    let xPosition = 5;

    let textLeftOffset = 5;
    let topOffset = 2;
    
    const generateXLineGroup = (number) => {
      return <G>
          <G>
            <Line
                key={ 'zero-axis' }
                x1={ '0%' }
                x2={ '92%' }
                y1={ number }
                y2={ number }
                stroke={ theme.borderGray }
                strokeDasharray={ [ 4, 8 ] }
                strokeWidth={ 1 }
            />
            <TextSvg
              fontSize={12}
              fill={theme.borderGray}
              stroke={theme.borderGray}
              y={number + topOffset}
              x={'95%'}
              textAnchor="middle"
            >
              {number}
            </TextSvg>
          </G>
      </G>
    }
    
    const generateYLineGroup = (number) => {
      return <G>
            <Line
                key={ 'zero-axis' }
                x1={ number }
                x2={ number }
                y1={ '0%' }
                y2={ '50%' }
                stroke={ theme.borderGray }
                strokeDasharray={ [ 4, 8 ] }
                strokeWidth={ 1 }
            />
            <TextSvg
              fontSize={12}
              fill={theme.borderGray}
              stroke={theme.borderGray}
              y={'54%'}
              x={number}
              textAnchor="middle"
            >
              {number}
            </TextSvg>
      </G>
    }

    let barDataList = [
      {
        xPosition: 10,
        hardTop: 100,
        hardBottom: 10,
        softTop: 50,
        softBottom: 100,
        color: theme.red
      },
      {
        xPosition: 30,
        hardTop: 200,
        hardBottom: 80,
        softTop: 80,
        softBottom: 40,
        color: theme.green
      },
      {
        xPosition: 200,
        hardTop: 300,
        hardBottom: 80,
        softTop: 180,
        softBottom: 90,
        color: theme.green
      },
    ]

    let thinLineWidth = 1;
    let thickLineWidth = 5;

    const generateBarLine = (params) => {
      return <G>
        <Rect
            x={params.xPosition - (thickLineWidth / 2)}
            y={params.softTop}
            width={thickLineWidth}
            height={params.softBottom - params.softTop}
            fill={params.color}
            strokeWidth={'1'}
            stroke={params.color}
        />
        <Rect
            x={params.xPosition - (thinLineWidth / 2)}
            y={params.hardTop}
            width={thinLineWidth}
            height={params.hardBottom - params.hardTop}
            fill={params.color}
            strokeWidth={'1'}
            stroke={params.color}
        />
      </G>
    }
    
    let lineList = [
      
      {
        lineTitle: 'Test line 1',
        color: theme.red,
        lineData: [{
          x: 0, y: 0
        },
        {
          x: 100, y: 100
        },
        {
          x: 150, y: 0
        }]
      },
      
      {
        lineTitle: 'Test line 1',
        color: theme.green,
        lineData: [{
          x: 0, y: 30
        },
        {
          x: 50, y: 10
        },
        {
          x: 300, y: 80
        }]
      }
      
    ]
    
    const generateLine = (params) => {
      let points = "0,0";
      
      params.lineData.map((elem, i) => {
        console.log('each line data', elem);
        points += ` ${elem.x},${elem.y}`
      })
      
      return <Polyline
          points={points}
          fill={'none'}
          stroke={params.color}
          strokeWidth={2}
      />
    }
    
    
    return <View style={inlineContainerStyle}>
      <Svg
        height={'100%'}
        width={'100%'}
      >
        {gridYArray.map((elem, i) => {
          return generateYLineGroup(elem)
        })}
        {gridXArray.map((elem, i) => {
          return generateXLineGroup(elem)
        })}

        {barDataList.map((elem, i) => {
          return generateBarLine(elem)
        })}
        
        {lineList.map((elem, i) => {
          return generateLine(elem)
        })}
        

      </Svg>
    </View>
  }


  




  renderLargeGraphOrSmallGraph() {
    if(this.props.viewLargeGraph) {
      return this.renderLargeGraph()
    } else {
      return this.renderSmallGraph()  
    }
  }

  render() {
    let inlineStyle = {
      // borderWidth: 1,
      // borderColor: 'red',
      width: '100%',
      height: '100%',
      position: 'relative'
    }
    return <View style={inlineStyle}>
      {this.renderLargeGraphOrSmallGraph()}
    </View>
  }
}

// <ResponsiveImage 
//   source={require('../images/landscapechart_ichi.png')}
//   style={chartland.landscapeChart}
//   initWidth="480"
//   initHeight="287"                
// />

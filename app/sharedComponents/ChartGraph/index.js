import React from 'react';
import {
  View,
  Text,
  Animated
} from 'react-native';
import { colorStore } from '../../mobxStores/index';
import { observer } from 'mobx-react';
import watchstyle from '../../style/watchlist';
import fonts from '../../style/fonts';
import ResponsiveImage from 'react-native-responsive-image';
import chart from '../../style/chart';
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

import LargeGraph from './LargeGraph';
import SmallGraph from './SmallGraph';


// class HorizontalLine extends React.Component {
//
//   render() {
//     const { theme } = colorStore;
//
//     let yVal = this.props.yVal;
//
//     let lineYVal = 0;
//     let boxWidth = 50;
//     let boxHeight = 9;
//     let pointOffset = 10;
//     let xPosition = 5;
//
//     let textLeftOffset = 5;
//     let textTopOffset = boxHeight * .42;
//
//     let topLeftCorner = (xPosition) + ',' + (lineYVal - boxHeight);
//     let topRightCorner = (xPosition + boxWidth) + ',' + (lineYVal - boxHeight);
//     let rightPointPosition =  (xPosition + boxWidth + pointOffset) + ',' + (lineYVal);
//     let bottomRightCorner = (xPosition + boxWidth) + ',' + (lineYVal + boxHeight);
//     let bottomLeftCorner = (xPosition) + ',' + (lineYVal + boxHeight);
//
//     return <Svg
//       height={this.props.height}
//       width={200}
//     >
//       <Defs>
//           <G id="horizontal_line_element">
//               <G>
//                 <Line
//                     key={ 'zero-axis' }
//                     x1={ '0%' }
//                     x2={ '100%' }
//                     y1={ 0 }
//                     y2={ 0 }
//                     stroke={ theme.borderGray }
//                     strokeDasharray={ [ 4, 8 ] }
//                     strokeWidth={ 1 }
//                 />
//                 <Polygon
//                   points={`${topLeftCorner} ${topRightCorner} ${rightPointPosition} ${bottomRightCorner} ${bottomLeftCorner}`}
//                   fill={theme.borderGray}
//                   stroke={theme.borderGray}
//                   strokeWidth="1"
//                 />
//                 <TextSvg
//                   fontSize={12}
//                   fill={theme.white}
//                   stroke={theme.white}
//                   y={textTopOffset}
//                   x={boxWidth / 2 + textLeftOffset}
//                   textAnchor="middle"
//                 >
//                   {yVal}
//                 </TextSvg>
//               </G>
//           </G>
//       </Defs>
//       <Use href="#horizontal_line_element" x={0} y={yVal}/>
//     </Svg>
//   }
// }



@observer
export default class Index extends React.Component {

  constructor(props) {
    super(props);


    this.smallGraphData = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];

    this.state = {
      height: 0,
      width: 0
    }

  }

  // smallGraphData() {
  //
  // }

  // largeGraphBarData() {
  //   const { theme } = colorStore;
  //   return [
  //     {
  //       xPosition: 10,
  //       hardTop: 100,
  //       hardBottom: 10,
  //       softTop: 50,
  //       softBottom: 100,
  //       color: theme.red
  //     },
  //     {
  //       xPosition: 30,
  //       hardTop: 200,
  //       hardBottom: 80,
  //       softTop: 80,
  //       softBottom: 40,
  //       color: theme.green
  //     },
  //     {
  //       xPosition: 200,
  //       hardTop: 300,
  //       hardBottom: 80,
  //       softTop: 180,
  //       softBottom: 90,
  //       color: theme.green
  //     },
  //   ]
  // }
  //
  // getLineList() {
  //   const { theme } = colorStore;
  //   return [
  //     {
  //       lineTitle: 'Test line 1',
  //       color: theme.red,
  //       lineData: [
  //         {
  //           x: 0, y: 50
  //         },
  //         {
  //           x: 50, y: 100
  //         },
  //         {
  //           x: 100, y: 400
  //         },
  //         {
  //           x: 150, y: 250
  //         },
  //         {
  //           x: 200, y: 500
  //         },
  //         {
  //           x: 250, y: 0
  //         },
  //         {
  //           x: 300, y: 100
  //         }
  //       ]
  //     },
  //
  //     {
  //       lineTitle: 'Test line 1',
  //       color: theme.green,
  //       lineData: [
  //         {
  //           x: 0, y: 400
  //         },
  //         {
  //           x: 50, y: 200
  //         },
  //         {
  //           x: 100, y: 300
  //         },
  //         {
  //           x: 150, y: 150
  //         },
  //         {
  //           x: 200, y: 50
  //         },
  //         {
  //           x: 250, y: 100
  //         },
  //         {
  //           x: 300, y: 150
  //         }
  //       ]
  //     }
  //   ]
  // }


  // renderLargeGraph() {
  //   const { theme } = colorStore;
  //
  //
  //   let inlineContainerStyle = {
  //     borderWidth: 1,
  //     borderColor: 'red',
  //     flex: 1,
  //     height: 200
  //   }
  //
  //   let gridXArray = [];
  //   let gridYArray = [];
  //
  //   let lineCount = 8;
  //
  //   for(let i = 0; i < lineCount; i++) {
  //     let multiplier = i / lineCount;
  //     gridXArray.push(this.state.width * multiplier);
  //     gridYArray.push(this.state.height * multiplier);
  //   }
  //
  //   let lineYVal = 0;
  //   let boxWidth = 50;
  //   let boxHeight = 9;
  //   let pointOffset = 10;
  //   let xPosition = 5;
  //
  //   let textLeftOffset = 5;
  //   let topOffset = 2;
  //
  //   const generateXLineGroup = (number) => {
  //     let formattednumber = number.toFixed(1);
  //     return <G>
  //         <G>
  //           <Line
  //               key={ 'zero-axis' }
  //               x1={ '0%' }
  //               x2={ '92%' }
  //               y1={ number }
  //               y2={ number }
  //               stroke={ theme.borderGray }
  //               strokeDasharray={ [ 4, 8 ] }
  //               strokeWidth={ 1 }
  //           />
  //           <TextSvg
  //             fontSize={12}
  //             fill={theme.borderGray}
  //             stroke={theme.borderGray}
  //             y={number + topOffset}
  //             x={'95%'}
  //             textAnchor="middle"
  //           >
  //             {formattednumber}
  //           </TextSvg>
  //         </G>
  //     </G>
  //   }
  //
  //   const generateYLineGroup = (number) => {
  //     let formattednumber = number.toFixed(1);
  //     return <G>
  //           <Line
  //               key={ 'zero-axis' }
  //               x1={ number }
  //               x2={ number }
  //               y1={ '0%' }
  //               y2={ '50%' }
  //               stroke={ theme.borderGray }
  //               strokeDasharray={ [ 4, 8 ] }
  //               strokeWidth={ 1 }
  //           />
  //           <TextSvg
  //             fontSize={12}
  //             fill={theme.borderGray}
  //             stroke={theme.borderGray}
  //             y={'54%'}
  //             x={number}
  //             textAnchor="middle"
  //           >
  //             {formattednumber}
  //           </TextSvg>
  //     </G>
  //   }
  //
  //   let barDataList = this.largeGraphBarData();
  //
  //   let thinLineWidth = .5;
  //   let thickLineWidth = 8;
  //
  //   const generateBarLine = (params) => {
  //     return <G>
  //       <Rect
  //           x={params.xPosition - (thickLineWidth / 2)}
  //           y={params.softTop}
  //           width={thickLineWidth}
  //           height={params.softBottom - params.softTop}
  //           fill={params.color}
  //           strokeWidth={'3'}
  //           stroke={params.color}
  //           strokeLinejoin={'round'}
  //       />
  //       <Rect
  //           x={params.xPosition - (thinLineWidth / 2)}
  //           y={params.hardTop}
  //           width={thinLineWidth}
  //           height={params.hardBottom - params.hardTop}
  //           fill={params.color}
  //           strokeWidth={'2'}
  //           stroke={params.color}
  //           strokeLinejoin={'round'}
  //       />
  //     </G>
  //   }
  //
  //   let lineList = this.getLineList();
  //
  //   const generateLine = (params) => {
  //     let points = "0,0";
  //
  //     params.lineData.map((elem, i) => {
  //       console.log('each line data', elem);
  //       points += ` ${elem.x},${elem.y}`
  //     })
  //
  //     return <Polyline
  //         points={points}
  //         fill={'none'}
  //         stroke={params.color}
  //         strokeWidth={2}
  //         strokeLinejoin={'round'}
  //     />
  //   }
  //
  //   const generateFillPolygon = (x1, y1, x2, y2) => {
  //     console.log('Generate fill polygon', x1, y1, x2, y2);
  //
  //   }
  //
  //
  //   return <View style={inlineContainerStyle}>
  //     <Svg
  //       height={'100%'}
  //       width={'100%'}
  //     >
  //
  //       {gridYArray.map((elem, i) => {
  //         return generateYLineGroup(elem)
  //       })}
  //       {gridXArray.map((elem, i) => {
  //         return generateXLineGroup(elem)
  //       })}
  //
  //       {barDataList.map((elem, i) => {
  //         return generateBarLine(elem)
  //       })}
  //
  //       {lineList.map((elem, i) => {
  //         return generateLine(elem)
  //       })}
  //
  //     </Svg>
  //   </View>
  // }




  renderLargeGraphOrSmallGraph() {
    if(this.props.viewLargeGraph) {
      return <LargeGraph height={this.state.height} width={this.state.width} {...this.props}/>
    } else {
      return <SmallGraph height={this.state.height} width={this.state.width} {...this.props}/>
    }
  }

  onLayout(event) {
    const {x, y, width, height} = event.nativeEvent.layout;
    this.setState({
      height: height,
      width: width
    })
  }

  render() {
    let inlineStyle = {
      borderWidth: 1,
      borderColor: 'red',
      width: '100%',
      height: '100%',
      position: 'relative'
    }
    return <View style={inlineStyle} onLayout={(event) => this.onLayout(event)}>
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

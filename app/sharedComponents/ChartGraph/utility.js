import { checkIntersection } from "line-intersect";
import moment from 'moment';

export const flipYAxisValue = (height, inverseY) => {
    return height - inverseY;
}

export const generatePolygonsFromTwoLines = (line1, line2, height) => {
    let polyGonList = [];

    // Make sure we actually have the right data
    if(!line1 || !line2) {
        return null;
    }

    // And that it's the correct length
    if(line1.lineData.length !== line2.lineData.length) {
        return null;
    }

    let data1 = line1.lineData;
    let data2 = line2.lineData;

    // Reminder
    // Lines must have points normalized at similiar distances on the x axis for this to work

    let length = data1.length;

    // let debugMode = true;
    // if(debugMode) {
    //     length = 2;
    // }

    for( let i = 0; i < data1.length; i++ ) {

        if(i === data1.length - 1) {
            // Don't do the calulation if we don't have a 'next' data to calculate agains
            break;
        }

        let lineSegment1 = [
            {x: data1[i].x,   y: data1[i].y},
            {x: data1[i+1].x, y: data1[i+1].y},
        ]

        let lineSegment2 = [
            {x: data2[i].x,   y: data2[i].y},
            {x: data2[i+1].x, y: data2[i+1].y},
        ]


        // console.log('LINE 1 start')
        // console.log(lineSegment1[0].x)
        // console.log(lineSegment1[0].y)
        // console.log('LINE 1 end')
        // console.log(lineSegment1[1].x)
        // console.log(lineSegment1[1].y)
        //
        // console.log('LINE 2 start')
        // console.log(lineSegment2[0].x)
        // console.log(lineSegment2[0].y)
        // console.log('LINE 2 end')
        // console.log(lineSegment2[1].x)
        // console.log(lineSegment2[1].y)


        let intersection = checkIntersection(
            lineSegment1[0].x, lineSegment1[0].y, lineSegment1[1].x, lineSegment1[1].y,
            lineSegment2[0].x, lineSegment2[0].y, lineSegment2[1].x, lineSegment2[1].y
        )

        let point1 = `${lineSegment1[0].x},${flipYAxisValue(height, lineSegment1[0].y)}`;
        let point2 = `${lineSegment1[1].x},${flipYAxisValue(height, lineSegment1[1].y)}`;
        let point3 = `${lineSegment2[1].x},${flipYAxisValue(height, lineSegment2[1].y)}`;
        let point4 = `${lineSegment2[0].x},${flipYAxisValue(height, lineSegment2[0].y)}`;

        // console.log('point1', point1)
        // console.log('point2', point2)
        // console.log('point3', point3)
        // console.log('point4', point4)

        // if there is no intersection, of if the intersection is an origin point
        if(intersection.type !== 'intersecting') {
            let thisPolygonPoints = `${point1}  ${point2} ${point3} ${point4}`
            let data = {
                positive: point1 > point4 ? true : false,
                points: thisPolygonPoints
            }
            console.log('no intserection', thisPolygonPoints)
            polyGonList.push(data);

        } else {
            let intersectionPoint = `${intersection.point.x},${flipYAxisValue(height, intersection.point.y)}`;

            let thisPolygonPointsLeft = `${point1} ${intersectionPoint} ${point4}`
            let data1 = {
                positive: point1 > point4 ? true : false,
                points: thisPolygonPointsLeft
            }
            polyGonList.push(data1);

            let thisPolygonPointsRightSide = `${point2} ${intersectionPoint} ${point3}`
            let data2 = {
                positive: point3 < point2 ? true : false,
                points: thisPolygonPointsRightSide
            }
            polyGonList.push(data2);
        }
    }
    return polyGonList;
}

export const parseSmallGraphData = (data) => {

    let graphMax = 0;
    let graphMin = 999999999999999;

    let lineData = [];
    let dateData = [];

    for(let i = 0; i < data.length; i++) {
        // console.log('eavh elem', data[i])
        let thisClosePoint = data[i].close;
        if(thisClosePoint > graphMax) {
            graphMax = thisClosePoint
        }
        if(thisClosePoint < graphMin) {
            graphMin = thisClosePoint
        }
        lineData.push(data[i].close);
        dateData.push(data[i].date);
    }

    return {
        graphMax: graphMax,
        graphMin: graphMin,
        lineData: lineData,
        dateData: dateData
    }
}

export const parseLargeGraphData = (inputData, height, width) => {

    let allGraphData = {
        xMax: 0,
        xMin: 99999999999999999999999,
        yMax: 0,
        yMin: 99999999999999999999999,
        data: inputData,
        gridYArray: [],
        gridXArray: [],
        xLineCount: 3,
        yLineCount: 8
    };

    // add date stamp and calculate maximums and minimums
    inputData.map((elem, i) => {
      // console.log('elem', elem, i)
      elem.dateUnix = parseInt(moment(elem.date).format('X'));

      // calculate min and max
      // time / x value
      if( elem.dateUnix > allGraphData.xMax ) allGraphData.xMax = elem.dateUnix;
      if( elem.dateUnix < allGraphData.xMin ) allGraphData.xMin = elem.dateUnix;
      // vwap
      if( elem.vwap > allGraphData.yMax ) allGraphData.yMax = elem.vwap;
      if( elem.vwap < allGraphData.yMin ) allGraphData.yMin = elem.vwap;
      // open
      if( elem.open > allGraphData.yMax ) allGraphData.yMax = elem.open;
      if( elem.open < allGraphData.yMin ) allGraphData.yMin = elem.open;
      // close
      if( elem.close > allGraphData.yMax ) allGraphData.yMax = elem.close;
      if( elem.close < allGraphData.yMin ) allGraphData.yMin = elem.close;
      // high
      if( elem.high > allGraphData.yMax ) allGraphData.yMax = elem.high;
      if( elem.high < allGraphData.yMin ) allGraphData.yMin = elem.high;
      // low
      if( elem.low > allGraphData.yMax ) allGraphData.yMax = elem.low
      if( elem.low < allGraphData.yMin ) allGraphData.yMin = elem.low
    })

     // add relative positional data to all pertinent points
     allGraphData.data.map((elem, i) => {
       elem.xPosition = elem.dateUnix / allGraphData.xMax;
       elem.openYPosition = elem.open / allGraphData.yMax;
       elem.closeYPosition = elem.close / allGraphData.yMax;
       elem.highYPosition = elem.high / allGraphData.yMax;
       elem.lowYPosition = elem.low / allGraphData.yMax;
       // console.log('each elem', elem)
     })

     console.log('height width', height, width)
    // TODO: ask ben if I can do this in the same linear time. Calculate max and min and assemble all data in a relative sense



    // generate grid x and y bars

    for(let i = 0; i < allGraphData.yLineCount; i++) {
        let multiplier = i / allGraphData.yLineCount;
        // for y lines
        let yPosition = ((allGraphData.yMax * multiplier) / allGraphData.yMax ) * height;
        let yObj = {
          label: flipYAxisValue( height, yPosition ),
          position: flipYAxisValue( height, yPosition )
        }
        allGraphData.gridYArray.push(yObj);
    }

    for(let j = 0; j < allGraphData.xLineCount; j++) {

      // let spaceBetweenEachLine = width / allGraphData.xLineCount;
      // let lineOffest = spaceBetweenEachLine / 2;
      // console.log('--- space offset', spaceBetweenEachLine, lineOffest)

      let multiplier = j / allGraphData.xLineCount;
      // for x lines
      let xPosition = ((allGraphData.xMax * multiplier) / allGraphData.xMax ) * width;
      let xObj = {
        label: xPosition,
        position: xPosition
      }
      console.log('--------- x line', xObj)
      allGraphData.gridXArray.push(xObj);
    }



    return allGraphData
}
































//

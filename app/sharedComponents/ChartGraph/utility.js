import { checkIntersection } from "line-intersect";
import moment from 'moment';
import { indicatorDataMap } from '../../constants';

Object.byString = (o, s) => {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

export const flipYAxisValue = (height, inverseY) => {
  return height - inverseY;
}

export const generatePolygonsFromTwoLines = (lineA, lineB, height) => {
    let polyGonList = [];

    // Make sure we actually have the right data
    if(!lineA || !lineB) {
        return null;
    }

    // Get the line data, formatted like this: '123,432 543,234 etc..'
    // put it back into an object notation and parse strings to floats
    let objectFormatter = (elem, i) => {
      let entry = elem.split(',');
      return {
        x: parseFloat(entry[0]),
        y: parseFloat(entry[1])
      }
    }

    let objectFormattedLine1 = lineA.formattedLineData.split(' ').map((elem, i) => objectFormatter(elem, i));
    let objectFormattedLine2 = lineB.formattedLineData.split(' ').map((elem, i) => objectFormatter(elem, i));

    // And that it's the correct length
    if(objectFormattedLine1.length !== objectFormattedLine2.length) {
        return null;
    }

    let data1 = objectFormattedLine1;
    let data2 = objectFormattedLine2;

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

        let point1 = `${lineSegment1[0].x},${lineSegment1[0].y}`;
        let point2 = `${lineSegment1[1].x},${lineSegment1[1].y}`;
        let point3 = `${lineSegment2[1].x},${lineSegment2[1].y}`;
        let point4 = `${lineSegment2[0].x},${lineSegment2[0].y}`;

        // console.log('point1', point1)
        // console.log('point2', point2)
        // console.log('point3', point3)
        // console.log('point4', point4)

        let point1YVal = parseFloat(point1.split(',')[1]);
        let point2YVal = parseFloat(point2.split(',')[1]);
        let point3YVal = parseFloat(point3.split(',')[1]);
        let point4YVal = parseFloat(point4.split(',')[1]);

        // console.log('point1YVal', point1YVal)
        // console.log('point2YVal', point2YVal)
        // console.log('point3YVal', point3YVal)
        // console.log('point4YVal', point4YVal)

        // if there is no intersection, of if the intersection is an origin point
        if(intersection.type !== 'intersecting') {
            let thisPolygonPoints = `${point1} ${point2} ${point3} ${point4}`
            let data = {
                positive: point4YVal > point1YVal ? true : false,
                points: thisPolygonPoints
            }
            polyGonList.push(data);

        } else {
            // Generate left side of intersection
            let intersectionPoint = `${intersection.point.x},${intersection.point.y}`;
            let thisPolygonPointsLeft = `${point1} ${intersectionPoint} ${point4}`
            // console.log('polygon points left: ', thisPolygonPointsLeft);
            let data1 = {
                positive: point4YVal > point1YVal ? true : false,
                points: thisPolygonPointsLeft
            }
            polyGonList.push(data1);

            // Generate right side of intersection
            let thisPolygonPointsRightSide = `${point2} ${intersectionPoint} ${point3}`
            // console.log('polygon points right', thisPolygonPointsRightSide)
            let data2 = {
                positive: point3YVal > point2YVal ? true : false,
                points: thisPolygonPointsRightSide
            }
            polyGonList.push(data2);
        }
    }
    return polyGonList;
}

/////////////////////////////////////////////////////////////////////

export const parseSmallGraphData = (data, Price, graphHeight) => {

    let d = {
      yMax: 0,
      yMin: 9999999999999999999,
      yRange: 0,
      lineData: [],
      dateData: [],
      priceLineHeight: 0
    }


    for(let i = 0; i < data.length; i++) {
      const thisClosePoint = data[i].close;
      // get y max and min
      if(thisClosePoint > d.yMax) {
        d.yMax = thisClosePoint
      }
      if(thisClosePoint < d.yMin) {
        d.yMin = thisClosePoint
      }
    }

    for(let i = 0; i < data.length; i++) {
      d.lineData.push(data[i].close + d.yMin);
      d.dateData.push(data[i].date);
    }

    // Set range
    d.yRange = d.yMax - d.yMin;

    // calculate price line
    let minAdjustedPrice = Price - d.yMin;
    let minAdjustedMax = d.yMax - d.yMin;

    let priceRelativePosition = minAdjustedPrice / minAdjustedMax;
    d.priceLineHeight = (priceRelativePosition * d.yRange)  + d.yMin;

    // console.log('------- max min graphhehgt', d.yMax, d.yMin, d.priceLineHeight, graphHeight)

    return d;
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const parseLargeGraphData = (inputData, height, width, indicatorsList, theme) => {

    let d = {
      xMax: 0,
      xMin: 99999999999999999999999,
      yMax: 0,
      yMin: 99999999999999999999999,
      dataPoints: inputData,
      gridYArray: [],
      gridXArray: [],
      xLineCount: 5,
      yLineCount: 4,
      xRange: 0,
      yRange: 0,
      formattedLines: [],
      volumeMin: 9999999999999999999999,
      volumeMax: 0,
      ichiCloudLines: []
    };

    const manipulateXMaxMin = (input) => {
      if( input > d.xMax ) d.xMax = input;
      if( input < d.xMin ) d.xMin = input;
    }

    const manipulateYMaxMin = (input) => {
      if( input > d.yMax ) d.yMax = input;
      if( input < d.yMin ) d.yMin = input;
    }

    const manipulateVolumeMaxMin = (input) => {
      if( input > d.volumeMax ) d.volumeMax = input;
      if( input < d.volumeMin ) d.volumeMin = input;
    }

    // check if any of the values contain a null value
    // prevent them from rendering if that is the case
    // we don't want to ever reference a null variable
    // in the line rendering functions

    let bolHasNullValue = false;
    let emaHasNullValue = false;
    let rsiHasNullValue = false;
    let volumeHasNullValue = false;
    let ichiHasNullValue = false;
    let obvHasNullValue = false;

    d.dataPoints.forEach((elem, i) => {
      if(elem.bol === null) {
        bolHasNullValue = true;
      }
      if(elem.rsi === null) {
        rsiHasNullValue = true;
      }
      if(elem.ema === null) {
        emaHasNullValue = true;
      }
      if(elem.volume === null) {
        volumeHasNullValue = true;
      }
      if(elem.ichi === null) {
        ichiHasNullValue = true;
      }
      if(elem.obv === null) {
        obvHasNullValue = true;
      }
    })

    // setup render variables
    let renderBol = false;
    let renderEma = false;
    let renderRsi = false;
    let renderVolume = false;
    let renderIchi = false;
    let renderObv = false;

    // add date stamp and calculate maximums and minimums
    d.dataPoints = d.dataPoints.map((elem, i) => {
      // console.log('======= ELEM', elem)

      // if data is valid, check for indicator list and set render variables
      if(!rsiHasNullValue) {
        renderRsi = indicatorsList.indexOf('RSI') > -1;
      }
      if(!bolHasNullValue) {
        renderBol = indicatorsList.indexOf('BOL') > -1;
      }
      if(!emaHasNullValue) {
        renderEma = indicatorsList.indexOf('EMA') > -1;
      }
      if(!volumeHasNullValue) {
        renderVolume = indicatorsList.indexOf('VLM') > -1;
      }
      if(!ichiHasNullValue) {
        renderIchi = indicatorsList.indexOf('ICHI') > -1;
      }
      if(!obvHasNullValue) {
        renderObv = indicatorsList.indexOf('OBV') > -1;
      }

      let dateUnix = null;
      if(elem.minute) {
        // handle parsing with minutes
        dateUnix = parseInt( moment(elem.date + ' ' + elem.minute, "YYYYMMDD HH:mm").format('X') );
      } else {
        // handle standard date stamps
        dateUnix = parseInt( moment(elem.date, 'YYYYMMDD').format('X') );
      }

      // calculate min and max
      // time / x value
      manipulateXMaxMin(dateUnix)
      manipulateYMaxMin(elem.vwap);
      manipulateYMaxMin(elem.open);
      manipulateYMaxMin(elem.close);
      manipulateYMaxMin(elem.high);
      manipulateYMaxMin(elem.low);

      // conditional rendering based on indicators menu
      if(renderEma) {
        manipulateYMaxMin(elem.ema);
      }
      if(renderRsi) {
        manipulateYMaxMin(elem.rsi);
      }
      if(renderBol) {
        manipulateYMaxMin(elem.bol.lower);
        manipulateYMaxMin(elem.bol.middle);
        manipulateYMaxMin(elem.bol.upper);
      }
      if(renderVolume) {
        manipulateVolumeMaxMin(elem.volume);
      }
      if(renderObv) {
        manipulateVolumeMaxMin(elem.obv)
      }

      return {
        ...elem,
        dateUnix
      }
    })

    // Save range
    d.xRange = d.xMax - d.xMin;
    d.yRange = d.yMax - d.yMin;

    // add relative and coordinate positional data to all pertinent points
    d.dataPoints = d.dataPoints.map((elem, i) => {
      const thisUnix = elem.dateUnix;
      const open = elem.open;
      const close = elem.close;
      const high = elem.high;
      const low = elem.low;
      // scaled values
      const thisXValScaled = thisUnix - d.xMin;
      const openPositionScaled = open - d.yMin;
      const closePositionScaled = close - d.yMin;
      const highPositionScaled = high - d.yMin;
      const lowPositionScaled = low - d.yMin;
      // relative values
      const xPositionRelative = thisXValScaled / d.xRange;
      const openYPositionRelative = openPositionScaled / d.yRange;
      const closeYPositionRelative = closePositionScaled / d.yRange;
      const highYPositionRelative = highPositionScaled / d.yRange;
      const lowYPositionRelative = lowPositionScaled / d.yRange;
      // actual coordinates
      const xPositionCoordinates = xPositionRelative * width;
      const openYPositionCoordinates = flipYAxisValue( height, openYPositionRelative * height );
      const closeYPositionCoordinates = flipYAxisValue( height, closeYPositionRelative * height );
      const highYPositionCoordinates = flipYAxisValue( height, highYPositionRelative * height );
      const lowYPositionCoordinates = flipYAxisValue( height, lowYPositionRelative * height );

      const newElem = {
        ...elem,
        xPositionRelative,
        openYPositionRelative,
        closeYPositionRelative,
        highYPositionRelative,
        lowYPositionRelative,
        xPositionCoordinates,
        openYPositionCoordinates,
        closeYPositionCoordinates,
        highYPositionCoordinates,
        lowYPositionCoordinates
      }
      return newElem
    });


    const generateLineData = (targetValue, color) => {
      let lineData = [];
      d.dataPoints.forEach((elem, i) => {
        let chosenValue = Object.byString(elem, targetValue);
        let xRel = (elem.dateUnix - d.xMin) / (d.xRange);
        let xCoord = xRel * width;
        let yRel = (chosenValue - d.yMin) / d.yRange;
        let yCoord = flipYAxisValue(height, yRel * height);
        lineData.push(`${xCoord},${yCoord}`)
      })
      let formattedLineData = lineData.join(' ')
      return {
        color: color,
        lineTargetValue: targetValue,
        formattedLineData: formattedLineData
      }
    }

    const generateRelativeLineData = (targetValue, color, max, min) => {
      let lineData = [];
      d.dataPoints.forEach((elem, i) => {
        let chosenValue = Object.byString(elem, targetValue);
        let xRel = (elem.dateUnix - d.xMin) / (d.xRange);
        let xCoord = xRel * width;
        let yRelative = ( chosenValue - min) / ( max - min);
        let graphYPosition = yRelative * height;
        let yCoord = flipYAxisValue(height, graphYPosition);
        lineData.push(`${xCoord},${yCoord}`)
      })

      let formattedLineData = lineData.join(' ')
      return {
        color: color,
        lineTargetValue: targetValue,
        formattedLineData: formattedLineData
      }
    }

    if(renderRsi) {
      d.formattedLines.push(generateLineData('rsi', theme.blue));
    }

    if(renderBol) {
      d.formattedLines.push(generateLineData('bol.lower', 'red'));
      d.formattedLines.push(generateLineData('bol.middle', 'green'));
      d.formattedLines.push(generateLineData('bol.upper', 'blue'));
    }

    if(renderEma) {
      d.formattedLines.push(generateLineData('ema', theme.blue));
    }
    if(renderVolume) {
      d.formattedLines.push(generateRelativeLineData('volume', theme.blue, d.volumeMax, d.volumeMin));
    }

    if(renderIchi) {
      d.ichiCloudLines.push(generateLineData('ichi.spanA', theme.green));
      d.ichiCloudLines.push(generateLineData('ichi.spanB', theme.red));
    }

    if(renderObv) {
      d.formattedLines.push(generateRelativeLineData('obv', theme.blue, d.volumeMax, d.volumeMin));
    }

    // Generate lines here
    // d.formattedLines.push(generateLineData('high', 'red'));
    // d.formattedLines.push(generateLineData('low', 'blue'));
    // d.formattedLines.push(generateLineData('open', 'green'));
    // d.formattedLines.push(generateLineData('close', 'orange'));
    // d.formattedLines.push(generateLineData('ema', 'orange'));
    // d.formattedLines.push(generateLineData('rsi', 'green'));
    // d.formattedLines.push(generateLineData('vwap', 'blue'));

    // generate grid x and y bars
    for( let i = 0; i < d.yLineCount; i++) {
      // for y lines
      let spaceBetweenEachLine = height / d.yLineCount;
      let lineOffset = spaceBetweenEachLine / 2;
      let multiplier = i / d.yLineCount;
      let yPosition = (((d.yMax * multiplier) / d.yMax ) * height) + lineOffset;
      let flippedYPosition = flipYAxisValue(height, yPosition);
      let relativeYPosition = flippedYPosition / height;
      let calculatedValue = (relativeYPosition * d.yRange) + d.yMin;
      let formattedLabel = '$' + calculatedValue.toFixed(2);
      const yObj = {
        label: formattedLabel,
        position: yPosition
      }
      d.gridYArray.push(yObj);
    }
    for( let j = 0; j < d.xLineCount; j++) {
      // for x lines
      let spaceBetweenEachLine = width / d.xLineCount;
      let lineOffest = spaceBetweenEachLine / 2;
      let multiplier = j / d.xLineCount;
      let xPosition = ((d.xMax * multiplier) / d.xMax ) * width;
      let exactPixelLocation = lineOffest + xPosition;
      const relativePixelLocation = exactPixelLocation / width;
      const unixPoint = (relativePixelLocation * d.xRange) + d.xMin;
      const label = moment.unix(unixPoint).format('MM-DD-YY');
      const xObj = {
        pixelValue: label,
        label: label,
        position: exactPixelLocation
      }
      d.gridXArray.push(xObj);
    }
    // console.log('====== ALL GRAPH DATA', d)
    return d
}

import { checkIntersection } from "line-intersect";
import moment from 'moment';
import { indicatorDataMap } from '../../constants';


const shouldDisplayDateStamps = (max, min, range) => {

  // Mathy way of doig it, I'm using range now
  // // time padding makes sure data that is at the 'day' threshold will bounce down to timestamps
  // let timePadding = 60 * 60; // one hour
  //
  // let secondsInOneDay = (24 * 60 * 60) - timePadding;
  // if( (max - min) > secondsInOneDay) {
  //   // if range of max and min is greater than one day, return true, it's gonna be dates
  //   return true;
  // } else {
  //   return false;
  // }

  if(range == '1d') {
    return false;
  } else if( range == '1h' ) {
    return false;
  } else {
    return true;
  }
}

const formatDateStamp = (unixInput) => {
  return moment.unix(unixInput).format('MM-DD-YY');
}

const formatTimeStamp = (unixInput) => {
  return moment.unix(unixInput).format('hh:mm a');
}

const returnFormattedTimeStamp = (elem) => {
  let dateUnix = '';
  if(elem.minute) {
    // handle parsing with minutes
    dateUnix = parseInt( moment(elem.date + ' ' + elem.minute, "YYYYMMDD HH:mm").format('X') );
  } else {
    // handle standard date stamps
    dateUnix = parseInt( moment(elem.date, 'YYYYMMDD').format('X') );
  }
  return dateUnix;
}

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

const isDataPointFuturePoint = (dataPoint) => {
  let missingImportantValue = false;
  if (
    'open' in dataPoint === false ||
    'close' in dataPoint === false ||
    'high' in dataPoint === false ||
    'low' in dataPoint === false
  ) {
    missingImportantValue = true;
  }
  if(missingImportantValue) {
    return true;
  } else {
    return false;
  }
}

/////////////////////////////////////////////////////////////////////

export const parseSmallGraphData = (data, Price, graphHeight, range) => {

    let d = {
      yMax: 0,
      yMin: 9999999999999999999,
      yRange: 0,
      lineData: [],
      dateData: [],
      priceLineHeight: 0,
      xMax: 0,
      xMin: 9999999999999999999
    }


    for(let i = 0; i < data.length; i++) {
      const thisDataPoint = data[i];
      // format data
      data[i].unixTimeStamp = returnFormattedTimeStamp(thisDataPoint);
    }


    for(let i = 0; i < data.length; i++) {
      const thisDataPoint = data[i];
      const thisClosePoint = thisDataPoint.close;
      const thisUnixTimeStamp = thisDataPoint.unixTimeStamp;
      // get y max and min
      if(thisClosePoint > d.yMax) {
        d.yMax = thisClosePoint
      }
      if(thisClosePoint < d.yMin) {
        d.yMin = thisClosePoint
      }
      if(thisUnixTimeStamp > d.xMax) {
        d.xMax = thisUnixTimeStamp;
      }
      if(thisUnixTimeStamp < d.xMin) {
        d.xMin = thisUnixTimeStamp;
      }
    }

    let displayDateStamps = shouldDisplayDateStamps(d.xMax, d.xMin, range)
    // console.log('====== SMALL GRAPH', displayDateStamps)

    for(let i = 0; i < data.length; i++) {

      const thisDataPoint = data[i];

      let dataPointIsFuturePoint = isDataPointFuturePoint(thisDataPoint);
      console.log('this data point', thisDataPoint, dataPointIsFuturePoint);

      if(dataPointIsFuturePoint) {
        continue;
      }

      d.lineData.push(data[i].close + d.yMin);

      let dateData = '-';
      if(displayDateStamps) {
        dateData = formatDateStamp(thisDataPoint.unixTimeStamp);
      } else {
        dateData = formatTimeStamp(thisDataPoint.unixTimeStamp);
      }
      d.dateData.push(dateData);
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



////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////




export const parseLargeGraphData = (inputData, height, width, indicatorsList, theme, range) => {

    //////////////////////////////////////////////////////////////////////////
    // init data
    let modifiedInputData = inputData;

    let futureDataPoints = [];


    //////////////////////////////////////////////////////////////////////////
    // seperate future data block from data

    modifiedInputData.map((elem, i) => {
      console.log('each modifiedInputData', elem);

    })

    //////////////////////////////////////////////////////////////////////////
    // limit input data if in one hour mode
    if(range === '1h') {
      let formattedDataPointsHour = [];
      // extract newest time from list
      const newestDataPoint = inputData[inputData.length - 1];
      let newestTime = returnFormattedTimeStamp(newestDataPoint);
      let oneHourFromNewestTime = parseInt(moment(newestTime, 'X').subtract(1, 'hours').format('X'));
      // loop through in reverse
      inputData.reverse().every((elem, i) => {
        let thisDateUnix = returnFormattedTimeStamp(elem);
        if(thisDateUnix > oneHourFromNewestTime) {
          formattedDataPointsHour.push(elem);
          return true;
        } else {
          return false;
        }
      })
      // reverse it back again
      formattedDataPointsHour = formattedDataPointsHour.reverse();
      // write data
      modifiedInputData = formattedDataPointsHour;
    }

    //////////////////////////////////////////////////////////////////////////
    // initialize max value
    let initMaxVal = 99999999999999999999999;

    //////////////////////////////////////////////////////////////////////////
    // initialze object to do work on
    let d = {
      xMax: 0,
      xMin: initMaxVal,
      yMax: 0,
      yMin: initMaxVal,
      dataPoints: modifiedInputData,
      gridYArray: [],
      gridXArray: [],
      xLineCount: 5,
      yLineCount: 4,
      xRange: 0,
      yRange: 0,
      formattedLines: [],
      volumeMin: initMaxVal,
      volumeMax: 0,
      ichiCloudLines: [],
      yPaddingModifier: .8,
      xPaddingModifier: .9,
      volumeBottomLinesData: null,
      trndMax: 0,
      trndMin: initMaxVal,
      obvMax: 0,
      obvMin: initMaxVal,
      macdMax: 0,
      macdMin: initMaxVal
    };

    //////////////////////////////////////////////////////////////////////////
    // adds bottom padding
    height = height * d.yPaddingModifier;
    // adds right padding
    width = width * d.xPaddingModifier;


    //////////////////////////////////////////////////////////////////////////
    // define x max / min functions
    const manipulateXMaxMin = (input) => {
      // don't run if value is null
      if( input === null ) { return }
      if( input > d.xMax ) d.xMax = input;
      if( input < d.xMin ) d.xMin = input;
    }

    const manipulateYMaxMin = (input, ignoreZero) => {
      // don't run if value is null
      if( input === null ) { return }
      // don't run if told to ignore zero values
      if( input === 0 && ignoreZero ) { return }
      if( input > d.yMax ) d.yMax = input;
      if( input < d.yMin ) d.yMin = input;
    }

    const manipulateVolumeMaxMin = (input) => {
      // don't run if value is null
      if( input === null ) { return }
      if( input > d.volumeMax ) d.volumeMax = input;
      if( input < d.volumeMin ) d.volumeMin = input;
    }

    const manipulateObvMaxMin = (input) => {
      // don't run if value is null
      if( input === null ) { return }
      if( input > d.obvMax ) d.obvMax = input;
      if( input < d.obvMin ) d.obvMin = input;
    }

    const manipulateTrndMaxMin = (input) => {
      // don't run if value is null
      if( input === null ) { return }
      if( input > d.trndMax ) d.trndMax = input;
      if( input < d.trndMin ) d.trndMin = input;
    }

    const manipulateMACDMaxMin = (input) => {
      // don't run if value is null
      if( input === null ) { return }
      if( input > d.macdMax ) d.macdMax = input;
      if( input < d.macdMin ) d.trndMin = input;
    }

    //////////////////////////////////////////////////////////////////////////
    // check if any of the values contain a null value
    // prevent them from rendering if that is the case
    // we don't want to ever reference a null variable
    // in the line rendering functions

    let bolHasNullValue = false;
    let ema50HasNullValue = false;
    let ema200HasNullValue = false;
    let rsiHasNullValue = false;
    let volumeHasNullValue = false;
    let ichiHasNullValue = false;
    let obvHasNullValue = false;
    let trndHasNullValue = false;
    let macdHasNullValue = false;
    let sma50HasNullValue = false;
    let sma200HasNullValue = false;

    //////////////////////////////////////////////////////////////////////////
    // loop through and disqualify any null line
    d.dataPoints.forEach((elem, i) => {

      // normalize MACD values
      // elem.macd.MACD = elem.macd.MACD + 1;

      if(elem.bol === null) {
        console.log('NULLLL!!! bol')
        bolHasNullValue = true;
      }
      if(elem.rsi === null) {
        console.log('NULLLL!!! rsi')
        rsiHasNullValue = true;
      }
      if(elem.ema50 === null) {
        console.log('NULLLL!!! ema50')
        ema50HasNullValue = true;
      }
      if(elem.ema200 === null) {
        console.log('NULLLL!!! ema200')
        ema200HasNullValue = true;
      }
      if(elem.volume === null) {
        console.log('NULLLL!!! volume')
        volumeHasNullValue = true;
      }
      if(elem.ichi === null) {
        console.log('NULLLL!!! ichi')
        ichiHasNullValue = true;
      }
      if(elem.obv === null) {
        console.log('NULLLL!!! obv')
        obvHasNullValue = true;
      }
      if(elem.trnd === null) {
        console.log('NULLLL!!! trnd')
        trndHasNullValue = true;
      }
      if(elem.macd === null) {
        console.log('NULLLL!!! macd')
        macdHasNullValue = true;
      }

      if(elem.sma50 === null ) {
        console.log('NULLLL!!! sma50')
        sma50HasNullValue = true;
      }
      if(elem.sma200 === null ) {
        console.log('NULLLL!!! sma200')
        sma200HasNullValue = true;
      }
    })

    //////////////////////////////////////////////////////////////////////////
    // setup render variables
    let renderBol = false;
    let renderRsi = false;
    let renderVolume = false;
    let renderIchi = false;
    let renderObv = false;
    let renderTrnd = false;
    let renderEma50 = false;
    let renderEma200 = false;
    let renderMacd = false;
    let renderSma = false;

    //////////////////////////////////////////////////////////////////////////
    // add date stamp and calculate maximums and minimums
    d.dataPoints = d.dataPoints.map((elem, i) => {
      // if data is valid, check for indicator list and set render variables
      if(!rsiHasNullValue) {
        renderRsi = indicatorsList.indexOf('RSI') > -1;
      }
      if(!bolHasNullValue) {
        renderBol = indicatorsList.indexOf('BOL') > -1;
      }
      if(!ema50HasNullValue && !ema200HasNullValue) {
        renderEma50 = indicatorsList.indexOf('EMA') > -1;
        renderEma200 = indicatorsList.indexOf('EMA') > -1;
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
      if(!trndHasNullValue) {
        renderTrnd = indicatorsList.indexOf('TRND') > -1;
      }
      if(!macdHasNullValue) {
        renderMacd = indicatorsList.indexOf('MACD') > -1;
      }
      if(!sma50HasNullValue && !sma200HasNullValue ) {
        renderSma = indicatorsList.indexOf('SMA') > -1;
      }
      let dateUnix = returnFormattedTimeStamp(elem);

      // calculate min and max
      // time / x value
      manipulateXMaxMin(dateUnix)
      manipulateYMaxMin(elem.vwap);
      manipulateYMaxMin(elem.open);
      manipulateYMaxMin(elem.close);
      manipulateYMaxMin(elem.high);
      manipulateYMaxMin(elem.low);

      if(renderIchi) {
        manipulateYMaxMin(elem.ichi.base);
        manipulateYMaxMin(elem.ichi.conversion);
        manipulateYMaxMin(elem.ichi.spanA, true);
        manipulateYMaxMin(elem.ichi.spanB, true);
      }

      // conditional rendering based on indicators menu
      if(renderEma50) {
        manipulateYMaxMin(elem.ema50);
      }
      if(renderEma200) {
        manipulateYMaxMin(elem.ema200);
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
        manipulateObvMaxMin(elem.obv)
      }
      if(renderTrnd) {
        manipulateTrndMaxMin(elem.trnd);
      }
      if(renderMacd) {
        manipulateMACDMaxMin(elem.macd.MACD);
      }
      if(renderSma) {
        manipulateYMaxMin(elem.sma50);
        manipulateYMaxMin(elem.sma200);
      }

      return {
        ...elem,
        dateUnix
      }
    })

    //////////////////////////////////////////////////////////////////////////
    // Save range
    d.xRange = d.xMax - d.xMin;
    d.yRange = d.yMax - d.yMin;

    //////////////////////////////////////////////////////////////////////////
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

    //////////////////////////////////////////////////////////////////////////
    // setup line rendering functions
    const generateLineData = (targetValue, color) => {
      let lineData = [];

      for (let elem of d.dataPoints) {
        let chosenValue = Object.byString(elem, targetValue);
        console.log('chosen value', chosenValue);
        // if(chosenValue === null) {
        //   continue;
        // }
        let xRel = (elem.dateUnix - d.xMin) / (d.xRange);
        let xCoord = xRel * width;
        let yRel = (chosenValue - d.yMin) / d.yRange;
        let yCoord = flipYAxisValue(height, yRel * height);
        lineData.push(`${xCoord},${yCoord}`)
      }

      let formattedLineData = lineData.join(' ')
      return {
        color: color,
        lineTargetValue: targetValue,
        formattedLineData: formattedLineData
      }
    }

    //////////////////////////////////////////////////////////////////////////
    // setup relative line rendering functions
    const generateRelativeLineData = (targetValue, color, max, min) => {
      let lineData = [];

      for (let elem of d.dataPoints) {
        let chosenValue = Object.byString(elem, targetValue);
        // if(chosenValue === null) {
        //   continue;
        // }
        let xRel = (elem.dateUnix - d.xMin) / (d.xRange);
        let xCoord = xRel * width;
        let yRelative = ( chosenValue - min) / ( max - min);
        let graphYPosition = yRelative * height;
        let yCoord = flipYAxisValue(height, graphYPosition);
        lineData.push(`${xCoord},${yCoord}`)
      }

      let formattedLineData = lineData.join(' ')
      return {
        color: color,
        lineTargetValue: targetValue,
        formattedLineData: formattedLineData
      }
    }
    //////////////////////////////////////////////////////////////////////////
    // setup volume line rendering functions
    const generateVolumeBottomLinesData = (targetValue) => {
      let lineData = [];
      for ( let elem of d.dataPoints) {
        let volumeValue = Object.byString(elem, targetValue);
        let openValue = Object.byString(elem, 'open');
        let closeValue = Object.byString(elem, 'close');
        let xRel = (elem.dateUnix - d.xMin) / (d.xRange);
        let xCoord = xRel * width;
        // percentage of total height to allow max
        let maxLineHeightModifier = .3;
        let lineHeightRel = volumeValue / d.volumeMax;
        let lineHeightCoords = (maxLineHeightModifier * height) * lineHeightRel;
        let bottomAdjust = height * .1;
        let yCoord = ( height + bottomAdjust ) - lineHeightCoords;
        let color = theme.red;
        if(closeValue > openValue) {
          color = '#4A86E8';
        }
        lineData.push({
          color: color,
          lineHeight: lineHeightCoords,
          yCoord: yCoord,
          xCoord: xCoord
        })
      }
      return {
        dataSet: lineData
      }
    }


    // _FF8C00_checkbox_image
    // *Simple Moving Average (SMA)* — #FF8C00 (dark orange)


    //////////////////////////////////////////////////////////////////////////
    // conditionally render
    if(renderRsi) {
      d.formattedLines.push(generateLineData('rsi', '#00FF00'));
    }
    if(renderBol) {
      d.formattedLines.push(generateLineData('bol.lower', '#800080'));
      d.formattedLines.push(generateLineData('bol.middle', '#800080'));
      d.formattedLines.push(generateLineData('bol.upper', '#800080'));
    }
    if(renderEma50) {
      d.formattedLines.push(generateLineData('ema50', '#0000FF'));
    }
    if(renderEma200) {
      d.formattedLines.push(generateLineData('ema200', '#FF0000'));
    }
    if(renderVolume) {
      d.volumeBottomLinesData = generateVolumeBottomLinesData('volume')
    }
    if(renderIchi) {
      d.ichiCloudLines.push(generateLineData('ichi.spanA', theme.green));
      d.ichiCloudLines.push(generateLineData('ichi.spanB', theme.red));
    }
    if(renderObv) {
      d.formattedLines.push(generateRelativeLineData('obv', '#FF1493', d.obvMax, d.obvMin));
    }
    if(renderTrnd) {
      d.formattedLines.push(generateRelativeLineData('trnd', '#A52A2A', d.trndMax, d.trndMin));
    }
    if(renderMacd) {
      d.formattedLines.push(generateRelativeLineData('macd.MACD', '#008000', d.macdMax, d.macdMin));
    }
    if(renderSma) {
      d.formattedLines.push(generateLineData('sma50', '#FF8C00'));
      d.formattedLines.push(generateLineData('sma200', '#FF8C00'));
    }
    const displayDateStamps = shouldDisplayDateStamps(d.xMax, d.xMin, range);


    //////////////////////////////////////////////////////////////////////////
    // How many x axis numbers should we have?

    // set to four only if we're in 5 day territory
    if( range == '5d' ) {
      // one hour
      d.xLineCount = 4;
    }

    //////////////////////////////////////////////////////////////////////////
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
    for( let j = 0; j < d.xLineCount + 1; j++) {
      // for x lines
      let spaceBetweenEachLine = width / d.xLineCount;
      // let lineOffest = spaceBetweenEachLine / 2;
      let lineOffest = 0;
      let multiplier = j / d.xLineCount;
      let xPosition = ((d.xMax * multiplier) / d.xMax ) * width;
      let exactPixelLocation = lineOffest + xPosition;
      const relativePixelLocation = exactPixelLocation / width;
      const unixPoint = (relativePixelLocation * d.xRange) + d.xMin;
      let label = '';
      // console.log('=== Each x line', unixPoint);

      // if min and max are greater than x distance apart, show dates
      // otherwise, show times

      if(displayDateStamps) {
        label = formatDateStamp( unixPoint );
      } else {
        label = formatTimeStamp( unixPoint );
      }

      // never show first label
      if(j === 0) {
        label = '';
      }

      const xObj = {
        pixelValue: label,
        label: label,
        position: exactPixelLocation
      }
      d.gridXArray.push(xObj);
    }

    //////////////////////////////////////////////////////////////////////////
    // final output
    // console.log('====== ALL GRAPH DATA', d)
    return d
}

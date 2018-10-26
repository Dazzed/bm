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

const formatDateStamp5Year = (unixInput) => {
  return moment.unix(unixInput).format('YYYY');
}

const formatDateStamp12Year = (unixInput) => {
  return moment.unix(unixInput).format('MMM YYYY');
}
const formatDateStamp1M6M = (unixInput) => {
  return moment.unix(unixInput).format('MM/DD');
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

// function for grabbing data from an object using a string instead of standard selectors
Object.byString = (o, s) => {
  if(!o || !s) {
    return null;
  }
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    let k = a[i];
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

    console.log('======= GENERATE polygons from two lines', lineA, lineB)

    // Make sure we actually have the right data
    if(!lineA || !lineB || lineA.formattedLineData === null || lineB.formattedData === null) {
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

      if (data[i].close > 0 ) {
        const thisDataPoint = data[i];

        let dataPointIsFuturePoint = isDataPointFuturePoint(thisDataPoint);
        // console.log('this data point', thisDataPoint, dataPointIsFuturePoint);

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


// prevent data beyond time range limit from showing up
// essentially throwing this data away
let limitCurrentData = (inputData, countOfHowManyLengthsOfTime, lengthOfTimeAsString) => {
  let formattedDataPointsHour = [];
  // extract newest time from list
  const newestDataPoint = inputData[inputData.length - 1];
  let newestTime = returnFormattedTimeStamp(newestDataPoint);
  let oneHourFromNewestTime = parseInt(moment(newestTime, 'X').subtract(countOfHowManyLengthsOfTime, lengthOfTimeAsString).format('X'));
  // loop through in reverse
  inputData.reverse().every((elem, i) => {
    let thisDateUnix = returnFormattedTimeStamp(elem);
    // console.log('every elem', elem, thisDateUnix)
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
  return formattedDataPointsHour;
}


// if line has string 'NaN', return false
const isLineValid = (lineData) => {
  if(!lineData) {
    return false;
  }
  if(typeof lineData !== 'string') {
    return false;
  }
  // console.log('-------- test line data', lineData);
  if(lineData.indexOf('NaN') > -1) {
    // console.log('======= INVALID!!!!')
    return false;
  }
  return true;
}


export const parseLargeGraphData = (inputData, height, width, indicatorsList, theme, range) => {

  var maxVal = 0;
  for (let i = 0; i < inputData.length; i++) {
    if (inputData[i].high && inputData[i].high > maxVal) {
      maxVal = inputData[i].high;
    }
  }
  let processed = false;
  if (maxVal > 100000) {
    width -= 28;
    processed = true;
  }
  if (maxVal > 10000 && processed == false) {
    width -= 21;
    processed = true;
  }
  if (maxVal > 1000 && processed == false) {
    width -= 14;
    processed = true;
  }
  if (maxVal > 100 && processed == false) {
    width -= 7;
    processed = true;
  }

    //////////////////////////////////////////////////////////////////////////
    // init data
    let modifiedInputData = [];
    let futureDataPoints = [];

    //////////////////////////////////////////////////////////////////////////
    // seperate future data block from past data

    inputData.forEach((elem, i) => {
      // console.log('each modifiedInputData', elem);
      let isFuturePoint = isDataPointFuturePoint(elem);
      // console.log('---- each point', isFuturePoint)
      if(isFuturePoint) {
        futureDataPoints.push(elem);
      } else {
        modifiedInputData.push(elem);
      }
    })

    //////////////////////////////////////////////////////////////////////////
    // limit input data in various modes
    if(range === '1h') {
      modifiedInputData = limitCurrentData(modifiedInputData, 1, 'hours');
    }
    if(range === '1d') {
      modifiedInputData = limitCurrentData(modifiedInputData, 1, 'days');
    }
    if(range === '1m') {
      modifiedInputData = limitCurrentData(modifiedInputData, 1, 'months');
    }
    if(range === '6m') {
      modifiedInputData = limitCurrentData(modifiedInputData, 6, 'months');
    }
    if(range === '1y') {
      modifiedInputData = limitCurrentData(modifiedInputData, 1, 'years');
    }
    if(range === '2y') {
      modifiedInputData = limitCurrentData(modifiedInputData, 2, 'years');
    }
    if(range === '5y') {
      modifiedInputData = limitCurrentData(modifiedInputData, 5, 'years');
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
    };

    //////////////////////////////////////////////////////////////////////////
    // adds bottom padding
    height = height * d.yPaddingModifier;
    // adds right padding
    console.log(445, width);
    width = width * d.xPaddingModifier;
  console.log(447, width);

    //////////////////////////////////////////////////////////////////////////
    // define x and y  max & min functions
    const manipulateXMaxMin = (input) => {
      // console.log('input', input)
      // don't run if value is null
      if( input === null ) { return }
      if( input > d.xMax ) d.xMax = input;
      if( input < d.xMin ) d.xMin = input;
    }

    const manipulateYMaxMin = (input) => {
      // don't run if value is null
      if( input === null || input === 0) { return }
      // don't run if told to ignore zero values
      if( input > d.yMax ) d.yMax = input;
      if( input < d.yMin ) d.yMin = input;
    }

    const manipulateVolumeMaxMin = (input) => {
      // don't run if value is null
      if( input === null ) { return }
      if( input > d.volumeMax ) d.volumeMax = input;
      if( input < d.volumeMin ) d.volumeMin = input;
    }

    const addLeftPaddingToXGraph = () => {
      return;
      // console.log('--- LEFT PADDING -- ', d.xMin, d.xMax);
      // d.xMin = d.xMin - ( (d.xMax - d.xMin) * .0005);
    }

    //////////////////////////////////////////////////////////////////////////
    // check if any of the values contain a null value
    // prevent them from rendering if that is the case
    // we don't want to ever reference a null variable
    // in the line rendering functions

    let ema50HasNullValue = false;
    let ema200HasNullValue = false;
    let volumeHasNullValue = false;
    let ichiHasNullValue = false;
    let sma50HasNullValue = false;
    let sma200HasNullValue = false;
    let bolHasNullValue = false;

    //////////////////////////////////////////////////////////////////////////
    // loop through and disqualify any null line
    d.dataPoints.forEach((elem, i) => {

      if(elem.ema50 === null) {
        ema50HasNullValue = true;
      }
      if(elem.ema200 === null) {
        ema200HasNullValue = true;
      }
      if(elem.volume === null) {
        volumeHasNullValue = true;
      }
      // handle this stupid bug where the backend sends a zero instead of an object
      if(elem.ichi === null || elem.ichi === 0) {
        ichiHasNullValue = true;
      }
      if(elem.sma50 === null ) {
        sma50HasNullValue = true;
      }
      if (elem.sma200 === null) {
        sma200HasNullValue = true;
      }
      if (elem.bol === null || elem.bol === 0) {
        bolHasNullValue = true;
      }
    });

    //////////////////////////////////////////////////////////////////////////
    // setup render variables
    let renderVolume = false;
    let renderIchi = false;
    let renderEma50 = false;
    let renderEma200 = false;
    let renderSma = false;
    let renderBol = false;

    //////////////////////////////////////////////////////////////////////////
    // add date stamp and calculate maximums and minimums
    d.dataPoints = d.dataPoints.map((elem, i) => {
      // if data is valid, check for indicator list and set render variables
      if(!ema50HasNullValue && !ema200HasNullValue) {
        renderEma50 = indicatorsList.indexOf('EMA') > -1;
        renderEma200 = indicatorsList.indexOf('EMA') > -1;
      }
      if(!volumeHasNullValue) {
        renderVolume = indicatorsList.indexOf('VLM') > -1;
      }
      if (!ichiHasNullValue) {
        renderIchi = indicatorsList.indexOf('ICHI') > -1;
      }
      if (!bolHasNullValue) {
        renderBol = indicatorsList.indexOf('BOL') > -1;
      }
      if(!sma50HasNullValue && !sma200HasNullValue ) {
        renderSma = indicatorsList.indexOf('SMA') > -1;
      }
      let dateUnix = returnFormattedTimeStamp(elem);

      // calculate min and max
      // time / x value
      manipulateXMaxMin(dateUnix);

      // add left padding to x variable
      addLeftPaddingToXGraph();

      manipulateYMaxMin(elem.vwap);
      manipulateYMaxMin(elem.open);
      manipulateYMaxMin(elem.close);
      manipulateYMaxMin(elem.high);
      manipulateYMaxMin(elem.low);

      if (renderIchi) {
        if (elem.ichi.base !== null) {
          manipulateYMaxMin(elem.ichi.base);
        }
        if (elem.ichi.conversion !== null) {
          manipulateYMaxMin(elem.ichi.conversion);
        }
        manipulateYMaxMin(elem.ichi.spanA);
        manipulateYMaxMin(elem.ichi.spanB);
      }

      if (renderBol) {
        if (elem.bol && elem.bol.middle !== null && elem.bol.middle !== 0) {
          manipulateYMaxMin(elem.bol.middle);
        }
        if (elem.bol && elem.bol.lower !== null && elem.bol.lower !== 0) {
          manipulateYMaxMin(elem.bol.lower);
        }
        if (elem.bol && elem.bol.upper !== null && elem.bol.upper !== 0) {
          manipulateYMaxMin(elem.bol.upper);
        }
      }

      // conditional rendering based on indicators menu
      if(renderEma50) {
        manipulateYMaxMin(elem.ema50);
      }
      if(renderEma200) {
        manipulateYMaxMin(elem.ema200);
      }
      if(renderVolume) {
        manipulateVolumeMaxMin(elem.volume);
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
    // Deal with future ichi values
    // futureDataPoints
    if(futureDataPoints.length > 0 && renderIchi) {
      futureDataPoints = futureDataPoints.map((elem, i) => {

        // console.log('each future data point', elem);
        let dateUnix = returnFormattedTimeStamp(elem);

        // calculate min and max
        // time / x value
        manipulateXMaxMin(dateUnix);

        if(elem.ichi.base !== null) {
          manipulateYMaxMin(elem.ichi.base);
        }
        if(elem.ichi.conversion !== null) {
          manipulateYMaxMin(elem.ichi.conversion);
        }
        manipulateYMaxMin(elem.ichi.spanA);
        manipulateYMaxMin(elem.ichi.spanB);

        return {
          ...elem,
          dateUnix
        }

      })
    }

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
    const generateLineData = (targetValue, color, source) => {
      let lineData = [];

      for (let elem of source) {
        let chosenValue = Object.byString(elem, targetValue);
        // console.log('chosen value', chosenValue);
        if (!chosenValue || chosenValue === null || chosenValue === 0) {
          continue;
        }
        // console.log('--- ', elem, d.xMin, d.xRange)
        let xRel = (elem.dateUnix - d.xMin) / (d.xRange);
        let xCoord = xRel * width;
        let yRel = (chosenValue - d.yMin) / d.yRange;
        let yCoord = flipYAxisValue(height, yRel * height);

        // console.log('-x y', xCoord, '-', yCoord)
        lineData.push(`${xCoord},${yCoord}`)
      }

      let formattedLineData = lineData.join(' ')

      let result = {
        color: color,
        lineTargetValue: targetValue,
        formattedLineData: null
      }

      let lineValid = isLineValid(formattedLineData);
      if(lineValid) {
        result.formattedLineData = formattedLineData;
      }

      // console.log(result.formattedLineData);
      return result;
    }

    //////////////////////////////////////////////////////////////////////////
    // setup relative line rendering functions
    const generateRelativeLineData = (targetValue, color, max, min) => {
      let lineData = [];

      for (let elem of d.dataPoints) {
        let chosenValue = Object.byString(elem, targetValue);
        if (!chosenValue || chosenValue === null) {
          continue;
        }
        let xRel = (elem.dateUnix - d.xMin) / (d.xRange);
        let xCoord = xRel * width;
        let yRelative = ( chosenValue - min) / ( max - min);
        let graphYPosition = yRelative * height;
        let yCoord = flipYAxisValue(height, graphYPosition);
        lineData.push(`${xCoord},${yCoord}`)
      }

      let formattedLineData = lineData.join(' ')

      let result = {
        color: color,
        lineTargetValue: targetValue,
        formattedLineData: null
      }

      let lineValid = isLineValid(formattedLineData);
      if(lineValid) {
        result.formattedLineData = formattedLineData;
      }

      return result;

    }
    //////////////////////////////////////////////////////////////////////////
    // setup volume line rendering functions
    const generateVolumeBottomLinesData = (targetValue) => {
      let lineData = [];
      for ( let elem of d.dataPoints) {
        let volumeValue = Object.byString(elem, targetValue);
        let openValue = Object.byString(elem, 'open');
        let closeValue = Object.byString(elem, 'close');

        if(!volumeValue || !openValue || !closeValue) {
          continue;
        }

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
          color = theme.green;
        }
        lineData.push({
          color: color,
          lineHeight: lineHeightCoords,
          yCoord: yCoord,
          xCoord: xCoord
        })
      }

      // let lineValid = isLineValid(lineData);

      return {
        dataSet: lineData
      }
    }


    //////////////////////////////////////////////////////////////////////////
    // conditionally render
    if(renderEma50) {
      d.formattedLines.push(generateLineData('ema50', '#0000FF', d.dataPoints));
    }
    if(renderEma200) {
      d.formattedLines.push(generateLineData('ema200', '#FF0000', d.dataPoints));
    }
    if(renderVolume) {
      d.volumeBottomLinesData = generateVolumeBottomLinesData('volume')
    }
    if(renderIchi) {
      let sourceData = d.dataPoints;
      if(futureDataPoints.length > 0) {
        sourceData = d.dataPoints.concat(futureDataPoints);
      }
      console.log('== render ichi', sourceData)
      let lineA = generateLineData('ichi.spanA', theme.green, sourceData);
      let lineB = generateLineData('ichi.spanB', theme.red, sourceData);
      console.log('-- line a', lineA);
      console.log('-- line b', lineB);
      d.ichiCloudLines.push(lineA);
      d.ichiCloudLines.push(lineB);
    }
    // if(renderTrnd) {
    //   d.formattedLines.push(generateRelativeLineData('trnd', '#A52A2A', d.trndMax, d.trndMin));
    // }
    if(renderSma) {
      d.formattedLines.push(generateLineData('sma50', '#FF8C00', d.dataPoints));
      d.formattedLines.push(generateLineData('sma200', '#FF8C00', d.dataPoints));
    }
    if (renderBol) {
      d.formattedLines.push(generateLineData('bol.upper', '#000000', d.dataPoints));
      d.formattedLines.push(generateLineData('bol.middle', '#000000', d.dataPoints));
      d.formattedLines.push(generateLineData('bol.lower', '#000000', d.dataPoints));
    }

    console.log(d);
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
        if (range === '5y') {
          label = formatDateStamp5Year(unixPoint);          
        } else if (range === '1y' || range === '2y') {
          label = formatDateStamp12Year(unixPoint);      
        } else if (range === '1m' || range === '6m') {    
          label = formatDateStamp1M6M(unixPoint);      
        } else {
          label = formatDateStamp(unixPoint);
        }
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

export const modifyTestDataIntoTestPattern = (testData) => {
  console.log('=========== MODIFY TEST DATA', testData);

  let max = 100;
  let min = 0;

  let line4 = 87.50;
  let line3 = 62.50;
  let line2 = 37.50;
  let line1 = 12.50;

  let sectionLength = 5;

  let fatBarHeight = 5;

  let results = testData.map((elem, i) => {
    // console.log('-----', elem)
    if(elem.open) {
      elem.open = 40;
    }
    if(elem.close) {
      elem.close = 50;
    }
    if(elem.high) {
      elem.high = line1;
    }
    if(elem.low) {
      elem.low = 30;
    }

    if(elem.ichi) {
      elem.ichi.base = 10
      elem.ichi.conversion = 20
      // align with background lines
      elem.ichi.spanA = line3
      elem.ichi.spanB = line2
    }

    if(elem.volume) {
      elem.volume = 0;
    }

    // modify first section
    if(i <= sectionLength * 1) {
      if(elem.open) {
        elem.open = min;
      }
      if(elem.close) {
        elem.close = min + fatBarHeight;
      }
      if(elem.high) {
        elem.high = line1;
      }
      if(elem.low) {
        elem.low = min;
      }
    }

    // modify second section
    if(i > sectionLength * 1) {
      if(elem.open) {
        elem.open = line1;
      }
      if(elem.close) {
        elem.close = line1 + fatBarHeight;
      }
      if(elem.high) {
        elem.high = line2;
      }
      if(elem.low) {
        elem.low = line1;
      }
    }

    // modify third section
    if(i >= sectionLength * 2) {
      if(elem.open) {
        elem.open = line2;
      }
      if(elem.close) {
        elem.close = line2 + fatBarHeight;
      }
      if(elem.high) {
        elem.high = line3;
      }
      if(elem.low) {
        elem.low = line2;
      }
    }

    // modify fourth section
    if(i >= sectionLength * 3) {
      if(elem.open) {
        elem.open = line3;
      }
      if(elem.close) {
        elem.close = line3 + fatBarHeight;
      }
      if(elem.high) {
        elem.high = line4;
      }
      if(elem.low) {
        elem.low = line3;
      }
    }

    // modify fifth section
    if(i >= sectionLength * 4) {
      if(elem.open) {
        elem.open = line4;
      }
      if(elem.close) {
        elem.close = line4 + fatBarHeight;
      }
      if(elem.high) {
        elem.high = max;
      }
      if(elem.low) {
        elem.low = line4;
      }
    }

    return elem;
  });

  // modify first element
  results[0].high = max;
  results[0].low = min;

  // // modify second result
  // results[1].high = max;
  // results[1].low = min;

  return results;
}



// to keep on this graph and test
// BB, EMA, SMA, and ICHI

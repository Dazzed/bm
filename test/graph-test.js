const axios = require('axios');
const fs = require('fs');
var util = require('util')


const username = 'fogg4444@gmail.com';
const password = 'Password11!'

let accessToken = null;

var resultsFile = './testResults.txt';
// var arrayOfTickers = ['AAPL', 'GOOG'];
var arrayOfTickers = ['GOOG'];
var arrayOfRanges = ['1h', '1d', '5d', '1m', '6m', '1y', '2y', '5y'];


// final list of attributes to render
// BB, EMA, SMA, and ICHI


var getToken = () => {
  return new Promise((resolve, reject) => {
    let url = 'https://blu-api-staging.aws.gigsternetwork.com/api/users/login';
    let body = {
      email: username,
      password: password
    }

    axios.post(url, body)
    .then((res) => {
      console.log('========= success getting token', res.data.id);
      accessToken = res.data.id;
      resolve(res)
    })
    .catch((err) => {
      // handle err
      console.log('err', err)
      reject(err)
    });
  })
}

var makeGraphCall = (ticker, range) => {

  let includeICHI = true;

  let params = {
    options: {
      'ticker': ticker,
      'indicator': [],
      'parameters':{
        'ICHI': {
          'conversionPeriod': 9,
          'basePeriod': 26,
          'spanPeriod': 52,
          'displacement': 26
        },
        'EMA': {
          'period':50
        },
      }
    }
  }


  // old list of attributes
  // params.options.indicator = ['OBV', 'TRND', 'EMA', 'MACD', 'RSI', 'BOL', 'SMA'];

  params.options.indicator = ['BB', 'EMA', 'SMA']; // ICHI

  // to remove from graph view
  // params.options.indicator = ['OBV', 'TRND', 'MACD', 'RSI', 'BOL'];

  params.options.indicator = ['BB', 'EMA', 'SMA']; // ICHI

  if(includeICHI) {
    params.options.indicator.push('ICHI');
  }

  if(range == '1h') {
    // one hour
    params.options.range = '1d';
    params.options.interval = {periodType: "m", period: 1}

  } else if (range == '1d') {

    // five days
    params.options.range = '1d';
    // params.options.data_point = 120;
    params.options.interval = {periodType: "m", period: 10}


  } else if (range == '5d') {

    // five days
    params.options.range = '5d';
    params.options.data_point = 5;

  } else if (range == '1m') {

    // one month
    params.options.range = '1m';
    params.options.data_point = 20;

  } else if (range == '6m') {

    // six months
    params.options.range = '6m';
    params.options.data_point = 60;

  } else if (range == '1y') {

    // one year
    params.options.range = '1y';
    params.options.data_point = 52;

  } else if (range == '2y') {

    // two years
    params.options.range = '2y';
    params.options.data_point = 52;

  }
  else if (range == '5y') {

    // five years
    params.options.range = '5y';
    params.options.data_point = 52;

  }

  let baseURL = 'https://blu-api-staging.aws.gigsternetwork.com/api/';
  let route = 'tickerLists/stockCharts';
  let urlParams = '?access_token=' + accessToken;
  let url = baseURL + route + urlParams;

  if(!accessToken) {
    return null;
  }

  console.log('------ URL: ', url);
  console.log('------ Params: ', JSON.stringify(params) )

  return new Promise((resolve, reject) => {
    axios.post(url, params )
    .then((res) => {
      console.log('========= success getting data');
      // handle success
      resolve(res);
    })
    .catch((err) => {
      // handle err
      // console.log('err', err)
      resolve(err);
    });
  })
}


var printLine = (line) => {
  fs.appendFileSync(resultsFile, line + '\n')
}

var printError = (line) => {
  printLine('ERROR: ' + line);
}

var testForPresenceOfFirstLevelValue = (dataPoint, valueToTestFor, i, ticker) => {
  if(! (valueToTestFor in dataPoint) ) {
    printError(ticker + ': MISSING data: "' + valueToTestFor + '" in data point ' + i);
  }
}

var testEachDataPoint = (dataPoints, ticker) => {
  dataPoints.forEach((dataPoint, i) => {
    // printLine('testing data point..' + i)
    // printLine(JSON.stringify(dataPoint.ichi) )
    // printLine(typeof dataPoint.ichi);

    if(typeof dataPoint.ichi !== 'object') {
      printError('ICHI value is not a valid object. Data received at index ' + i + ' is of type (' + typeof dataPoint.ichi + ') --- ' + JSON.stringify(dataPoint.ichi) );
    }

    // testForPresenceOfFirstLevelValue(dataPoint, 'date', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'open', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'high', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'low', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'close', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'volume', i, ticker);
    //
    // // these are throwing errors
    // // testForPresenceOfFirstLevelValue(dataPoint, 'unadjustedVolume', i, ticker);
    // // testForPresenceOfFirstLevelValue(dataPoint, 'change', i, ticker);
    // // testForPresenceOfFirstLevelValue(dataPoint, 'changePercent', i, ticker);
    // // testForPresenceOfFirstLevelValue(dataPoint, 'vwap', i, ticker);
    //
    // testForPresenceOfFirstLevelValue(dataPoint, 'label', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'changeOverTime', i, ticker);

    // conditionally test this
    testForPresenceOfFirstLevelValue(dataPoint, 'ichi', i, ticker);

    // testForPresenceOfFirstLevelValue(dataPoint, 'ema50', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'ema200', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'sma50', i, ticker);
    // testForPresenceOfFirstLevelValue(dataPoint, 'sma200', i, ticker);

    // testForPresenceOfFirstLevelValue(dataPoint, 'blog', i);
  })
}

var readStock = (ticker, range) => {
  return new Promise((resolve, reject) => {

    let testResultLine = '================================ ' + ticker + ' - ' + range;
    printLine(testResultLine)

    makeGraphCall(ticker, range)
    .then((res) => {

      // console.log('Graph call made');
      // printLine(JSON.stringify(util.inspect(res), null, 2))
      // console.log(util.inspect(res))

      if(!res) {
        printError('NO RESULTS');
        resolve();
      }

      if('status' in res) {
        printLine('status: ' + res.status);
      } else {
        printError('NO STATUS: ');
        resolve();
      }


      if(res.status !== 200) {
        printError('Status = ' + res.status)
      }

      if('data' in res) {
        let result = res.data.result;

        testEachDataPoint(result, ticker);
      } else {
        printError('No Data in api call res!!');
      }

      // console.log('reesssssss', res.data)
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    })
  })
}

var readStocks = function(files) {
  var p = Promise.resolve(); // Q() in q
  files.forEach((ticker) => {
    arrayOfRanges.forEach((range) => {
      p = p.then(() => readStock(ticker, range))
    })
  });
  return p;
};


// clear file
fs.writeFileSync(resultsFile, '');


getToken()
.then((res) => {
  readStocks(arrayOfTickers);
})





























// { date: '2018-05-22',
  // open: 31.2227,
  // high: 33.0179,
  // low: 30.8953,
  // close: 31.9268,
  // volume: 30073561,
  // unadjustedVolume: 828002,
  // change: 0.188447,
  // changePercent: 0.594,
  // vwap: 31.9333,
  // label: 'May 22',
  // changeOverTime: 0.7178707674427364,
  // trnd: 0.0003719262426708072,

  // ichi:
  //  { conversion: 31.96405,
  //    base: 31.93185,
  //    spanA: 30.69573,
  //    spanB: 29.84075 },
  // obv: 221681051,
  // ema50: 31.399104123945143,
  // ema200: 30.582545823142418,

  // macd:
  //  { MACD: -0.04878818774987437,
  //    signal: -0.06239352233417679,
  //    histogram: 0.013605334584302423 },

  // rsi: 52.93,

  // bol:
  //  { middle: 32.0671142857143,
  //    upper: 32.846938767274615,
  //    lower: 31.287289804153982,
  //    pb: 0.410034700735767 },

  // sma50: 31.261529999999976,
  // sma200: 30.98469199999998
// }

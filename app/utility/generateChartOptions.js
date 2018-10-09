const generateChartOptionsQuery = (ticker, range, includeICHI) => {

  let options = {
      'ticker': ticker,
      'indicator': ['EMA', 'RSI', 'SMA'],
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
        'RSI': {
          'period':14
        },
      },
    }

    if(includeICHI) {
      options.indicator.push('ICHI');
    }

    if(range == '1h') {
      // one hour
      options.range = '1d';
      options.interval = { periodType: "m", period: 1 }
    } else if (range == '1d') {
      // five days
      options.range = '1d';
      // options.data_point = 120;
      options.interval = {periodType: "m", period: 10}
    } else if (range == '5d') {
      // five days
      options.range = '5d';
      options.data_point = 5;
    } else if (range == '1m') {
      // one month
      options.range = '1m';
      options.data_point = 20;
    } else if (range == '6m') {
      // six months
      options.range = '6m';
      options.data_point = 60;
    } else if (range == '1y') {
      // one year
      options.range = '1y';
      options.data_point = 52;
    } else if (range == '2y') {
      // two years
      options.range = '2y';
      options.data_point = 52;
    }
    else if (range == '5y') {
      // five years
      options.range = '5y';
      options.data_point = 52;
    }

  return options;
}

module.exports = generateChartOptionsQuery;

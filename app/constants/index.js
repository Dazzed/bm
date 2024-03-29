
const stateOptionsMap = [
  { "label": "Select", "value": 0 },
  { "label": "Alabama", "value": 1 },
  { "label": "Alaska", "value": 2 },
  { "label": "Arizona", "value": 3 },
  { "label": "Arkansas", "value": 4 },
  { "label": "California", "value": 5 },
  { "label": "Colorado", "value": 6 },
  { "label": "Connecticut", "value": 7 },
  { "label": "Delaware", "value": 8 },
  { "label": "District of Columbia", "value": 9 },
  { "label": "Florida", "value": 10 },
  { "label": "Georgia", "value": 11 },
  { "label": "Hawaii", "value": 12 },
  { "label": "Idaho", "value": 13 },
  { "label": "Illinois", "value": 14 },
  { "label": "Indiana", "value": 15 },
  { "label": "Iowa", "value": 16 },
  { "label": "Kansa", "value": 17 },
  { "label": "Kentucky", "value": 18 },
  { "label": "Lousiana", "value": 19 },
  { "label": "Maine", "value": 20 },
  { "label": "Maryland", "value": 21 },
  { "label": "Massachusetts", "value": 22 },
  { "label": "Michigan", "value": 23 },
  { "label": "Minnesota", "value": 24 },
  { "label": "Mississippi", "value": 25 },
  { "label": "Missouri", "value": 26 },
  { "label": "Montana", "value": 27 },
  { "label": "Nebraska", "value": 28 },
  { "label": "Nevada", "value": 29 },
  { "label": "New Hampshire", "value": 30 },
  { "label": "New Jersey", "value": 31 },
  { "label": "New Mexico", "value": 32 },
  { "label": "New York", "value": 33 },
  { "label": "North Carolina", "value": 34 },
  { "label": "North Dakota", "value": 35 },
  { "label": "Ohio", "value": 36 },
  { "label": "Oklahoma", "value": 37 },
  { "label": "Oregon", "value": 38 },
  { "label": "Pennsylvania", "value": 39 },
  { "label": "Rhode Island", "value": 40 },
  { "label": "South Carolina", "value": 41 },
  { "label": "South Dakota", "value": 42 },
  { "label": "Tennessee", "value": 43 },
  { "label": "Texas", "value": 44 },
  { "label": "Utah", "value": 45 },
  { "label": "Vermont", "value": 46 },
  { "label": "Virginia", "value": 47 },
  { "label": "Washington", "value": 48 },
  { "label": "West Virginia", "value": 49 },
  { "label": "Wisconsin", "value": 50 },
  { "label": "Wyoming", "value": 51 }
];

const statesHash = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'American Samoa': 'AS',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District Of Columbia': 'DC',
  'Federated States Of Micronesia': 'FM',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Guam': 'GU',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Marshall Islands': 'MH',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'MP',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Palau': 'PW',
  'Pennsylvania': 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virgin Islands': 'VI',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
}

const maritalStatusList = [
  { "label": "Single", "value": 0 },
  { "label": "Married", "value": 1 },
  { "label": "Divorced", "value": 2 },
  { "label": "Separated", "value": 3 },
  { "label": "Widow", "value": 4 },
];

const employmentStatusList = [
  { "label": "Employed", "value": 0 },
  { "label": "Student", "value": 1 },
  { "label": "Retired", "value": 2 },
  { "label": "Unemployed", "value": 3 },
  { "label": "Self-employed", "value": 4 },
  { "label": "Other", "value": 5 }
];

const investmentStatusList = [
  { "label": "None", "value": 0 },
  { "label": "Some", "value": 1 },
  { "label": "I know what I'm doing", "value": 2 },
  { "label": "I'm an expert", "value": 3 }
];

// Trending sorter
const scan_props = [
  { label: 'Top volume', value: 0, queryString: 'volume' },
  { label: '% Gainers', value: 1, queryString: 'gainers' },
  { label: '% Losers', value: 2, queryString: 'losers' },
];

var sector_props = [
  {
    label: 'All',
    value: 0,
    queryString: 'null'
  },
  {
    label: 'Utilities',
    value: 1,
    queryString: 'Utilities',
  },
  {
    label: 'Financial',
    value: 2,
    queryString: 'Financial',
  },
  {
    label: 'Healthcare',
    value: 3,
    queryString: 'Healthcare',
  },
  {
    label: 'Services',
    value: 4,
    queryString: 'Services',
  },
  {
    label: 'Basic Materials',
    value: 5,
    queryString: 'Basic Materials',
  },
  {
    label: 'Industrial Goods',
    value: 6,
    queryString: 'Industrial Goods',
  },
  {
    label: 'Conglomerates',
    value: 7,
    queryString: 'Conglomerates',
  },
  {
    label: 'Consumer Goods',
    value: 8,
    queryString: 'Consumer Goods',
  },
  {
    label: 'Technology',
    value: 9,
    queryString: 'Technology',
  }
]

const industry_utilities = [
  { label: 'All', value: 0 },
  { label: 'Electric Utilities', value: 1 },
  { label: 'Gas Utilities', value: 2 },
  { label: 'Independent Power and Renewable Electricity Producers', value: 3 },
  { label: 'Multi-Utilities', value: 4 },
  { label: 'Water Utilities', value: 5 },
];

const industry_telecomm = [
  { label: 'All', value: 0 },
  { label: 'Diversified Telecommunication Services', value: 1 },
  { label: 'Wireless Telecommunication Services', value: 2 },
];

const industry_realestate = [
  { label: 'All', value: 0 },
  { label: 'Equity Real Estate Investment Trusts', value: 1 },
  { label: 'Real Estate Management & Development', value: 2 },
];

const industry_materials = [
  { label: 'All', value: 0 },
  { label: 'Chemicals', value: 1 },
  { label: 'Construction Materials', value: 2 },
  { label: 'Containers & Packaging', value: 3 },
  { label: 'Metals & Mining', value: 4 },
  { label: 'Paper & Forest Products', value: 5 },
];

const industry_infotech = [
  { label: 'All', value: 0 },
  { label: 'Communications Equipment', value: 1 },
  { label: 'Electronic Equipment, Instruments & Components', value: 2 },
  { label: 'IT Services', value: 3 },
  { label: 'Internet Software & Services', value: 4 },
  { label: 'Semiconductors & Semiconductor Equipment', value: 5 },
  { label: 'Software', value: 6 },
  { label: 'Technology Hardware, Storage & Peripherals', value: 7 },
];

const industry_industrials = [
  { label: 'All', value: 0 },
  { label: 'Aerospace & Defense', value: 1 },
  { label: 'Air Freight & Logistics', value: 2 },
  { label: 'Airlines', value: 3 },
  { label: 'Building Products', value: 4 },
  { label: 'Commercial Services & Supplies', value: 5 },
  { label: 'Construction & Engineering', value: 6 },
  { label: 'Electrical Equipment', value: 7 },
  { label: 'Industrial Conglomerates ', value: 8 },
  { label: 'Machinery', value: 9 },
  { label: 'Marine', value: 10 },
  { label: 'Professional Services', value: 11 },
  { label: 'Road & Rail', value: 12 },
  { label: 'Trading Companies & Distributors', value: 13 },
  { label: 'Transportation Infrastructure', value: 14 },
];

const industry_health = [
  { label: 'All', value: 0 },
  { label: 'Biotechnology', value: 1 },
  { label: 'Health Care Equipment & Supplies', value: 2 },
  { label: 'Health Care Providers & Services', value: 3 },
  { label: 'Health Care Technology', value: 4 },
  { label: 'Life Sciences Tools & Services', value: 5 },
  { label: 'Pharmaceuticals', value: 6 },
];

const industry_financials = [
  { label: 'All', value: 0 },
  { label: 'Banks', value: 1 },
  { label: 'Capital Markets', value: 2 },
  { label: 'Consumer Finance', value: 3 },
  { label: 'Diversified Financial Services', value: 4 },
  { label: 'Insurance', value: 5 },
  { label: 'Mortgage REITs', value: 6 },
  { label: 'Thrifts & Mortgage Finance ', value: 7 },
];

const industry_energy = [
  { label: 'All', value: 0 },
  { label: 'Energy Equipment & Services', value: 1 },
  { label: 'Oil, Gas & Consumable Fuels', value: 2 },
];

const industry_consumerstaples = [
  { label: 'All', value: 0 },
  { label: 'Beverages', value: 1 },
  { label: 'Food & Staples Retailing', value: 2 },
  { label: 'Food Products', value: 3 },
  { label: 'Household Products', value: 4 },
  { label: 'Personal Products', value: 5 },
  { label: 'Tobacco', value: 6 },
];

const industry_consumerdiscretionary = [
  { label: 'All', value: 0 },
  { label: 'Auto Components', value: 1 },
  { label: 'Automobiles', value: 2 },
  { label: 'Distributors', value: 3 },
  { label: 'Diversified Consumer Services', value: 4 },
  { label: 'Hotels, Restaurants & Leisure', value: 5 },
  { label: 'Household Durables', value: 6 },
  { label: 'Internet & Catalog Retail', value: 7 },
  { label: 'Leisure Products', value: 8 },
  { label: 'Media', value: 9 },
  { label: 'Multiline Retail', value: 10 },
  { label: 'Specialty Retail', value: 11 },
  { label: 'Textiles, Apparel & Luxury Goods', value: 12 },
];

const THEME_KEY = '@Blu:isDarkThemeActive';
const ACCESS_TOKEN_KEY = '@Blu:accessToken';
const CURRENT_USER_ID_KEY = '@Blu:currentUserId';
const TOUCH_ID_ENABLED_KEY = '@Blu:touchIdEnabled';
const SETTINGS_DATA_KEY = '@Blu:settingsDataKey';

const newsSources = {
  'cnbc': 'CNBC',
  'bloomberg': 'Bloomberg',
  'msnbc': 'MSNBC',
  'reuters': 'Reuters',
  'wallStreet': 'Wall Street Journal',
  'morningStar': 'Morning Star',
  'marketWatch': 'Market Watch'
}

// const initialIndicators = ['ICHI', 'BOL', 'EMA', 'VOL'];
const initialIndicators = ['ICHI', 'VLM'];


const autoLogOffOptions = [
  {
    label: 'Never',
    minutes: 0,
    value: 0,
    apiValue: -1
  },
  {
    label: '5 minutes',
    minutes: 5,
    value: 1,
    apiValue: 5
  },
  {
    label: '20 minutes',
    minutes: 20,
    value: 2,
    apiValue: 20
  }
];

let validity_props = [
  {
    label: 'Day only',
    value: 0,
    query: 'dayOnly'
  },
  {
    label: 'Good until canceled',
    value: 1,
    query: 'GTC'
  },
  {
    label: 'Extended hours',
    value: 2,
    query: 'extended'
  }
];

let order_type = [
  {
    label: 'Market',
    value: 0,
    query: 'market',
    name: 'market'
  },
  {
    label: 'Limit',
    value: 1,
    query: 'limit',
    name: 'limit'
  },
  {
    label: 'Stop-Loss',
    value: 2,
    query: '',
    name: 'stop_loss'
  }
];

const indicatorProps = [
  { label: 'VLM', info: 'Volume', value: 0 },
  { label: 'TRND', info: 'Trend Lines', value: 1 },
  { label: 'ICHI', info: 'Ichimoku Cloud', value: 2 },
  { label: 'OBV', info: 'On Balance Volume', value: 3 },
  { label: 'SMA', info: 'Simple Moving Average', value: 4 },
  { label: 'EMA', info: 'Exponential Moving Average', value: 5 },
  { label: 'MACD', info: 'Moving Average Convergence Divergence', value: 6 },
  { label: 'RSI', info: 'Relative Strength Index', value: 7 },
  { label: 'A/D Line', info: 'Accumulation/Distribution Line', value: 8 },
  { label: 'FIB', info: 'Fibonacci', value: 9 },
  { label: 'BOL', info: 'Bollinger Bands', value: 10 }
];

const initialChartRangeIndicator = '1d';

const chartRangeOptions = [
  {
    query: '1h',
    title: '1hr'
  },
  {
    query: '1d',
    title: '1d'
  },
  // one month
  {
    query: '1m',
    title: '1m',
  },
  // six months
  {
    query: '6m',
    title: '6m',
  },
  // one year
  {
    query: '1y',
    title: '1yr',
  },
  // two years
  {
    query: '2y',
    title: '2yr',
  },
  // five years
  {
    query: '5y',
    title: '5yr'
  }
]

export {
  stateOptionsMap,
  maritalStatusList,
  employmentStatusList,
  investmentStatusList,
  statesHash,
  //  from trending view
  scan_props,
  sector_props,
  industry_utilities,
  industry_telecomm,
  industry_realestate,
  industry_materials,
  industry_infotech,
  industry_industrials,
  industry_health,
  industry_financials,
  industry_energy,
  industry_consumerstaples,
  industry_consumerdiscretionary,

  THEME_KEY,
  ACCESS_TOKEN_KEY,
  CURRENT_USER_ID_KEY,
  TOUCH_ID_ENABLED_KEY,
  newsSources,
  initialIndicators,
  autoLogOffOptions,
  validity_props,
  order_type,
  SETTINGS_DATA_KEY,
  indicatorProps,
  initialChartRangeIndicator,
  chartRangeOptions
}

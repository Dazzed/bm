var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
} = ReactNative;

var Style = StyleSheet.create({
  radioForm: {
  },

  radioWrap: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 5,
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 30,
    height: 30,


    alignSelf: 'center',

    borderColor: '#2196f3',
    transform: [{ rotate: '45deg'}],
    left: -10,
  },

  radioLabel: {
    paddingLeft: 0,
    lineHeight: 20,
  },


  radioInfo: {
    marginTop:-20,
    lineHeight: 2,
    paddingLeft: 10,
    fontSize: 10,
    fontWeight: 'normal',
    flex: 1,
    color: '#9EA1AA'
  },

  labelWrap: {
  },

  radioNormal: {
  },

  radioActive: {
    width: 20,
    height: 20,
    backgroundColor: '#2196f3',
  },

  labelWrapStyle: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  labelVerticalWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },

  labelVertical: {
    paddingLeft: 0,
  },

  formHorizontal: {
    flexDirection: 'row',
  },
});

module.exports = Style;

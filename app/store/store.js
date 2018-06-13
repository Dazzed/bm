import React, { Component } from 'react';
import illustration from '../images/illustration.png';
import illustrationDark from '../images/illustration_dark.png';
import deleteImg from '../images/delete.png';
import deleteImgDark from '../images/delete_dark.png';

var themeColor = true

export function setTheme(color) {
  themeColor = color;
  console.log('setTheme: ', themeColor);
  colors();
}

export function colors() {
	if(themeColor == false) {
		var _colors = {
		    realWhite: 	'#ffffff',
		    white: 		'#ffffff',
		    contentBg: 	'#F8F9FB',
		    darkGray: 	'#3D4356',
		    lightGray: 	'#9EA1AA',
		    grayTwo: 	'#CBCCD2',
		    borderGray: '#E2E3E6',    
		    darkSlate: 	'#323943',
		    blue: 		'#00CEFF',
		    green: 		'#41EF89',
			red: 		'#FF5D71',
			illustration: illustration,
			deleteImg: deleteImg
		}

	} else {
		var _colors = {
		    realWhite: 	'#ffffff',
		    white: 		'#2B324F',
		    contentBg: 	'#1E243B',
		    darkGray: 	'#9EA1AA',
		    lightGray: 	'#767B8B',
		    borderGray: '#767B8B',    
		    darkSlate: 	'#FFFFFF',
		    blue: 		'#00CEFF',
		    green: 		'#41EF89',
			red: 		'#FF5D71',
			illustration: illustrationDark,
			deleteImg: deleteImgDark
		}
	}	
	return _colors;	
}

export function getTheme() {
	return themeColor;
}


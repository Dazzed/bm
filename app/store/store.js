import React, { Component } from 'react';

import { LIGHT_THEME, DARK_THEME } from '../style/colorStore';

var themeColor = false;

export function setTheme(color) {
	themeColor = color;
	console.log('setTheme: ', themeColor);
	colors();
}

export function colors(isDarkThemeActive) {
	if (isDarkThemeActive === true || isDarkThemeActive === false) {
		if (isDarkThemeActive) {
			return DARK_THEME;
		} else {
			return LIGHT_THEME;
		}
	}
	if (themeColor === false) {
		return LIGHT_THEME;
	} else {
		return DARK_THEME;
	}
}

export function getTheme() {
	console.log('get theme', themeColor)
	return themeColor;
}

import {setTheme, getTheme} from '../store/store';
import illustration from '../images/illustration.png';
import illustrationDark from '../images/illustration_dark.png';

console.log('colors', getTheme());
var theme = getTheme();
if(theme == false) {
	var _colors = {
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
		illustration: illustrationDark
	}

} else {
	var _colors = {
	    white: 		'#2B324F',
	    contentBg: 	'#1E243B',
	    darkGray: 	'#9EA1AA',
	    lightGray: 	'#767B8B',
	    borderGray: '#767B8B',    
	    darkSlate: 	'#FFFFFF',
	    blue: 		'#00CEFF',
	    green: 		'#41EF89',
		red: 		'#FF5D71',
		illustration: illustration
	}
}

module.exports = _colors

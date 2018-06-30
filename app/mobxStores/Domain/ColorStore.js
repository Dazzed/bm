import { observable, action, computed, toJS } from 'mobx';

import { LIGHT_THEME, DARK_THEME } from '../../style/colorStore';

export default class ColorStore {

    constructor() {
        console.log('====== COLOR STORE STARTS');
    }

    @observable themeType = 'light';

    @action setTheme = (theme) => {
        // console.warn('set theme MOBX = = = = = = ================ ', theme);
        this.themeType = theme;
        this.printTheme();
    }

    @action printTheme = () => {
        let theme = this.returnTheme()
        for(let elem in theme) {
            let objElem = theme[elem];
            if(typeof objElem === 'string') {
                console.log('===', elem)
                console.log(`%c ${elem}: ${objElem}`, `color: ${objElem}`);
            }
        }
    }

    @action returnTheme = () => {
        console.log('======= return theme')
        if(this.themeType == 'dark') {
            // console.log('===== DARK_THEME', DARK_THEME);
            return DARK_THEME
        } else {
            // console.log('===== LIGHT_THEME', LIGHT_THEME);
            return LIGHT_THEME
        }
    }

    @computed get theme() {
        if(this.themeType == 'dark') {
            return DARK_THEME
        } else {
            return LIGHT_THEME
        }
    }
}
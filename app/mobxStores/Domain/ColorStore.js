import { observable, action, computed } from 'mobx';

import { LIGHT_THEME, DARK_THEME } from '../../style/colorStore';

export default class ColorStore {

    constructor() {
        console.log('====== COLOR STORE STARTS');
    }

    @observable themeType = 'light';

    @action setTheme = (theme) => {
        console.log('set theme MOBX ================ ', theme);
        this.themeType = theme;
    }

    @computed get theme() {

        if(this.themeType === 'dark') {
            console.log('===== DARK_THEME', DARK_THEME);
            return DARK_THEME
        } else {
            console.log('===== LIGHT_THEME', LIGHT_THEME);
            return LIGHT_THEME
        }
    }
}
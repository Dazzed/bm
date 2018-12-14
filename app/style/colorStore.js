import React, { Component } from 'react';
import illustration from '../images/illustration.png';
import illustrationDark from '../images/illustration_dark.png';
import deleteImg from '../images/delete.png';
import deleteImgDark from '../images/delete_dark.png';
import rightArrow from '../images/right_arrow.png';
import rightArrowDark from '../images/right_arrow_dark.png';
import documentImage from '../images/document.png';
import documentImageDark from '../images/document_dark.png';
import addImage from '../images/add.png';
import addImageDark from '../images/add_dark.png';
import searchCancelImage from '../images/searchcancel.png';
import searchCancelImageDark from '../images/searchcancel_dark.png';
import logoImage from '../images/logo.png';
import logoImageDark from '../images/logo_dark.png';
import watchlistAdded from '../images/watchlist_added.png';

const LIGHT_THEME = {
    realWhite: '#ffffff',
    white: '#ffffff',
    contentBg: '#F8F9FB',
    darkGray: '#3D4356',
    lightGray: '#9EA1AA',
    grayTwo: '#CBCCD2',
    borderGray: '#E2E3E6',
    darkSlate: '#323943',
    inactiveDarkSlate: '#dddddd',
    blue: '#00CEFF',
    green: '#41EF89',
    red: '#FF5D71',
    progressFull: '#d8d8d8',
    chartLandscapeLabel: '#3d4357',
    illustration: illustration,
    deleteImg: deleteImg,
    rightArrow: rightArrow,
    documentImage: documentImage,
    addImage: addImage,
    searchCancelImage: searchCancelImage,
    logoImage: logoImage,
    watchlistAdded: watchlistAdded
};

const DARK_THEME = {
    realWhite: '#ffffff',
    white: '#2B324F',
    contentBg: '#1E243B',
    darkGray: '#9EA1AA',
    lightGray: '#767B8B',
    borderGray: '#767B8B',
    darkSlate: '#FFFFFF',
    inactiveDarkSlate: '#dddddd',
    blue: '#00CEFF',
    green: '#41EF89',
    red: '#FF5D71',
    progressFull: '#3d435c',
    chartLandscapeLabel: '#ffffff',
    illustration: illustrationDark,
    deleteImg: deleteImgDark,
    rightArrow: rightArrowDark,
    documentImage: documentImageDark,
    addImage: addImageDark,
    searchCancelImage: searchCancelImageDark,
    logoImage: logoImageDark,
    watchlistAdded: watchlistAdded
};

export {
    LIGHT_THEME,
    DARK_THEME
}

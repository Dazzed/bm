import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import styles from '../../style/style';
import search from '../../style/search';
import fonts from '../../style/fonts';

export default class SearchHelper extends Component {
  static propTypes = {
    parentState: PropTypes.object.isRequired,
    customLists: PropTypes.array.isRequired,
    onTapSearchHelper: PropTypes.func.isRequired,
  }

  render() {
    const {
      parentState,
      customLists,
      onTapSearchHelper
    } = this.props;
    return (
      <View style={[search.searchPresets, { backgroundColor: parentState.colors['contentBg'] }]}>
        <ScrollView style={[{ backgroundColor: parentState.colors['contentBg'] }]}>
          <View style={[{ backgroundColor: parentState.colors['contentBg'] }, search.presetContainer]}>
            <Text style={search.title}>Search by company or symbol</Text>
            {
              customLists.map((cl, i) => (
                <TouchableOpacity 
                  key={`search_page_cl_${i}`}
                  style={styles.bluebtn} 
                  onPress={onTapSearchHelper.bind(this, cl)}
                >
                  <Text style={[styles.touchblueOption, fonts.hindGunturMd]}>
                    {cl.name.trim()}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

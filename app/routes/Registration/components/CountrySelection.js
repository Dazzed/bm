import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ScrollView,
  KeyboardAvoidingView,
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  View,
  WebView,
  Image,
  Alert,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../../components/react-native-simple-radio-button';

import styles_1 from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';

import countriesList from '../../../store/countryList';

import checkBoxBlue from '../../../images/checkbox_blue.png';
import checkBoxOutline from '../../../images/checkbox_outline.png';

export default class CountrySelection extends Component {
  static propTypes = {
    onForwardStep: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // console.log(COUNTRY_LIST);
  }

  renderCountries = () => {
    let selectedCountry;
    const {
      registrationPage
    } = this.props;
    if (registrationPage.country) {
      selectedCountry = registrationPage.country;
    };
    return countriesList.map((country, i) => {
      if (selectedCountry && country.value === selectedCountry.value) {
        return (
          <View
            flexDirection="row"
            key={`country_${i}`}
            style={styles_2.countryStyleSelected}
            onPress={this.props.updateRegistrationParams.bind(this, { country: null })}
          >
            <Image source={checkBoxBlue} style={styles_2.imageStyle} /> <Text style={{
              borderBottomColor: 'black',
              borderBottomWidth: 10, marginLeft: 5, color: '#147CE0'}}>{country.label}</Text>
          </View>
        );
      } else {
        return (
          <View 
            flexDirection="row"
            style={styles_2.countryStyle}
            key={`country_${i}`}
          >
            <Text style={{
              borderBottomColor: 'black',
              borderBottomWidth: 10,
              marginLeft: 25, color: '#147CE0' }}
              onPress={this.props.updateRegistrationParams.bind(this, { country })}
              >{country.label}</Text>
          </View>
        );
      }
      // <RadioForm
      //   radio_props={sector_props}
      //   initial={this.state.sectorOption}
      //   formHorizontal={false}
      //   labelHorizontal={true}
      //   borderWidth={1}
      //   buttonColor={this.state.colors['blue']}
      //   buttonOuterColor={this.state.colors['lightGray']}
      //   buttonSize={22}
      //   buttonOuterSize={20}
      //   animation={false}
      //   labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
      //   radioLabelActive={[{ color: this.state.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
      //   labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
      //   onPress={(value) => { this.hideSector(value) }}
      //   style={scanner.radioField}
      // />
        });
  }

  render() {
    return (
      <View>
        <ScrollView style={{maxHeight: '85%'}}>
          <Text style={styles_2.registrationPageTitle}>
            COUNTRY OF CITIZENSHIP
        </Text>
          <View style={{ backgroundColor: 'white' }}>
            {this.renderCountries()}
          </View>
        </ScrollView>
        <Text>
          <Image source={checkBoxOutline} style={styles_2.naturalizedImage} /> <Text style={{color: this.props.colors['lightGray'], paddingLeft: 50}}>Check If Naturalized</Text>
        </Text>
        <TouchableHighlight
          style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn]}
        >
          <Text style={[{ color: this.props.colors['realWhite'] }, styles_1.fullBtnTxt, fonts.hindGunturBd]}>NEXT</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

import React from 'react';
import { observer } from 'mobx-react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { colorStore } from '../../../mobxStores';
import fonts from '../../../style/fonts';
import styles_2 from '../../../style/style_2';
import up from '../../../images/up.png';
import down from '../../../images/down.png';

export default class RegistrationHeader extends React.Component {

  constructor(props) {
    super(props);
    this.masterHeight = 100;
    this.buttonHeight = 23
    this.state = {
      showWhyWeAsk: false
    }
  }

  toggleWhyWeAsk() {
    this.setState({
      showWhyWeAsk: !this.state.showWhyWeAsk
    })
  }

  renderWhyWeAskText() {
    const { theme } = colorStore;
    if(this.state.showWhyWeAsk) {
      return <View style={[styles_2.whyWeAskView]}>
        <Text style={[{ color: theme.darkSlate }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
          {this.props.whyWeAskText}
        </Text>
      </View>
    } else {
      return null;
    }
  }

  renderExtraContent() {
    if(this.props.extraContent) {
      return this.props.extraContent
    } else {
      return null;
    }
  }

  renderExpandedContent() {
    const { theme } = colorStore;
    if(this.state.showWhyWeAsk) {
      return <View style={{flex: 1}}>
        {this.renderWhyWeAskText()}
        {this.renderExtraContent()}
        <Image source={theme.illustration} style={{ width: 358, height: 150, position: 'relative', right: -25 }} />
      </View>
    } else {
      return null;
    }

  }

  renderWhyWeAskButton() {
    const { theme } = colorStore;

    if(!this.props.whyWeAskText && !this.props.extraContent) {
      return null;
    }

    let whyWeAskStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: "red",
      width: '100%',
      alignContent: 'center',
    }

    let inlineSubContainerStyle = {
      borderWidth: 1,
      height: this.buttonHeight,
      flexDirection: 'row',
      borderColor: "#9a9ea8",
      width: 125,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
    }

    return <TouchableOpacity style={whyWeAskStyle} onPress={() => this.toggleWhyWeAsk()}>
      <View style={inlineSubContainerStyle}>
        <Text style={[ fonts.hindGunturRg, styles_2.whyWeAskLabel, { color: theme.darkSlate, paddingTop: 2 }]}>
            WHY WE ASK
        </Text>
        <Image source={this.state.showWhyWeAsk ? up : down} style={{ width: 11, height: 7, marginLeft: 5, marginBottom: 1 }} />
      </View>
    </TouchableOpacity>
  }

  renderHeaderText() {
    const { theme } = colorStore;
    let inlineTextStyle = [{
        color: theme.darkSlate,
      },
      fonts.hindGunturMd,
      styles_2.registrationPageTitle
    ]
    return <View>
      <Text style={inlineTextStyle}>{this.props.headerText}</Text>
    </View>
  }

  renderGeneralText() {
    const { theme } = colorStore;
    let inlineTextStyle = [{ color: theme.darkSlate }, fonts.hindGunturRg, styles_2.whyWeAskText];

    if(this.props.generalText) {
      return <Text style={inlineTextStyle}>{this.props.generalText}</Text>
    } else {
      return null;
    }
  }

  render() {
    const { theme } = colorStore;
    let inlineStyle = {
      // borderWidth: 1,
      // borderColor: 'red',
      width: '100%',
      padding: 5,
      marginBottom: 10
    }

    return <View style={inlineStyle}>
      {this.renderHeaderText()}
      {this.renderGeneralText()}
      {this.renderWhyWeAskButton()}
      {this.renderExpandedContent()}
    </View>
  }
}

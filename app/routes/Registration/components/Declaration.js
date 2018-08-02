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
import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import documentImage from '../../../images/document.png';
import { observer } from 'mobx-react';
import { colorStore, registrationStore } from '../../../mobxStores';
import TermsAndConditions from './documents/TermsAndConditions';
import PrivacyPolicy from './documents/PrivacyPolicy';
import RegistrationHeader from './registrationHeader';
import Button from '../../../sharedComponents/Button1';

let linkList = [
    { title: "Terms & Conditions", value: 'tnc' },
    { title: "Privacy Policy", value: 'pp' },
    { title: "User Agreement", value: 'ca' },
    { title: "Risk Disclosure Notice", value: 'rdn' }
]

@observer
export default class Declaration extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        resetRegistrationParams: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            whichPopOver: null
        };
    }

    newWin(win) {
        console.log('set win', win)
        this.setState({
            whichPopOver: win,
        })
    }

    renderChosenContent() {
        const { whichPopOver } = this.state;
        console.log('which', whichPopOver)
        if(whichPopOver == 'tnc') {
            return <TermsAndConditions />
        } else if(whichPopOver == 'pp') {
            return <PrivacyPolicy />
        } else if(whichPopOver == 'ca') {
            return <View>
                <Text>ca</Text>
            </View>
        } else if(whichPopOver == 'rdn') {
            return <View>
                <Text>rdn</Text>
            </View>
        } else {
            return null
        }
    }

    renderPopOver() {
        const { theme } = colorStore;
        if(this.state.whichPopOver) {
            return <View style={[{position: 'absolute', top: 0, width: '100%', height: '85%', backgroundColor: theme.white}]}>
                <TouchableOpacity style={{paddingVertical: 10}} onPress={() => this.newWin(null)}>
                    <Image
                        style={{height: 25, width: 25, margin: 5}}
                        resizeMode="contain"
                        source={require('../../../images/close.png')}
                    />
                </TouchableOpacity>
                <ScrollView style={{flex: 1, paddingHorizontal: 5, marginVertical: 5}}>
                    {this.renderChosenContent()}
                </ScrollView>
            </View>
        }
    }

    renderLinks() {
        return linkList.map((link, i) => {
            return (
                <View key={`list_${i}`}>
                    <View style={{ display: 'flex', flexDirection: 'row', margin: 9 }}>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 5 }]} ><Image source={this.props.colors['documentImage']} style={{ width: 21, height: 31 }} /></Text>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, { fontSize: 20, textAlign: 'left', flex: 8, borderBottomColor: "#fff", borderBottomWidth: 1 }]} onPress={() => { this.newWin(`${link.value}`); }}> {link.title}</Text>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 15, textAlign: 'right' }]} ><Image source={this.props.colors['rightArrow']} style={{ width: 10, height: 18 }} /></Text>
                    </View>
                    {(i < (linkList.length - 1)) &&
                        <View style={{ display: 'flex', flexDirection: 'row', margin: 9}}>
                            <View style={{ flex: 1 }}> </View>
                            <View style={{ borderBottomColor: "#ffffff20", borderBottomWidth: 1, flex: 9 }}></View>
                        </View>}
                </View>
            )
        })
    }

    nextView() {
      this.props.onForwardStep();
    }

    render() {
      return (
          <KeyboardAvoidingView
              behavior={this.props.behavior}
              style={[styles_2.section, {position: 'relative'}]}>
              <View style={[{ margin: 15 }]}>
                  <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                  <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: this.props.progress, borderRadius: 1.5 }]}></View>
              </View>
              <ScrollView style={{ height: '72%' }}>
                <RegistrationHeader headerText={'I DECLARE THAT I HAVE READ AND AGREE TO THE FOLLOWING'} generalText={null} whyWeAskText={null} extraContent={null} />

                  <View style={[{ backgroundColor: this.props.colors['white'] }]}>
                      <View style={[styles_2.registrationFormView]}>
                          {this.renderLinks()}
                      </View>
                  </View>
              </ScrollView>
              {this.renderPopOver()}
              <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                  
                  <View style={{padding: 20}}>
                    <Button title={this.state.loading ? 'LOADING...' : 'I AGREE'} onPress={() => this.nextView()} />
                  </View>
              
              </View>
          </KeyboardAvoidingView>
        )
    }
}

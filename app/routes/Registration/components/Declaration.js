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
import Modal from '../../../components/react-native-modal'
import { colorStore, registrationStore } from '../../../mobxStores';
import TermsAndConditions from './documents/TermsAndConditions';
import PrivacyPolicy from './documents/PrivacyPolicy';
import Disclosure from './documents/Disclosure';
import Agreement from './documents/Agreement';
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
            whichPopOver: null,
            isTermsVisible: false,
            isPpVisible: false,
            isAgreementVisible: false,
            isDisclosureVisible: false,
        };
    }

    newWin(win) {
        console.log('set win', win)
        // this.setState({
        //     whichPopOver: win,
        // })

        if (win  === 'tnc') {
            this.showTerms();
        }
        if (win === 'pp') {
            this.showPp();
        }
        if (win === 'ca') {
            this.showAgreement();
        }
        if (win === 'rdn') {
            this.showDisclosure();
        }
    }

    renderChosenContent() {
        const { whichPopOver } = this.state;
        console.log('which', whichPopOver)
        if(whichPopOver == 'tnc') {
            return <TermsAndConditions />
        } else if(whichPopOver == 'pp') {
            return <PrivacyPolicy />
        } else if(whichPopOver == 'ca') {
            return <Agreement />
        } else if(whichPopOver == 'rdn') {
            return <Disclosure />
        } else {
            return null
        }
    }

    showTerms() {
        this.setState({ isTermsVisible: true })
    }

    hideTerms() {
        this.setState({ isTermsVisible: false })
    }

    showPp() {
        this.setState({ isPpVisible: true })
    }

    hidePp() {
        this.setState({ isPpVisible: false })
    }

    showAgreement() {
        this.setState({ isAgreementVisible: true })
    }

    hideAgreement() {
        this.setState({ isAgreementVisible: false })
    }

    showDisclosure() {
        this.setState({ isDisclosureVisible: true })
    }

    hideDisclosure() {
        this.setState({ isDisclosureVisible: false })
    }

    renderPopOver() {
        const { theme } = colorStore;
        if(this.state.whichPopOver) {
            return <View style={[{position: 'absolute', top: 0, width: '100%', height: '85%', backgroundColor: theme.white}]}>
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

    renderGeneralErrorMessage() {
        const { registrationErrorDataJS } = registrationStore;
        if (registrationErrorDataJS && 'message' in registrationErrorDataJS) {
            return <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'red' }}><Text style={fonts.hindGunturBd}>Error: </Text>{registrationErrorDataJS.message}</Text>
            </View>
        } else {
            return null;
        }
    }

    nextView() {
        const { registrationDataJS } = registrationStore;
        console.log('HANDLE FORWARD STEP ASYNC');
        registrationStore.submitRegistration()
        .then((res) => {
            console.log('submit res', res)
            if (res.ok) {
                this.props.onForwardStep();
            } else {
                console.log('============== registration error', res)
            }
        })
        .catch((err) => {
            console.log('subimt err', err)
        })
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
                      <View style={[styles_2.registrationFormView]}>
                          {this.renderGeneralErrorMessage()}
                      </View>
                  </View>
              </ScrollView>
              <Modal
                  isVisible={this.state.isTermsVisible}
                  animationIn={'slideInUp'}
                  animationOut={'slideOutDown'}>
                  <TermsAndConditions hideTerms={() => this.hideTerms()} />
              </Modal>
              <Modal
                  isVisible={this.state.isPpVisible}
                  animationIn={'slideInUp'}
                  animationOut={'slideOutDown'}>
                  <PrivacyPolicy hidePp={() => this.hidePp()} />
              </Modal>
              <Modal
                  isVisible={this.state.isAgreementVisible}
                  animationIn={'slideInUp'}
                  animationOut={'slideOutDown'}>
                  <Agreement hideAgreement={() => this.hideAgreement()} />
              </Modal>
              <Modal
                  isVisible={this.state.isDisclosureVisible}
                  animationIn={'slideInUp'}
                  animationOut={'slideOutDown'}>
                  <Disclosure hideDisclosure={() => this.hideDisclosure()} />
              </Modal>

              <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                  <View style={{padding: 20}}>
                    <Button title={this.state.loading ? 'LOADING...' : 'I AGREE'} onPress={() => this.nextView()} />
                  </View>
              
              </View>
          </KeyboardAvoidingView>
        )
    }
}

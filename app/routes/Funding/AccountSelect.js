import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import Button from '../../sharedComponents/Button1';
import { numberWithCommas } from '../../utility';
import { observer } from 'mobx-react';
import { colorStore, accountStore, deviceSizeStore, authStore } from '../../mobxStores';
import { generateHeaderStyles } from '../../utility';
import {
    selectGlobalData
} from '../../selectors';

import { colors } from '../../store/store';

@observer
class AccountSelect extends React.Component {

    // static navigationOptions = ({ navigation }) => {

    //     const { theme } = colorStore;
    //     let headerStyleToExtend = generateHeaderStyles(theme);

    //     let title = 'Withdraw funds';
    //     if(navigation.state.params.widthdrawDepositMode === 'deposit') {
    //         title = 'Fund my account'
    //     }
    //     return {
    //         title: title,
    //         ...headerStyleToExtend
    //     };
    // };

    constructor(props) {
        super(props);
        this.state = {
            selectedAccountIndex: 0,
            withdrawDepositMode: this.props.navigation.state.params.widthdrawDepositMode,
            colors: colors(props.globalData.isDarkThemeActive)
        };
        accountStore.getAccountList();
    }

    componentDidMount() {
        let withdrawDepositMode = this.props.navigation.state.params.widthdrawDepositMode
    }

    componentDidUpdate(prevProps) {
        const {
          globalData: prevGlobalData
        } = prevProps;
        const {
          globalData: currentGlobalData
        } = this.props;
        if (prevGlobalData.isDarkThemeActive !== currentGlobalData.isDarkThemeActive) {
          this.setState({ colors: colors(currentGlobalData.isDarkThemeActive) });
        }
    }

    navToFundAccount = () => {
        this.props.navigation.navigate('FundMyAccount', {
            widthdrawDepositMode: this.props.navigation.state.params.widthdrawDepositMode
        })
    }

    selectAccount = (i, index) => {
        const { selectAccountByIndex } = accountStore;
        selectAccountByIndex(index);
    }

    renderCashAvailable = () => {
        const { selectedAccount } = accountStore;
        const { theme } = colorStore;
        const { userDataToJs } = authStore;
        if(this.state.withdrawDepositMode === 'withdraw') {
            let textStyle = {
                fontSize: 30,
                textAlign: 'center',
                color: theme.darkSlate
            }
            const brokerageAccountBalance = userDataToJs.brokerageAccount || 0;

            return <View>
                <Text style={textStyle}>${numberWithCommas(brokerageAccountBalance.toFixed(2))}</Text>
                <Text style={textStyle}>AVAILABLE</Text>
                <View style={{marginVertical: 10}}></View>
            </View>
        } else {
            return null
        }
    }


    renderAccountList = () => {
        const { theme } = colorStore;

        let listHeight = 300;

        const { accountListJS, selectedAccountIndex } = accountStore;

        let containerStyle = {
            marginVertical: 5,
            height: listHeight,
            width: '80%',
            alignSelf: 'center'
        }

        let eachAccountStyle = {
            height: 80,
            padding: 2,
            backgroundColor: theme.white,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexDirection: 'row',
        }

        let leftContainer = {
            flex:1
        }

        let rightContainer = {
            flex: 4
        }

        let titleStyle = {
            fontSize: 20,
            color: theme.darkSlate
        }

        let subTitleStyle = {
            color: theme.lightGray,
        }

        let selectIcon = (i) => {
            if(selectedAccountIndex === i) {
                return <Image
                    resizeMode="contain"
                    style={{height: 20}}
                    source={require('../../images/checkbox_blue.png')}
                />
            } else {
                return null
            }
        }

        let renderDivider = (i) => {
            if(i < accountListJS.length - 1) {
                return <View style={{height: 1, width: '74%', position: 'relative', left: '19%', backgroundColor: theme.borderGray}}></View>
            } else {
                return null
            }
        }

        let masterRadius = 5;

        return <ScrollView style={containerStyle}>
            {accountListJS.map((elem, i) => {
                let thisTitleStyle = {...titleStyle}
                if(selectedAccountIndex === i) {
                    thisTitleStyle.color = theme.blue
                }
                let borderWidth = 1;
                let thisAccountStyle = {
                    height: '100%',
                    width: '100%',
                    ...eachAccountStyle,
                    borderLeftWidth: borderWidth,
                    borderRightWidth: borderWidth,
                    borderColor: theme.borderGray,
                    // borderColor: 'red',
                }
                if(i === 0) {
                    thisAccountStyle.borderTopLeftRadius = masterRadius;
                    thisAccountStyle.borderTopRightRadius = masterRadius;
                    thisAccountStyle.borderTopWidth = borderWidth;
                    thisAccountStyle.borderColor = theme.borderGray;
                }
                if(i === accountListJS.length - 1) {
                    thisAccountStyle.borderBottomLeftRadius = masterRadius;
                    thisAccountStyle.borderBottomRightRadius = masterRadius;
                    thisAccountStyle.borderBottomWidth = 1;
                }

                return <View key={i} style={{zIndex: 1, backgroundColor: theme.white, borderRadius: 5}}>
                    <TouchableOpacity onPress={(e) => this.selectAccount(e, i)} style={thisAccountStyle}>
                        <View style={leftContainer}>
                            {selectIcon(i)}
                        </View>
                        <View style={rightContainer}>
                            <Text style={thisTitleStyle}>{elem.title}</Text>
                            <Text style={subTitleStyle}>{elem.subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                    {renderDivider(i)}
                </View>
            })}
        </ScrollView>
    }

    renderBackgroundImage = () => {
        const { themeType } = colorStore;
        const { shortSide, longSide } = deviceSizeStore;
        
        let rightSpacing = 15;
        
        let imageStyle = {
          width: shortSide,
          alignSelf: 'flex-end',
          position: 'absolute',
          right: -rightSpacing,
          top: longSide / 3,
          zIndex: 0,
          // borderWidth: 1,
          // borderColor: 'red'
        }
        if(themeType == 'light') {
            return <Image
                resizeMode={'contain'}
                style={imageStyle}
                source={require('../../images/illustration.png')}
            />
        } else {
          return <Image
              resizeMode={'contain'}
              style={imageStyle}
              source={require('../../images/illustration_dark.png')}
          />
        }
    }

    renderTopInstruction = () => {
        const { theme } = colorStore;
        let instruction = null;
        if(this.state.withdrawDepositMode === 'deposit') {
          instruction = 'PLEASE SELECT AN ACCOUNT TO DRAW FROM';
          return <Text style={{textAlign: 'center', fontSize: 20, color: theme.darkSlate}}>{instruction}</Text>
        } else {
          return null
        }
    }

    renderButtonAndContent = () => {
        const { theme } = colorStore;
        return <View style={{flexDirection: 'column', position: 'relative', height: '100%', backgroundColor: theme.contentBg}}>
            {this.renderBackgroundImage()}
            <View style={{flex: 1, padding: 5}}>
              <View style={{marginVertical: 10}}></View>
              {this.renderTopInstruction()}
              <View style={{marginVertical: 10}}></View>
              {this.renderCashAvailable()}
              {this.renderAccountList()}
            </View>
            <View style={{flex: 0, padding: 30}}>
              <Button {...this.props} title="NEXT" onPress={this.navToFundAccount}/>
            </View>
        </View>
    }

    render() {
        return <View>
            {this.renderButtonAndContent()}
        </View>
    }
}

const mapStateToProps = state => ({
    globalData: selectGlobalData(state)
  });

export default connect(mapStateToProps)(AccountSelect);
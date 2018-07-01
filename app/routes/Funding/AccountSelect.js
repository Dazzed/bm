import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Button from './button';
import { numberWithCommas } from '../../utility';
import { observer } from 'mobx-react';
import { colorStore, accountStore } from '../../mobxStores';
import { generateHeaderStyles } from '../../utility';


@observer
export default class AccountSelect extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { theme } = colorStore;
        let headerStyleToExtend = generateHeaderStyles(theme);

        let title = 'Withdraw Funds';
        if(navigation.state.params.widthdrawDepositMode === 'deposit') {
            title = 'Fund My Account'
        }
        return {
            title: title,
            ...headerStyleToExtend
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedAccountIndex: 0,
            withdrawDepositMode: this.props.navigation.state.params.widthdrawDepositMode,
        }
    }

    componentDidMount() {
        let withdrawDepositMode = this.props.navigation.state.params.widthdrawDepositMode
        console.log('ACCOUNT SELECT', this, colorStore)
    }

    navToFundAccount() {
        this.props.navigation.navigate('FundMyAccount', {
            widthdrawDepositMode: this.props.navigation.state.params.widthdrawDepositMode
        })
    }

    selectAccount(i, index) {
        const { selectAccountByIndex } = accountStore;
        selectAccountByIndex(index);
    }

    renderCashAvailable() {
        const { selectedAccount } = accountStore;
        const { theme } = colorStore;

        if(this.state.withdrawDepositMode === 'withdraw') {

            let textStyle = {
                fontSize: 30,
                textAlign: 'center',
                color: theme.darkSlate
            }
            return <View>
                <Text style={textStyle}>${numberWithCommas(selectedAccount.amount)}</Text>
                <Text style={textStyle}>AVAILABLE</Text>
                <View style={{marginVertical: 10}}></View>
            </View>
        } else {
            return null
        }
    }


    renderAccountList() {
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
            height: 60,
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
            color: theme.lightGray
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
                return <View style={{height: 1, width: '100%', backgroundColor: theme.lightGray}}></View>
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
                let thisAccountStyle = {
                    height: '100%',
                    width: '100%',
                    ...eachAccountStyle,
                }
                if(i === 0) {
                    thisAccountStyle.borderTopLeftRadius = masterRadius;
                    thisAccountStyle.borderTopRightRadius = masterRadius;
                }
                if(i === accountListJS.length - 1) {
                    thisAccountStyle.borderBottomLeftRadius = masterRadius;
                    thisAccountStyle.borderBottomRightRadius = masterRadius;
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

    renderBackgroundImage() {
        const { themeType } = colorStore;
        if(themeType == 'light') {
            return <Image
                resizeMode={'contain'}
                style={{width: '80%', alignSelf: 'flex-end', position: 'absolute', right: -10, top: '50%', zIndex: 0}}
                source={require('../../images/illustration.png')}
            />
        } else {
            return null;
        }
    }

    renderTopInstruction() {
        const { theme } = colorStore;

        let instruction = null;
        if(this.state.withdrawDepositMode === 'withdraw') {
            instruction = 'PLEASE SELECT AN ACCOUNT TO DRAW FROM';
            return <Text style={{textAlign: 'center', fontSize: 20, color: theme.darkSlate}}>{instruction}</Text>
        } else {
            return null
        }
    }


    renderButtonAndContent() {
        const { theme } = colorStore;
        return <View style={{flexDirection: 'column', height: '100%', backgroundColor: theme.contentBg, padding: 5}}>

            <View style={{flex: 1, position: 'relative'}}>
                {this.renderBackgroundImage()}
                <View style={{marginVertical: 10}}></View>
                {this.renderTopInstruction()}
                <View style={{marginVertical: 10}}></View>
                {this.renderCashAvailable()}
                {this.renderAccountList()}
            </View>

            <View style={{flex: 0}}>
                <Button {...this.props} title="Next" onPress={() => this.navToFundAccount()}/>
            </View>

        </View>
    }

    render() {
        return <View>
            {this.renderButtonAndContent()}
        </View>
    }
}
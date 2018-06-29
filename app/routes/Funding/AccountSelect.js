import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

import Button from './button';
import { setTheme, getTheme, colors } from '../../store/store';




export default class AccountSelect extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            colors: colors(),
            selectedAccountIndex: 0
        }
    }

    componentDidMount() {
        console.log('this', this)
    }

    navToFundAccount() {
        this.props.navigation.navigate('FundMyAccount')
    }

    selectAccount(i, val) {
        this.setState({
            selectedAccountIndex: val
        })
    }

    renderAccountList() {

        let listHeight = 190;

        let accountList = [
            {
                title: 'MOCK BANK TITLE 1',
                subtitle: 'SUBTITLE 1'
            },
            {
                title: 'MOCK BANK TITLE 2',
                subtitle: 'SUBTITLE 2'
            },
            {
                title: 'MOCK BANK TITLE 3',
                subtitle: 'SUBTITLE 3'
            }
        ];

        let containerStyle = {
            marginVertical: 5,
            height: listHeight,
            width: '80%',
            alignSelf: 'center'
        }

        let eachAccountStyle = {
            backgroundColor: this.state.colors.white,
            height: 60,
            // margin: 2,
            padding: 2,
            backgroundColor: this.state.colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        }

        let leftContainer = {
            flex:1
        }

        let rightContainer = {
            flex: 4
        }

        let titleStyle = {
            fontSize: 20
        }

        let subTitleStyle = {
            color: this.state.colors.lightGray
        }

        let selectIcon = (i) => {
            if(this.state.selectedAccountIndex === i) {
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
            if(i < accountList.length - 1) {
                return <View style={{height: 1, width: '100%', backgroundColor: this.state.colors.lightGray}}></View>
            } else {
                return null
            }

        }

        let masterRadius = 5;

        return <ScrollView style={containerStyle}>
            {accountList.map((elem, i) => {
                let thisTitleStyle = {...titleStyle}
                if(this.state.selectedAccountIndex === i) {
                    thisTitleStyle.color = this.state.colors.blue
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
                if(i === accountList.length - 1) {
                    thisAccountStyle.borderBottomLeftRadius = masterRadius;
                    thisAccountStyle.borderBottomRightRadius = masterRadius;
                }

                return <View key={i}>
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
        return <Image
            resizeMode={'contain'}
            style={{width: '80%', alignSelf: 'flex-end', position: 'relative', right: -10}}
            source={require('../../images/illustration.png')}
        />
    }

    renderButtonAndContent() {
        return <View style={{flexDirection: 'column', height: '100%'}}>
            <View style={{flex: 1}}>
                <View style={{marginVertical: 5}}></View>
                <Text style={{textAlign: 'center', fontSize: 20}}>PLEASE SELECT AN ACCOUNT TO DRAW FROM</Text>
                <View style={{marginVertical: 5}}></View>
                {this.renderAccountList()}
                {this.renderBackgroundImage()}
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
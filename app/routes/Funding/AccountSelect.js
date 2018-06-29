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

        let listHeight = 200;

        let accountList = [1, 2, 3];

        let containerStyle = {
            backgroundColor: this.state.colors.white,
            margin: 5,
            height: listHeight,
            borderRadius: 5
        }

        let eachAccountStyle = {
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

        return <ScrollView style={containerStyle}>
            {accountList.map((elem, i) => {
                return <View key={i}>
                    <TouchableOpacity onPress={(e) => this.selectAccount(e, i)} style={{height: '100%', width: '100%', ...eachAccountStyle}}>
                        <View style={leftContainer}>
                            {selectIcon(i)}
                        </View>
                        <View style={rightContainer}>
                            <Text style={titleStyle}>MOCK BANK CHECKING{elem}</Text>
                            <Text>Saving number</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            })}
        </ScrollView>
    }

    render() {
        return <View>

            <View style={{marginVertical: 5}}></View>
            <Text style={{textAlign: 'center', fontSize: 20}}>PLEASE SELECT AN ACCOUNT TO DRAW FROM</Text>
            <View style={{marginVertical: 5}}></View>

            {this.renderAccountList()}

            <Button {...this.props} title="Next" onPress={() => this.navToFundAccount()}/>
        </View>
    }
}
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Button from '../../sharedComponents/Button1';
import { setTheme, getTheme, colors } from '../../store/store';
import { colorStore } from '../../mobxStores';
import { generateHeaderStyles } from '../../utility';


export default class AccountSelect extends React.Component {


//     const { theme } = colorStore;
//
// let headerStyleToExtend = generateHeaderStyles(theme);
//
// ...headerStyleToExtend

    static navigationOptions = ({ navigation }) => {
        let title = 'Funds Withdrawn';
        if(navigation.state.params.widthdrawDepositMode === 'deposit') {
            title = 'Account Funded'
        }

        const { theme } = colorStore;
        let headerStyleToExtend = generateHeaderStyles(theme);

        return {
            title: title,
            ...headerStyleToExtend
        };
    };

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

    navToTradingView() {
        // this.props.navigation.navigate('FundMyAccount')
    }

    renderMessage() {
        let amount = 300
        let message = `You just deposited $${amount}`

        let bankName = 'BANK MOCK'
        let accountType = 'checking'

        if(true) {
            message = `You just withdrew $${amount} from your ${bankName} ${accountType} account.`
        }

        return <View style={{marginVertical: 5}}>
            <Text style={{textAlign: 'center', fontSize: 20}}>{message}</Text>
            <Text style={{textAlign: 'center', fontSize: 20}}>Cheers!</Text>
        </View>
    }

    render() {
        return <View style={{backgroundColor: this.state.colors.white, alignItems: 'center', flex: 1, padding: 30}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
                style={{height: 100, width: 100}}
                resizeMode="contain"
                source={require('../../images/success_image.png')}
            />
            {this.renderMessage()}
          </View>
          <View style={{flex: 0, width: '100%'}}>
            <Button {...this.props} title="START TRADING" onPress={() => this.navToTradingView()}/>    
          </View>
        </View>
    }
}
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Button from '../../sharedComponents/Button1';
import { setTheme, getTheme, colors } from '../../store/store';
import { colorStore } from '../../mobxStores';
import { generateHeaderStyles, numberWithCommas } from '../../utility';

export default class Success extends React.Component {

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
        this.props.navigation.navigate('AppNavTabs')
    }

    renderMessage() {
      const { theme } = colorStore;
      
        let amount = this.props.navigation.state.params.amount;

        let bankName = 'BANK MOCK'
        let accountType = 'checking'

        let formattedAmount = numberWithCommas(amount);
        
        let action = 'withdrawn'
        
        if(this.props.navigation.state.params.widthdrawDepositMode === 'deposit') {
          action = 'deposited'
        }

        let message = `You just withdrew $${formattedAmount} from your ${bankName} ${accountType} account.`

        return <View style={{marginVertical: 5, backgroundColor: theme.contentBg}}>
            <Text style={{textAlign: 'center', fontSize: 20, color: theme.darkSlate}}>{message}</Text>
            <Text style={{textAlign: 'center', fontSize: 20, color: theme.darkSlate}}>Cheers!</Text>
        </View>
    }

    render() {
      const { theme } = colorStore
        return <View style={{backgroundColor: theme.contentBg, alignItems: 'center', flex: 1, padding: 30}}>
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
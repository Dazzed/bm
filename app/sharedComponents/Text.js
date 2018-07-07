import React from 'react';
import { observer } from 'mobx-react';
import { Text } from 'react-native';
import { colorStore } from '../mobxStores';
import fonts from '../style/fonts';

export default class StyledText extends React.Component {

    render() {
        const { theme } = colorStore;
        return <Text style={[{color: theme.darkSlate}, fonts.hindGunturRg]} {...this.props}>{this.props.children}</Text>
    }
}
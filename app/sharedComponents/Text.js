import React from 'react';
import { observer } from 'mobx-react';
import { Text } from 'react-native';
import { colorStore } from '../mobxStores';
import fonts from '../style/fonts';

export default class StyledText extends React.Component {

    render() {
        const { theme } = colorStore;

        let inlineStyle = {color: theme.darkSlate}
        let style = [fonts.hindGunturRg, {...inlineStyle}]

        return <Text style={style}>{this.props.children}</Text>
    }
}

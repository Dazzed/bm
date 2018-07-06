import React from 'react';
import { Text } from 'react-native';
import { colorStore } from '../../../../mobxStores';
import { observer } from 'mobx-react';

@observer
export default class StyledText extends React.Component {
    render() {
        const { theme } = colorStore;
        // console.log('==== styled text', this.props)
        return <Text style={{marginVertical: 5, color: theme.darkSlate}}>
            {this.props.children}
        </Text>
    }
}
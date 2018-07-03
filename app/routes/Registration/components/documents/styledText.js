import React from 'react';
import { Text } from 'react-native';

export default class StyledText extends React.Component {
    render() {
        // console.log('==== styled text', this.props)
        return <Text style={{marginVertical: 5}}>
            {this.props.children}
        </Text>
    }
}
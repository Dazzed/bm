import React from 'react';
import { observer } from 'mobx-react';
import { TextInput, View } from 'react-native';
import { colorStore } from '../mobxStores';
import fonts from '../style/fonts';
import styles_2 from '../style/style_2';

export default class StyledTextInput extends React.Component {


    // style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.addressTwoClass]}

    constructor(props) {
        super(props)
        this.state = {
            active: true
        }
    }


    // TODO: get the underline working nicely
    // onFocus(item) {
    //     console.log('on focus')
    //     this.setState({ active: true }, () => {
    //         console.log('thisklsdjfldsj', this)
    //         if(this.props.onFocus) {
    //             this.props.onFocus()
    //         }
    //
    //     })
    // }
    //
    // onBlur(item) {
    //     console.log('on blur')
    //     this.setState({ active: false }, () => {
    //         console.log('thisklsdjfldsj', this)
    //         if(this.props.onBlur) {
    //             this.props.onBlur()
    //         }
    //     })
    // }


    render() {
        const { theme } = colorStore;

        let inlineStyle = [
            {color: theme.darkSlate},
            fonts.hindGunturRg,
            styles_2.registrationFormField,
        ]

        if (!this.props.showBlackBorder) {
            if (this.state.active && !this.props.preventBlueUnderline) {
                inlineStyle.push(styles_2.registrationFormFieldActive)
            } else {
                inlineStyle.push(styles_2.registrationFormFieldInActive)
            }
        } else {
            inlineStyle.push({ borderBottomColor: '#000000'})
        }

        return <View style={{width: '100%', marginVertical: 5}}>
            <TextInput
                {...this.props}
                selectionColor="#00CEEF"
                style={inlineStyle}
                placeholderTextColor={theme.lightGray}
            />
        </View>
    }
}

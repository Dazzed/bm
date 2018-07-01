import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import numbers from '../style/numbers';
import fonts from '../style/fonts';
import { setTheme, getTheme, colors } from '../store/store';

export default class NumericalSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: colors()
        }
    }

    componentWillMount() {
        // console.log('numerical mounts', this)
    }

    addNumber(newNumber) {
        this.props.onChange(newNumber)
    }

    backspace() {
        this.props.onDelete()
    }

    render() {
        let keypadHeight = 250;

        let containerStyle = {
            height: keypadHeight,
            backgroundColor: 'white'
        }

        let rowStyle = {
            // borderWidth: 1,
            // borderColor: 'green',
            flexDirection: 'row',
        }

        let keypadStyle = {
            height: keypadHeight,
            marginTop: 5,
            marginBottom: 5
        }

        let numberStyle = [
            {
                color: this.state.colors['darkSlate'],
                fontSize: 20
            },
            fonts.hindGunturRg
        ]

        let eachNumberStyle = {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
            // borderColor: 'purple',
            height: keypadHeight / 4
        }

        return <View style={containerStyle}>
            <View style={keypadStyle}>
                <View style={rowStyle}>
                    <TouchableOpacity onPress={() => this.addNumber('1')} style={eachNumberStyle}>
                        <Text style={numberStyle}>1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.addNumber('2')} style={eachNumberStyle}>
                        <Text style={numberStyle}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addNumber('3')} style={eachNumberStyle}>
                        <Text style={numberStyle}>3</Text>
                    </TouchableOpacity>
                </View>

                <View style={rowStyle}>
                    <TouchableOpacity onPress={() => this.addNumber('4')} style={eachNumberStyle}>
                        <Text style={numberStyle}>4</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.addNumber('5')} style={eachNumberStyle}>
                        <Text style={numberStyle}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addNumber('6')} style={eachNumberStyle}>
                        <Text style={numberStyle}>6</Text>
                    </TouchableOpacity>
                </View>

                <View style={rowStyle}>
                    <TouchableOpacity onPress={() => this.addNumber('7')} style={eachNumberStyle}>
                        <Text style={numberStyle}>7</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.addNumber('8')} style={eachNumberStyle}>
                        <Text style={numberStyle}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addNumber('9')} style={eachNumberStyle}>
                        <Text style={numberStyle}>9</Text>
                    </TouchableOpacity>
                </View>


                <View style={rowStyle}>
                    <View style={eachNumberStyle}>
                    </View>
                    <TouchableOpacity onPress={() => this.addNumber('0')} style={eachNumberStyle}>
                        <Text style={numberStyle}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.backspace()} style={eachNumberStyle}>
                        <Image
                            style={{height: '50%'}}
                            resizeMode="contain"
                            source={require('../images/delete.png')}

                        />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    }
}


{/*<View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, borderBottomWidth: 0, borderBottomColor: this.props.colors['white']  }, styles_2.numContainer]}>*/}
    {/*<View style={styles_2.digitContainer}>*/}
        {/*<View style={numbers.row}>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(1); }}>1</Text>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(2); }}>2</Text>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(3); }}>3</Text>*/}
        {/*</View>*/}
        {/*<View style={numbers.row}>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(4); }}>4</Text>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(5); }}>5</Text>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(6); }}>6</Text>*/}
        {/*</View>*/}
        {/*<View style={numbers.row}>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(7); }}>7</Text>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(8); }}>8</Text>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(9); }}>9</Text>*/}
        {/*</View>*/}
        {/*<View style={numbers.row}>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]}></Text>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(0); }}>0</Text>*/}
            {/*<Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers_right, fonts.hindGunturRg]} onPress={() => { this.removeNum(); }}>*/}
                {/*<Text> </Text>*/}
                {/*<Image*/}
                    {/*source={this.props.colors['deleteImg']}*/}
                    {/*style={{ width: 40, height: 26 }}*/}
                {/*/>*/}
            {/*</Text>*/}
        {/*</View>*/}
    {/*</View>*/}
{/*</View>*/}
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import numbers from '../style/numbers';
import fonts from '../style/fonts';
import { setTheme, getTheme, colors } from '../store/store';
import { colorStore } from '../mobxStores';

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

    isDisabled(number) {
        if(this.props.disabledList) {
            let disabledList = this.props.disabledList;
            return disabledList.indexOf(number) > -1
        } else {
            return false
        }
    }


    render() {
      
        const { theme } = colorStore;

        let keypadHeight = 250;

        let containerStyle = {
            height: keypadHeight,
            backgroundColor: theme.white
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
                color: theme.darkSlate,
                fontSize: 20
            },
            fonts.hindGunturRg
        ]

        let eachNumberStyleOpacityContainer = {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
            // borderColor: 'purple',
            height: keypadHeight / 4
        }

        getNumberStyle = (num) => {
            let numberStyle = [
                {
                    color: theme.darkSlate,
                    fontSize: 20,
                    opacity: this.isDisabled(num) === true ? .2 : 1
                },
                fonts.hindGunturRg
            ];
            return numberStyle;
        }
        
        return <View style={containerStyle}>
            <View style={keypadStyle}>
                <View style={rowStyle}>
                    <TouchableOpacity disabled={this.isDisabled(1)} onPress={() => this.addNumber('1')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(1)}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.isDisabled(2)} onPress={() => this.addNumber('2')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(2)}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.isDisabled(3)} onPress={() => this.addNumber('3')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(3)}>3</Text>
                    </TouchableOpacity>
                </View>

                <View style={rowStyle}>
                    <TouchableOpacity disabled={this.isDisabled(4)} onPress={() => this.addNumber('4')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(4)}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.isDisabled(5)} onPress={() => this.addNumber('5')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(5)}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.isDisabled(6)} onPress={() => this.addNumber('6')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(6)}>6</Text>
                    </TouchableOpacity>
                </View>

                <View style={rowStyle}>
                    <TouchableOpacity disabled={this.isDisabled(7)} onPress={() => this.addNumber('7')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(7)}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.isDisabled(8)} onPress={() => this.addNumber('8')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(8)}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.isDisabled(9)} onPress={() => this.addNumber('9')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(9)}>9</Text>
                    </TouchableOpacity>
                </View>


                <View style={rowStyle}>
                    <TouchableOpacity disabled={this.isDisabled(0)} onPress={() => this.addNumber('.')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(0)}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.isDisabled(0)} onPress={() => this.addNumber('0')} style={eachNumberStyleOpacityContainer}>
                        <Text style={getNumberStyle(0)}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.backspace()} style={eachNumberStyleOpacityContainer}>
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
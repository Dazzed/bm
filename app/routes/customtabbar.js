import React, { Component } from 'react';
import { TabBarBottom } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../selectors';
import { colors } from '../store/store';

class CustomTabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: colors(props.globalData.isDarkThemeActive)
        };
    }

    componentDidUpdate(prevProps) {
        const {
            globalData: prevGlobalData
        } = prevProps;
        const {
            globalData: currentGlobalData
        } = this.props;
        if (prevGlobalData.isDarkThemeActive !== currentGlobalData.isDarkThemeActive) {
            this.setState({ colors: colors(currentGlobalData.isDarkThemeActive) });
        }
    }

    render(){
        return (
            <TabBarBottom
                {...this.props}
                activeTintColor={this.state.colors['darkSlate']}
                inactiveTintColor={this.state.colors['lightGray']} 
                style={{
                    backgroundColor: this.state.colors['white']
                }}
            />
        )
    }
}
// export default CustomTabBar;
CustomTabBar.propTypes = {
    globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(CustomTabBar);

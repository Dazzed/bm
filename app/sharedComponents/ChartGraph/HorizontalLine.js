import React from "react";
import {colorStore} from "../../mobxStores";
import {
    Svg,
    Line,
    Text as TextSvg,
    Polygon,
    G,
    Defs,
    Use,
    TSpan,
    Rect,
    Polyline
} from 'react-native-svg';
import {
    View,
    Text,
    Animated
} from 'react-native';
import { observer } from "mobx-react";

@observer
export default class HorizontalLine extends React.Component {

    render() {
        const { theme } = colorStore;

        let yVal = this.props.yVal;

        let lineYVal = 0;
        let boxWidth = 50;
        let boxHeight = 9;
        let pointOffset = 10;
        let xPosition = 5;

        let textLeftOffset = 5;
        let textTopOffset = boxHeight * .42;

        let topLeftCorner = (xPosition) + ',' + (lineYVal - boxHeight);
        let topRightCorner = (xPosition + boxWidth) + ',' + (lineYVal - boxHeight);
        let rightPointPosition =  (xPosition + boxWidth + pointOffset) + ',' + (lineYVal);
        let bottomRightCorner = (xPosition + boxWidth) + ',' + (lineYVal + boxHeight);
        let bottomLeftCorner = (xPosition) + ',' + (lineYVal + boxHeight);

        return <Svg
            height={this.props.height}
            width={200}
        >
            <Defs>
                <G id="horizontal_line_element">
                    <G>
                        <Line
                            key={ 'zero-axis' }
                            x1={ '0%' }
                            x2={ '100%' }
                            y1={ 0 }
                            y2={ 0 }
                            stroke={ theme.borderGray }
                            strokeDasharray={ [ 4, 8 ] }
                            strokeWidth={ 1 }
                        />
                        <Polygon
                            points={`${topLeftCorner} ${topRightCorner} ${rightPointPosition} ${bottomRightCorner} ${bottomLeftCorner}`}
                            fill={theme.borderGray}
                            stroke={theme.borderGray}
                            strokeWidth="1"
                        />
                        <TextSvg
                            fontSize={12}
                            fill={theme.white}
                            stroke={theme.white}
                            y={textTopOffset}
                            x={boxWidth / 2 + textLeftOffset}
                            textAnchor="middle"
                        >
                            {this.props.title}
                        </TextSvg>
                    </G>
                </G>
            </Defs>
            <Use href="#horizontal_line_element" x={0} y={yVal}/>
        </Svg>
    }
}
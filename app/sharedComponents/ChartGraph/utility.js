import { checkIntersection } from "line-intersect";
import moment from 'moment';

export const flipYAxisValue = (height, inverseY) => {
    return height - inverseY;
}

export const generatePolygonsFromTwoLines = (line1, line2, height) => {
    let polyGonList = [];

    // Make sure we actually have the right data
    if(!line1 || !line2) {
        return null;
    }

    // And that it's the correct length
    if(line1.lineData.length !== line2.lineData.length) {
        return null;
    }

    let data1 = line1.lineData;
    let data2 = line2.lineData;

    // Reminder
    // Lines must have points normalized at similiar distances on the x axis for this to work

    let length = data1.length;

    // let debugMode = true;
    // if(debugMode) {
    //     length = 2;
    // }

    for( let i = 0; i < data1.length; i++ ) {

        if(i === data1.length - 1) {
            // Don't do the calulation if we don't have a 'next' data to calculate agains
            break;
        }

        let lineSegment1 = [
            {x: data1[i].x,   y: data1[i].y},
            {x: data1[i+1].x, y: data1[i+1].y},
        ]

        let lineSegment2 = [
            {x: data2[i].x,   y: data2[i].y},
            {x: data2[i+1].x, y: data2[i+1].y},
        ]


        // console.log('LINE 1 start')
        // console.log(lineSegment1[0].x)
        // console.log(lineSegment1[0].y)
        // console.log('LINE 1 end')
        // console.log(lineSegment1[1].x)
        // console.log(lineSegment1[1].y)
        //
        // console.log('LINE 2 start')
        // console.log(lineSegment2[0].x)
        // console.log(lineSegment2[0].y)
        // console.log('LINE 2 end')
        // console.log(lineSegment2[1].x)
        // console.log(lineSegment2[1].y)


        let intersection = checkIntersection(
            lineSegment1[0].x, lineSegment1[0].y, lineSegment1[1].x, lineSegment1[1].y,
            lineSegment2[0].x, lineSegment2[0].y, lineSegment2[1].x, lineSegment2[1].y
        )

        let point1 = `${lineSegment1[0].x},${flipYAxisValue(height, lineSegment1[0].y)}`;
        let point2 = `${lineSegment1[1].x},${flipYAxisValue(height, lineSegment1[1].y)}`;
        let point3 = `${lineSegment2[1].x},${flipYAxisValue(height, lineSegment2[1].y)}`;
        let point4 = `${lineSegment2[0].x},${flipYAxisValue(height, lineSegment2[0].y)}`;

        // console.log('point1', point1)
        // console.log('point2', point2)
        // console.log('point3', point3)
        // console.log('point4', point4)

        // if there is no intersection, of if the intersection is an origin point
        if(intersection.type !== 'intersecting') {
            let thisPolygonPoints = `${point1}  ${point2} ${point3} ${point4}`
            let data = {
                positive: point1 > point4 ? true : false,
                points: thisPolygonPoints
            }
            console.log('no intserection', thisPolygonPoints)
            polyGonList.push(data);

        } else {
            let intersectionPoint = `${intersection.point.x},${flipYAxisValue(height, intersection.point.y)}`;

            let thisPolygonPointsLeft = `${point1} ${intersectionPoint} ${point4}`
            let data1 = {
                positive: point1 > point4 ? true : false,
                points: thisPolygonPointsLeft
            }
            polyGonList.push(data1);

            let thisPolygonPointsRightSide = `${point2} ${intersectionPoint} ${point3}`
            let data2 = {
                positive: point3 < point2 ? true : false,
                points: thisPolygonPointsRightSide
            }
            polyGonList.push(data2);
        }
    }
    return polyGonList;
}

export const parseSmallGraphData = (data) => {

    let graphMax = 0;
    let graphMin = 9999999;

    let lineData = [];
    let dateData = [];

    for(let i = 0; i < data.length; i++) {
        // console.log('eavh elem', data[i])
        let thisClosePoint = data[i].close;
        if(thisClosePoint > graphMax) {
            graphMax = thisClosePoint
        }
        if(thisClosePoint < graphMin) {
            graphMin = thisClosePoint
        }
        lineData.push(data[i].close);
        dateData.push(data[i].date);
    }

    return {
        graphMax: graphMax,
        graphMin: graphMin,
        lineData: lineData,
        dateData: dateData
    }
}

export const parseLargeGraphData = (data) => {

    let graphYMax = 0;
    let graphYMin = 999999999999;

    let graphXMax = 0;
    let graphXMin = 999999999999;


    let allGraphData = {
        dates: []
    };

    // for(let i = 0; i < data.length; i++) {
    //     // console.log('eavh elem', data[i])
    //
    //     // calculate max
    //     if(data[i].vwap > graphYMax) {
    //         graphYMax = data[i].vwap;
    //     }
    //     if(data[i].open > graphYMax) {
    //         graphYMax = data[i].open;
    //     }
    //     if(data[i].close > graphYMax) {
    //         graphYMax = data[i].close;
    //     }
    //     if(data[i].high > graphYMax) {
    //         graphYMax = data[i].high;
    //     }
    //     if(data[i].low > graphYMax) {
    //         graphYMax = data[i].low
    //     }
    //
    //     // calculate min
    //     if(data[i].vwap < graphYMin) {
    //         graphYMin = data[i].vwap;
    //     }
    //     if(data[i].open < graphYMin) {
    //         graphYMin = data[i].open;
    //     }
    //     if(data[i].close < graphYMin) {
    //         graphYMin = data[i].close;
    //     }
    //     if(data[i].high < graphYMin) {
    //         graphYMin = data[i].high;
    //     }
    //     if(data[i].low < graphYMin) {
    //         graphYMin = data[i].low
    //     }
    // }

    // for(let i = 0; i < data.length; i++) {
    //
    //     // TODO: get proper date stamps from sameep in here
    //
    //     let timeStamp = moment(data[i].date).format('X');
    //
    //     if(timeStamp > graphXMax) {
    //         graphXMax = timeStamp;
    //     }
    //     if(timeStamp < graphYMin) {
    //         graphYMin = timeStamp;
    //     }
    //
    //     // TODO: ask ben if I can do this in the same linear time. Calculate max and min and assemble all data in a relative sense
    // }

    // for(let i = 0; i < data.length; i++) {
    //
    //     let timeStamp = moment(data[i].date).format('X');
    //
    //     // console.log('----- time', data[i].date, timeStamp)
    //
    //     allGraphData.dates.push({
    //         dateStamp: data[i].date,
    //         unixTime: timeStamp,
    //         vwap: data[i].vwap,
    //         vwapCoordinate: {
    //             x: timeStamp / xGraphMax,
    //             y: vwap / yGraphMax
    //         }
    //     })
    // }



    // let thisClosePoint = data[i].close;
    //
    // if(thisClosePoint > graphYMax) {
    //     graphYMax = thisClosePoint
    // }
    // if(thisClosePoint < graphYMin) {
    //     graphYMin = thisClosePoint
    // }


    // lineData.push(data[i].close);
    // dateData.push(data[i].date);


    // {
    //     x: 0, y: 0
    // },
    // {
    //     x: 50, y: 100
    // },
    // {
    //     x: 100, y: 50
    // },
    // {
    //     x: 150, y: 50
    // },

    return allGraphData
}
































//
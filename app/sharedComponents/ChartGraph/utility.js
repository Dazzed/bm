import { checkIntersection } from "line-intersect";

export const flipYAxisValue = (height, inverseY) => {
    return height - inverseY;
}

// const slope = (x1, y1, x2, y2) => {
//     if (x1 == x2) return false;
//     return (y1 - y2) / (x1 - x2);
// }
//
// const yInt = (x1, y1, x2, y2) => {
//     if (x1 === x2) return y1 === 0 ? 0 : false;
//     if (y1 === y2) return y1;
//     return y1 - slope(x1, y1, x2, y2) * x1 ;
// }
//
// const getXInt = (x1, y1, x2, y2) => {
//     var thisSlope;
//     if (y1 === y2) return x1 == 0 ? 0 : false;
//     if (x1 === x2) return x1;
//     return (-1 * ((thisSlope = slope(x1, y1, x2, y2)) * x1 - y1)) / thisSlope;
// }
//
// const getIntersection = (x11, y11, x12, y12, x21, y21, x22, y22) => {
//     var slope1, slope2, yint1, yint2, intx, inty;
//     if (x11 == x21 && y11 == y21) return [x11, y11];
//     if (x12 == x22 && y12 == y22) return [x12, y22];
//     slope1 = slope(x11, y11, x12, y12);
//     slope2 = slope(x21, y21, x22, y22);
//     if (slope1 === slope2) return false;
//     yint1 = yInt(x11, y11, x12, y12);
//     yint2 = yInt(x21, y21, x22, y22);
//     if (yint1 === yint2) return yint1 === false ? false : [0, yint1];
//
//     if (slope1 === false) return [y21, slope2 * y21 + yint2];
//     if (slope2 === false) return [y11, slope1 * y11 + yint1];
//     intx = (slope1 * x11 + yint1 - yint2)/ slope2;
//     return [intx, slope1 * intx + yint1];
// }

export const generatePolygonsFromTwoLines = (line1, line2, height) => {


    let polyGonList = [];

    console.log('============= GENERTE POLYGONS', line1, line2);

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

    let debugMode = true;
    if(debugMode) {
        length = 2;
    }

    for( let i = 0; i < data1.length; i++ ) {

        console.log('============================================================== Each line element', i);

        if(i === data1.length - 1) {
            console.log('-- at the end');
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



            console.log('LINE 1 start')
            console.log(lineSegment1[0].x)
            console.log(lineSegment1[0].y)
            console.log('LINE 1 end')
            console.log(lineSegment1[1].x)
            console.log(lineSegment1[1].y)

            console.log('LINE 2 start')
            console.log(lineSegment2[0].x)
            console.log(lineSegment2[0].y)
            console.log('LINE 2 end')
            console.log(lineSegment2[1].x)
            console.log(lineSegment2[1].y)


        let intersection = checkIntersection(
            lineSegment1[0].x, lineSegment1[0].y, lineSegment1[1].x, lineSegment1[1].y,
            lineSegment2[0].x, lineSegment2[0].y, lineSegment2[1].x, lineSegment2[1].y
        )

        // let intersection = getIntersection(lineSegment1[0].x, lineSegment1[0].y, lineSegment1[1].x, lineSegment1[1].y, lineSegment2[0].x, lineSegment2[0].y, lineSegment2[1].x, lineSegment2[1].y);
        console.log('============= INTERSECTION', intersection)


        let point1 = `${lineSegment1[0].x},${flipYAxisValue(height, lineSegment1[0].y)}`;
        let point2 = `${lineSegment1[1].x},${flipYAxisValue(height, lineSegment1[1].y)}`;
        let point3 = `${lineSegment2[1].x},${flipYAxisValue(height, lineSegment2[1].y)}`;
        let point4 = `${lineSegment2[0].x},${flipYAxisValue(height, lineSegment2[0].y)}`;

        console.log('point1', point1)
        console.log('point2', point2)
        console.log('point3', point3)
        console.log('point4', point4)


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
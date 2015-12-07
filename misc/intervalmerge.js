var merge = function(intervals) {

    for(var i = 0; i < intervals.length - 1; i++) {

        if(intervals[i][1] >= intervals[i+1][0]) {

            intervals[i][1] = intervals[i+1][1];

            intervals.splice(i + 1, 1);

            i--;

        }

    }

    

    return intervals;

};

intervals = [[1,3],[2,6],[8,10],[15,18]];
console.log(merge(intervals));

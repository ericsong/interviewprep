function mergeSort(arr) {
    function sort(arr) {
        if(arr.length == 0 || arr.length == 1) {
            return arr;
        }

        var mid = Math.ceil(arr.length / 2);
        var leftArr = arr.slice(0, mid);
        var rightArr = arr.slice(mid, arr.length);

        return merge(mergeSort(leftArr), mergeSort(rightArr));
    }

    function merge(leftArr, rightArr) {
        var merged = [];

        while(leftArr.length > 0 && rightArr.length > 0) {
            if(leftArr[0] < rightArr[0]) {
                merged.push(leftArr.shift());
            } else {
                merged.push(rightArr.shift());
            }
        }

        while(leftArr.length > 0) {
            merged.push(leftArr.shift());
        }

        while(rightArr.length > 0) {
            merged.push(rightArr.shift());
        }

        return merged;
    }

    return sort(arr);
}

var testarr = [34, 203, 3, 746, 200, 984, 198, 764, 9];
console.log(mergeSort(testarr));

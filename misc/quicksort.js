function quicksort(arr) {
    function sort(arr, li, ri) {
        if(ri - li == 0) {
            return arr;
        }

        var pivotIndex = partition(arr, li, ri);
        sort(arr, li, pivotIndex - 1);
        sort(arr, pivotIndex, ri);

        return arr;
    }

    function partition(arr, li, ri) {
        var mid = Math.ceil((li + ri) / 2);
        var pivot = arr[mid];

        while(li < ri) {
            while(arr[li] < pivot) {
                li++;
            }

            while(arr[ri] > pivot) {
                ri--;
            }

            if (li < ri) {
                var temp = arr[li];
                arr[li] = arr[ri];
                arr[ri] = temp;
                li++;
                ri--;
            }
        }

        console.log(li);
        return li;
    }

    return sort(arr, 0, arr.length - 1);
}


var testarr = [34, 203, 3];
console.log(quicksort(testarr));

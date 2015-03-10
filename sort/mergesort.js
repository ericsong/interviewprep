function MergeSort(arr) {
  function swap(arr, li, ri) {
    var tmp = arr[li];
    arr[li] = arr[ri];
    arr[ri] = tmp;
  }

  function join(arr, li1, ri1, li2, ri2) {
    var iter = li1,
        buffer = [];

    while(li1 <= ri1 && li2 <= ri2) {
      if(arr[li1] < arr[li2]) {
        buffer.push(arr[li1]);
        li1++;
      } else {
        buffer.push(arr[li2]);
        li2++;
      }
    }

    while(li1 <= ri1) {
      buffer.push(arr[li1++]);
    }

    while(li2 <= ri2) {
      buffer.push(arr[li2++]);
    }

    for(var i = 0; i < buffer.length; i++) {
      arr[iter] = buffer[i];
      iter++;
    }
  }

  function msHelper(arr, li, ri) {
    //base case
    if(ri-li === 0) {
      return;
    } else if(ri-li === 1) {
      if(arr[ri] < arr[li]) {
        swap(arr, li, ri);
      }

      return;
    }

    var mi = Math.floor((li+ri)/2);
    msHelper(arr, li, mi);
    msHelper(arr, mi+1, ri);
    join(arr, li, mi, mi+1, ri);
  }

  msHelper(arr, 0, arr.length-1);
  return arr;
}

var testarr = [29, 123, 12, 20, 213, 2, 1, 2001, 20, 28, 17, 129, 29];
console.log(MergeSort(testarr));

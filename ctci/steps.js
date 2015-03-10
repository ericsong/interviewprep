//base cases
//n=0 -> 0
//n=1 -> 1
//n=2 -> 2
//n=3... 1,1,1  2,1  1,2 3

var memo = {};
function possibleSteps(n) {
  var possible_paths = 0;

  if(memo.hasOwnProperty(n)) {
    return memo[n];
  }

  if(n === 2) {
    return 2;
  } else if(n === 1) {
    return 1;
  } else if(n === 0) {
    return 0;
  } else if(n > 2) {
    var tmp = possibleSteps(n-3);

    if(tmp === 0) {
      possible_paths += 1;
    } else {
      possible_paths += tmp;
    }

    tmp = possibleSteps(n-2);

    if(tmp === 0) {
      possible_paths += 1;
    } else {
      possible_paths += tmp;
    }

    tmp = possibleSteps(n-1);
    if(tmp === 0) {
      possible_paths += 1;
    } else {
      possible_paths += tmp;
    }
  
    memo[n] = possible_paths;
    return possible_paths;
  }
}

console.log(possibleSteps(50));

function nthFib(n) {
  var dp = {
    1: 1,
    2: 1
  };

  function nthFibHelper(n) {
    if(n === 1) {
      return 1;
    } else if(n === 2) {
      return 1;
    } else if(dp.hasOwnProperty(n)) {
      return dp[n];  
    } else {
      var ret = nthFibHelper(n-1) + nthFibHelper(n-2);
      dp[n] = ret
      return ret
    }
  }

  return nthFibHelper(n);
}

for(var i = 3; i < 10; i++) {
  console.log(nthFib(i));
}
  

console.log(nthFib(100));

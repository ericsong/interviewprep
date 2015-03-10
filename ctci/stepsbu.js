//base cases
//n=0 -> 0
//n=1 -> 1
//n=2 -> 2
//n=3... 1,1,1  2,1  1,2 3

var memo = {};
function possibleSteps(n) {
  var dp = [1, 1, 2];

  if(n === 0) {
    return 0;
  } else if(dp[n]) {
    return dp[n];
  }

  for(var i = 3; i <= n; i++) {
    dp[i] = dp[i-3] + dp[i-2] + dp[i-1];
  }

  return dp[n]
}

console.log(possibleSteps(50));

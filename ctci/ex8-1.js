function countWays(n) {
    if (n < 0) {
        return 0;
    } else if(n == 0) {
        return 1;
    } else {
        return countWays(n-1) + countWays(n-2) + countWays(n-3);
    }
}

var dp = {};

function myCountWays(n) {
    if(dp.hasOwnProperty(n)) {
        return dp[n];
    }

    if(n === 1) {
        return 1;
    } else if(n === 2) {
        return 2;
    } else if(n === 3) {
        return 4; 
    }

    var sum = myCountWays(n-1) + myCountWays(n-2) + myCountWays(n-3);
    
    dp[n] = sum;
    return sum;
}

console.log(countWays(4));
console.log(myCountWays(4));

console.log(countWays(5));
console.log(myCountWays(5));

console.log(countWays(6));
console.log(myCountWays(6));

console.log(countWays(10));
console.log(myCountWays(10));

console.log(countWays(40));
console.log(myCountWays(40));

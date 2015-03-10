//quarters, dimes, nickels, pennies
function makeChange(n) {
  var numWays = 0;

  if(n === 0 || n === 1) {
    return 1;
  }

  if(n >= 25) {
    numWays += makeChange(n-25);
  }

  if(n >= 10) {
    numWays += makeChange(n-10);
  }

  if(n >= 5) {
    numWays += makeChange(n-5);
  }

  if(n >= 1) {
    numWays += makeChange(n-1);
  }

  return numWays;
}

console.log(makeChange(3));
console.log(makeChange(4));
console.log(makeChange(5));
console.log(makeChange(6));

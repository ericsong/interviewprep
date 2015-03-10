function permuteString(str) {
  if(str.length === 1) {
    return [str];
  }

  var permutechar = str[str.length-1],
      substr = str.substring(0, str.length-1),
      permutedSubStr = permuteString(substr),
      permutations = [];

  for(var i = 0; i < permutedSubStr.length; i++) {
    for(var j = 0; j <= permutedSubStr[i].length; j++) {
      permutations.push(permutedSubStr[i].substring(0, j) + permutechar + permutedSubStr[i].substring(j));
    }
  }

  return permutations;
}

console.log(permuteString("ab"));
console.log(permuteString("hello"));

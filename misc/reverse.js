function reverseString(str) {
    var mid = Math.floor(str.length / 2);
    
    for(var i = 0; i < mid; i++) {
        var temp = str[i];
        str[i] = str[str.length - 1 - i];
        str[str.length - 1 - i] = temp;
    }

    return str;
}

console.log(reverseString("abcdef"));
console.log(reverseString("hello"));
console.log(reverseString("eric"));

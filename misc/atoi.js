function charToNum(c) {
    if(c === '0') {
        return 0;
    } else if(c === '1') {
        return 1;
    } else if(c === '2') {
        return 2;
    } else if(c === '3') {
        return 3;
    } else if(c === '4') {
        return 4;
    } else if(c === '5') {
        return 5;
    } else if(c === '6') {
        return 6;
    } else if(c === '7') {
        return 7;
    } else if(c === '8') {
        return 8;
    } else if(c === '9') {
        return 9;
    }
}

function myParseInt(str) {
    var val = 0;

    for(var i = 0; i < str.length; i++) {
        val = val*10 + charToNum(str[i]);
    }

    return val;
}

console.log(myParseInt("100") * 5);
console.log(myParseInt("123"));
console.log(myParseInt("1"));
console.log(myParseInt("10099213123"));
console.log(myParseInt("827313"));

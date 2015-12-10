function smallNumToWord(num) {
    if(num === 0) {
        return "";
    } else if(num === 1) {
        return "one";
    } else if(num === 2) {
        return "two";
    } else if(num === 3) {
        return "three";
    } else if(num === 4) {
        return "four";
    } else if(num === 5) {
        return "five";
    } else if(num === 6) {
        return "six";
    } else if(num === 7) {
        return "seven";
    } else if(num === 8) {
        return "eight";
    } else if(num === 9) {
        return "nine";
    } else if(num === 10) {
        return "ten";
    } else if(num === 11) {
        return "eleven";
    } else if(num === 12) {
        return "twelve";
    } else if(num === 13) {
        return "thirteen";
    } else if(num === 14) {
        return "fourteen";
    } else if(num === 15) {
        return "fifteen";
    } else if(num === 16) {
        return "sixteen";
    } else if(num === 17) {
        return "seventeen";
    } else if(num === 18) {
        return "eighteen";
    } else if(num === 19) {
        return "nineteen";
    } else if(num === 20) {
        return "twenty";
    } else if(num === 30) {
        return "thirty";
    } else if(num === 40) {
        return "fourty";
    } else if(num === 50) {
        return "fifty";
    } else if(num === 60) {
        return "sixty";
    } else if(num === 70) {
        return "seventy";
    } else if(num === 80) {
        return "eighty";
    } else if(num === 90) {
        return "ninety";
    } else if(num > 20 && num < 100) {
        var onesDigit = num % 10;
        var tensDigit = Math.floor(num / 10);

        return smallNumToWord(tensDigit*10) + " " + smallNumToWord(onesDigit);
    } else if(num >= 100 && num < 1000) {
        var onesDigit = num % 10;
        var tensDigit = Math.floor(num / 10) % 10;
        var hundredsDigit = Math.floor(num / 100);

        return smallNumToWord(hundredsDigit) + " hundred " + smallNumToWord(tensDigit*10 + onesDigit);   
    }
}

var prefixes = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"]

function numToWord(num) {
    if(num === 0) {
        return "zero";
    } else if(num >= 0 && num <= 999) {
        return smallNumToWord(num);
    }

    var outputString = "";

    var prefixIndex = 0;
    while(num > 0) {
        var before = Math.floor(num / 1000);
        var lastThree = num - (before * 1000);

        outputString = smallNumToWord(lastThree) + " " + prefixes[prefixIndex] + " " + outputString;
        prefixIndex++;
        num = before;
    }

    return outputString;
}

console.log(numToWord(1123123));
console.log(numToWord(5003));
console.log(numToWord(23));

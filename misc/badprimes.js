var primeCount = 0;

for(var i = 2 ;; i++) {
    var isPrime = true;

    for(var j = 2; j < i; j++) {
        if(i % j == 0) {
            isPrime = false;
            break;
        }     
    }

    if(isPrime) {
        primeCount++;
    }

    if(primeCount == 10001) {
        console.log(i);
        break;
    }
}

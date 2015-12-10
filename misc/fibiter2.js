function fib(n) {
    if(n === 0) {
      return 0;
    } else if(n === 1) {
        return 1;
    }

    var f1 = 0;
    var f2 = 1;
    var f3;

    for(var i = 2; i <= n; i++) {
        f3 = f1 + f2;
        f1 = f2;
        f2 = f3;
    }

    return f3;
}

console.log(fib(10));

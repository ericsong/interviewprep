function nthFib(n) {
  if(n === 1) {
    return 1;
  } else if(n === 2) {
    return 1;
  } else {
    var prev = 1,
        curr = 1,
        tmp;
    for(var i = 3; i <= n; i++) {
      tmp = curr + prev;
      prev = curr;
      curr = tmp;
    }

    return tmp;
  }
}

for(var i = 3; i < 10; i++) {
  console.log(nthFib(i));
}

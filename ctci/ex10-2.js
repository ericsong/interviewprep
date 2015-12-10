function sortAnagrams(words) {
    var pairs = [];

    //sort each word and then the entire array
    for(var i = 0; i < words.length; i++) {
        pairs.push({
            word: words[i],
            sorted: words[i].split('').sort().join()
        }); 
    }

    pairs.sort(function(w1, w2) {
        return w1.sorted.localeCompare(w2.sorted);
    });

    return pairs.map(function(item) {
        return item.word
    });
}

arr = ['eric', 'hello', 'mary' , 'ramy', 'icer', 'rice'];
console.log(sortAnagrams(arr));

/*
 * runtime...
 * n words, k word length
 *
 * n * klogk + nlogn
 *
 *
 *
 */

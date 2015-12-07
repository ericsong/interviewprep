function createNode(key, val, next) {
    return {
        key: key,
        val: val,
        next: next
    }
}

var HashBucket = function() {
    this.list = null    
}

HashBucket.prototype.add = function(key, val) {
    var node = createNode(key, val, this.list);

    this.list = node; 
}

HashBucket.prototype.find = function(key) {
    var iter = this.list;

    while(iter != null) {
        if(iter.key === key) {
            return iter.val;
        }

        iter = iter.next;
    }

    return null;
}

var Hash = function(size) {
    this.table = [];
    this.size = size;

    for(var i = 0; i < size; i++) {
        this.table.push(new HashBucket());
    }
}

Hash.prototype.add = function(key, val) {
    var hashIndex = this.hash(key) % this.size;

    this.table[hashIndex].add(key, val);
}

Hash.prototype.get = function(key) {
    var hashIndex = this.hash(key) % this.size;

    return this.table[hashIndex].find(key);
}

Hash.prototype.hash = function(key) {
    var hash = 5381;

    for(var i = 0; i < key.length; i++) {
        hash = ((hash << 5) + hash) + key.charCodeAt(i);
    }

    return hash
}

var table = new Hash(10);
table.add('key1', 10);
table.add('key2', 20);
table.add('key3', 30);
table.add('key4', 40);
table.add('key5', 50);
table.add('key6', 60);
table.add('key7', 70);
table.add('key8', 80);
table.add('key9', 90);
table.add('key10', 100);
console.log(table);

console.log(table.get('key7'));
console.log(table.get('key5'));
console.log(table.get('key4'));
console.log(table.get('key3'));
console.log(table.get('key2'));
console.log(table.get('key1'));
console.log(table.get('key6'));
console.log(table.get('key8'));
console.log(table.get('key9'));
console.log(table.get('key10'));

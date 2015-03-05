var fs = require('fs');

//globals
var circuits = {},
    num_circuits = 0,
    jugglers = [],
    num_jugglers = 0,
    complete_circuits = [],
    circuit_names = [],
    jPerCircuit;

fs.readFile('real.txt', 'utf-8', function(err, data) {
  if(err) { console.log(err); }

  //load data
  var lines = data.split('\n');

  for(var i = 0; i < lines.length; i++) {
    if(lines[i][0] === 'C') {
      //add circuit
      var parts = lines[i].split(' '),
          new_circuit = {
            name: parts[1],
            jugglers: []
          },
          tmp;
    
      //add skills
      tmp = parts[2].split(':'); 
      new_circuit[tmp[0]] = tmp[1];
      tmp = parts[3].split(':'); 
      new_circuit[tmp[0]] = tmp[1];
      tmp = parts[4].split(':'); 
      new_circuit[tmp[0]] = tmp[1];

      circuits[parts[1]] = new_circuit;
      num_circuits++;
    } else if(lines[i][0] === 'J') {
      //add juggler
      var parts = lines[i].split(' '),
          new_juggler = {
            name: parts[1],
            prefs: [],
            removed_prefs: []
          },
          tmp;

      //add skills
      tmp = parts[2].split(':'); 
      new_juggler[tmp[0]] = tmp[1];
      tmp = parts[3].split(':'); 
      new_juggler[tmp[0]] = tmp[1];
      tmp = parts[4].split(':'); 
      new_juggler[tmp[0]] = tmp[1];

      //add circuit prefs
      tmp = parts[5].split(',');
      for(var j = 0; j < tmp.length; j++) {
        new_juggler.prefs.push(tmp[j]);
      }

      jugglers.push(new_juggler);
      num_jugglers++;
    }
  }

  jPerCircuit = num_jugglers/num_circuits;

  //calculate scores
  for(var i = 0; i < jugglers.length; i++) {
    for(var j = 0; j < jugglers[i].prefs.length; j++) {
      jugglers[i].prefs[j] = {
        name: jugglers[i].prefs[j],
        score: jugglers[i].H*circuits[jugglers[i].prefs[j]].H + jugglers[i].E*circuits[jugglers[i].prefs[j]].E + jugglers[i].P*circuits[jugglers[i].prefs[j]].P
      };

    }
  }

  //load circuit names into array for easier iteration
  for(var property in circuits) {
    if(circuits.hasOwnProperty(property)) {
      circuit_names.push(circuits[property].name); 
    }
  }
  var iter = 0;

  while(complete_circuits.length !== num_circuits) {
    var current_circuit = circuits[circuit_names[iter]],
        remaining_spots = jPerCircuit - current_circuit.jugglers.length;

    //sort jugglers according to current circuit
    jugglers.sort(function(a,b) {
      var a_score, b_score;
      for(var j = 0; j < a.prefs.length; j++) {
        if(a.prefs[j].name === current_circuit.name) {
          a_score = a.prefs[j].score;
        }
      }

      for(var j = 0; j < b.prefs.length; j++) {
        if(b.prefs[j].name === current_circuit.name) {
          b_score = b.prefs[j].score;
        }
      }

      if(a_score < b_score) {
        return 1;
      } else if(a_score > b_score) {
        return -1;
      } else {
        return 0;
      }
    });

    //add jugglers that are in top #jPerCircuit and first picked current circuit
    for(var i = 0; i < jugglers.length && remaining_spots > 0; i++) {
      if(jugglers[i].prefs[0].name === current_circuit.name) {
        current_circuit.jugglers.push(jugglers[i]);
        jugglers.splice(i,1);
        i--;
        remaining_spots--;
        console.log("juggler added. remaining: " + jugglers.length);
      }
    }

    //move 'complete' circuits
    for(var property in circuits) {
      if(circuits.hasOwnProperty(property)) {
        if(circuits[property].jugglers.length === jPerCircuit) {
          //circuit is complete
          complete_circuits.push(circuits[property]);
          delete circuits[property];
          circuit_names.splice(iter, 1);
        }
      }
    }

    //remove circuit prefs from remaining jugglers
    for(var i = 0; i < complete_circuits.length; i++) {
      var rname = complete_circuits[i].name; //remove circiuit's name
      for(var j = 0; j < jugglers.length; j++) {
        for(var x = 0; x < jugglers[j].prefs.length; x++) {
          if(jugglers[j].prefs[x].name === rname) {
            jugglers[j].removed_prefs.push(jugglers[j].prefs[x]);
            jugglers[j].prefs.splice(x,1);
          }
        }
      }
      console.log("circuit complete. uncomplete remaining: " + (num_circuits - complete_circuits.length));
    }

    iter = (iter+1) % circuit_names.length; 
  }

  //print solution
  for(var i = 0; i < complete_circuits.length; i++) {
    var print_string = "";
    print_string += complete_circuits[i].name + " ";

    //add jugglers
    for(var j = 0; j < complete_circuits[i].jugglers.length; j++) {
      print_string += complete_circuits[i].jugglers[j].name + " ";
      for(var x = 0; x < complete_circuits[i].jugglers[j].removed_prefs.length; x++) {
        print_string += complete_circuits[i].jugglers[j].removed_prefs[x].name + ":" + complete_circuits[i].jugglers[j].removed_prefs[x].score + " "; 
      }

      for(var x = 0; x < complete_circuits[i].jugglers[j].prefs.length; x++) {
        print_string += complete_circuits[i].jugglers[j].prefs[x].name + ":" + complete_circuits[i].jugglers[j].prefs[x].score + " "; 
      }

      print_string = print_string.substring(0, print_string.length-1);
      print_string += ", ";
    }
    
    print_string = print_string.substring(0, print_string.length-2);
    console.log(print_string);
  }
});



var fs = require('fs');

//globals
var circuits = {},
    num_circuits = 0,
    jugglers = [],
    num_jugglers = 0,
    bad_jugglers = [],
    circuit_names = [],
    jPerCircuit,
    circuitsFilled;

fs.readFile('test.txt', 'utf-8', function(err, data) {
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

  //add each juggler to their first pick circuit
  for(var i = 0; i < jugglers.length; i++) {
    circuits[jugglers[i].prefs[0].name].jugglers.push(jugglers[i]);
  }

  //sort jugglers in each circuit
  for(var property in circuits) {
    if(circuits.hasOwnProperty(property)) {
      circuits[property].jugglers.sort(function(a,b) {
        var a_score = a.prefs[0].score, 
            b_score = b.prefs[0].score;

        if(a_score < b_score) {
          return 1;
        } else if(a_score > b_score) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }

  //loop through circuits and move jugglers that are ranked below the cutoff
  while(!circuitsFilled(circuits, jPerCircuit)) {
    var current_circuit = circuits[circuit_names[iter]];
    
    for (var i = 0; current_circuit.jugglers.length > jPerCircuit; i++) {
      var movedJuggler = current_circuit.jugglers[i];

      //remove first pick pref into removedprefs
      movedJuggler.removed_prefs.push(movedJuggler.prefs.shift());

      if(movedJuggler.prefs.length === 0) {
        bad_jugglers.push(movedJuggler);
      } else {
        //move juggler to his next pick choice (at the correct position)
        circuits[movedJuggler.prefs[0].name].jugglers.push(movedJuggler);

        circuits[movedJuggler.prefs[0].name].jugglers.sort(function(a,b) {
          var a_score = a.prefs[0].score, 
              b_score = b.prefs[0].score;

          if(a_score < b_score) {
            return 1;
          } else if(a_score > b_score) {
            return -1;
          } else {
            return 0;
          }
        });
      }

      current_circuit.jugglers.splice(i, 1);
      i--;
    }
  
    iter = (iter+1) % circuit_names.length; 
  }

  //fill in empty spots with bad jugglers
  for(var prop in circuits) {
    if(circuits.hasOwnProperty(prop)) {
      while(circuits[prop].jugglers.length < jPerCircuit) {
        circuits[prop].jugglers.push(bad_jugglers.pop());
      }
    }
  }

  //print solution
  for(var prop in circuits) {
    if(circuits.hasOwnProperty(prop)) {
      var print_string = "";
      print_string += circuits[prop].name + " ";

      //add jugglers
      for(var j = 0; j < circuits[prop].jugglers.length; j++) {
        print_string += circuits[prop].jugglers[j].name + " ";
        for(var x = 0; x < circuits[prop].jugglers[j].removed_prefs.length; x++) {
          print_string += circuits[prop].jugglers[j].removed_prefs[x].name + ":" + circuits[prop].jugglers[j].removed_prefs[x].score + " "; 
        }

        for(var x = 0; x < circuits[prop].jugglers[j].prefs.length; x++) {
          print_string += circuits[prop].jugglers[j].prefs[x].name + ":" + circuits[prop].jugglers[j].prefs[x].score + " "; 
        }

        print_string = print_string.substring(0, print_string.length-1);
        print_string += ", ";
      }
      
      print_string = print_string.substring(0, print_string.length-2);
      console.log(print_string);
    }
  }
});

circuitsFilled = function(cs, jpercs) {
  for(var prop in cs) {
    if(cs.hasOwnProperty(prop)) {
      if(cs[prop].jugglers.length > jpercs) {
        return false;
      }
    }
  }

  return true;
}

///////////////////////////////////////////////////////////////////
/////////////// Dislocation network generation script /////////////
///////////////////////////////////////////////////////////////////

var request = require('request')
var fs = require('fs')
var weightedRandom = require('weighted-random');
var math = require('mathjs');
var figlet = require('figlet');
var	query = require('cli-interact').getYesNo;
const args = require('yargs').argv;

console.log('')
console.log(figlet.textSync('Dislocation', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));
console.log(figlet.textSync('Network', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));
console.log(figlet.textSync('Generation', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));


console.log('')

var exp = Math.pow(10, 16)
var dislocation_density = math.format(args.dd*exp)
var count = 1

console.log('--------------------------------------------------')
console.log('User Defined Variables')
console.log('--------------------------------------------------')
console.log('Systems to Generate: ' + args.systems)
console.log('Target Dislocation Density: ' + dislocation_density + ' dislocations/m2')
console.log('--------------------------------------------------')

var options = {
  "general": {
    "material": "SS-316L",
    "system": "FCC",
    "potential":"Fe-Ni-Cr_fcc.eam.fs",
    "slip": 12,
    "lattice":  3.5483740688875,
    "size_x": 60,
    "size_y": 60,
    "size_z": 80,
    "atoms": 2720087,
  },
  "type": {
    "edge": 100,
    "screw": 0,
  },
  "burger": {
    "edge_burger": 2.509079,
    "screw_burger": 2.509079,
  },
  "misc": {
    "poisson": 0.275, // SS-316L
    "dimensional_scaling_factor": 1.5,
  },
  "slip_systems": [
    {
    "plane":"(111)",
    "direction":"[-101] [111] [-12-1]",
    "direction_aligned":"[-12-1] [-101] [111]",
    "weight":1,
    },
    {
    "plane":"(111)",
    "direction":"[-110] [111] [11-2]",
    "direction_aligned":"[111] [11-2] [-110]",
    "weight":1,
    },
    {
    "plane":"(111)",
    "direction":"[0-11] [111] [-211]",
    "direction_aligned":"[111] [-211] [0-11]",
    "weight":1,
    },
    {
    "plane":"(-111)",
    "direction":"[101] [-111] [-1-21]",
    "direction_aligned":"[-1-21] [101] [-111]",
    "weight":1,
    },
    {
    "plane":"(-111)",
    "direction":"[110] [-111] [-11-2]",
    "direction_aligned":"[-11-2] [110] [-111]",
    "weight":1,
    },
    {
    "plane":"(-111)", //
    "direction":"[0-11] [-111] [-2-1-1]",
    "direction_aligned":" [-2-1-1] [0-11] [-111]",
    "weight":1,
    },
    {
    "plane":"(-1-11)",
    "direction":"[011] [-1-11] [-21-1]",
    "direction_aligned":"[-21-1] [011] [-1-11]",
    "weight":1,
    },
    {
    "plane":"(-1-11)",
    "direction":"[-110] [-1-11] [-1-1-2]",
    "direction_aligned":"[-1-1-2] [-110] [-1-11]",
    "weight":1,
    },
    {
    "plane":"(-1-11)",
    "direction":"[101] [-1-11] [-121]",
    "direction_aligned":"[-121] [101] [-1-11]" ,
    "weight":1,
    },
    {
    "plane":"(1-11)", //
    "direction":"[-101] [1-11] [121]",
    "direction_aligned":"[121] [-101] [1-11]",
    "weight":1,
    },
    {
    "plane":"(1-11)",
    "direction":"[011] [1-11] [21-1]",
    "direction_aligned":"[21-1] [011] [1-11]",
    "weight":1,
    },
    {
    "plane":"(1-11)",
    "direction":"[110] [1-11] [-112]",
    "direction_aligned":"[-112] [110] [1-11]",
    "weight":1,
    }
  ],
  "positions": {
      "0.801": 7.5,
      "0.751": 7.5,
      "0.701": 10,
      "0.651": 15,
      "0.601": 20,
      "0.551": 23,
      "0.501": 25,
      "0.451": 23,
      "0.401": 20,
      "0.351": 15,
      "0.301": 10,
      "0.251": 7.5,
      "0.201": 7.5,
  },
}

console.log('')
console.log('')
console.log('--------------------------------------------------')
console.log('Pre-Set Variables')
console.log('--------------------------------------------------')
console.log('Material: ' + options.general.material)
console.log('System: ' + options.general.system)
console.log('Poisson Ratio: ' + options.misc.poisson)
console.log('Potential: ' + options.general.potential)
console.log('Slip Planes: ' + options.general.slip)
console.log('Lattice Parameter: ' + options.general.lattice + ' A')
console.log('Simulation Box: ' + options.general.size_x + 'a0 x ' + options.general.size_y + 'a0 x ' + options.general.size_z + 'a0 x')
console.log('Total Atoms: ' + options.general.atoms)
console.log('2-D to 3-D Scaling Factor: ' + options.misc.dimensional_scaling_factor)
console.log('--------------------------------------------------')
console.log('Edge Probability: ' + options.type.edge + '%')
console.log('Screw Probability: ' + options.type.screw + '%')
console.log('Burgers Vector: ' + options.burger.edge_burger)
console.log('--------------------------------------------------')
console.log('')


console.log('')
console.log('--------------------------------------------------')
console.log('FCC Slip Direction Rotation Vectors')
console.log('--------------------------------------------------')
console.log('0: ' + options.slip_systems[0].direction)
console.log('1: ' + options.slip_systems[1].direction)
console.log('2: ' + options.slip_systems[2].direction)
console.log('3: ' + options.slip_systems[3].direction)
console.log('4: ' + options.slip_systems[4].direction)
console.log('5: ' + options.slip_systems[5].direction)
console.log('6: ' + options.slip_systems[6].direction)
console.log('7: ' + options.slip_systems[7].direction)
console.log('8: ' + options.slip_systems[8].direction)
console.log('9: ' + options.slip_systems[9].direction)
console.log('10: ' + options.slip_systems[10].direction)
console.log('11: ' + options.slip_systems[11].direction)



// Compute number of dislocations to insert to match target dislocation density
// Approximate dislocation density from starting conditions by multiplying by 2. IFFT counts partial dislocations as two.


var nm2 = (options.general.size_x*options.general.lattice/10)*(options.general.size_y*options.general.lattice/10)
var nm3 =  nm2*(options.general.size_z*options.general.lattice/10)
var m2 = nm2*(1e-18)
var m3 = nm3*(1e-27)
var d_2D = dislocation_density * m2
var d_3D = parseInt((d_2D * options.misc.dimensional_scaling_factor).toFixed(0))
var command_array = []
var padding_array = []

console.log('')
console.log('--------------------------------------------------')
console.log('Calculated Fields')
console.log('--------------------------------------------------')
console.log('Simulation Area: ' + math.format(m2) + ' m2 (' + nm2.toFixed(4) + ' nm2)')
console.log('Simulation Volume: ' + math.format(m3) + ' m3 (' + nm3.toFixed(4) + ' nm3)')
console.log('Disocations to Generate (2-D): ' + d_2D.toFixed(0))
console.log('Dislocations to Generate (3-D): ' + d_3D)
console.log('--------------------------------------------------')
console.log('')

var answer = query('Initialization Complete. Proceed?');


randomize_dislocations(d_3D, count);

function randomize_dislocations(dislocations_to_insert,count) {

  console.log('')
  console.log('')
  console.log('')
  console.log('')
  console.log(figlet.textSync('Network  ' + count, {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default'
  }));

  // Randomly select edge or screw type dislocations based on assigned Weights
  var selected_type_array = []
  var types = Object.keys(options.type)
  var type_weights = Object.values(options.type)
  for (t = 0; t < dislocations_to_insert; t++) {
    var selectionIndex0 = (weightedRandom(type_weights));
    var selected_type = types[selectionIndex0];
    var selected_type_weight = type_weights[selectionIndex0];
    selected_type_array.push(selected_type)
  }
  console.log('')
  console.log('')
  console.log('--------------------------------------------------')
  console.log('Weighted Random Number Generation')
  console.log('--------------------------------------------------')
  console.log('Selected Dislocation Types')
  console.log(selected_type_array)
  console.log('--------------------------------------------------')

  // Randomly select 2 (x and y) position box positions for each dislocation based on assigned weights
  var selected_position_array = []
  var positions = Object.keys(options.positions)
  var position_weights = Object.values(options.positions)
  for (i = 0; i < dislocations_to_insert*2; i++) {
    var selectionIndex1 = (weightedRandom(position_weights));
    var selected_position = positions[selectionIndex1];
    var selected_position_weight = position_weights[selectionIndex1];
    selected_position_array.push(selected_position)
  }
  console.log('Selected Simulation Positions')
  console.log(selected_position_array)
  console.log('--------------------------------------------------')

  // Build direction and weight arrays from options data object
  var slip_directions = []
  var slip_direction_weights = []
  for (j = 0; j < options.slip_systems.length; j++) {
    var directions = options.slip_systems[j].direction
    slip_directions.push(directions)
    var direction_weights = options.slip_systems[j].weight
    slip_direction_weights.push(direction_weights)
  }

  // Randomly select a set of orthogonal slip system directions to rotate the crystal for dislocation insertion
  var selected_direction_array = []
  for (k = 0; k < dislocations_to_insert; k++) {
    var selectionIndex2 = (weightedRandom(slip_direction_weights));
    var selected_direction = slip_directions[selectionIndex2];
    var selected_direction_weight = slip_direction_weights[selectionIndex2];
    selected_direction_array.push(selected_direction)
  }
  console.log('Selected Slip Directions')
  console.log(selected_direction_array)
  console.log('--------------------------------------------------')
  console.log('')
  console.log('')


  // Assemble Atomsk commands
  var dislocation_insert_array = []
  var orientation_array = []
  for (a = 1; a < dislocations_to_insert; a++) {
    var pos = a + dislocations_to_insert
    var new_line = " \\";

    if (a == 1) {

      if (selected_type_array[a] == 'edge') {
        var read = 'read initial.cfg'
        var orient = 'orient [110] [-111] [1-12] ' + selected_direction_array[a]
      }

      if (selected_type_array[a] == 'screw') {
        let screw_directions = options.slip_systems.find(o => o.direction == selected_direction_array[a])
        var orient = 'orient [110] [-111] [1-12] ' + screw_directions.direction_aligned
      }

      if (selected_type_array[a] == 'edge') {
      var insert_dislocation = 'dislocation ' + selected_position_array[a] + '*box ' + selected_position_array[pos] + '*box ' + selected_type_array[a] + ' Z Y ' + options.burger.edge_burger + ' ' + options.misc.poisson
      }

      if (selected_type_array[a] == 'screw') {
      var insert_dislocation = 'dislocation ' + selected_position_array[a] + '*box ' + selected_position_array[pos] + '*box ' + selected_type_array[a] + ' Z Y ' + options.burger.edge_burger
      }

      command_array.push(read)
      command_array.push(orient)
      command_array.push(insert_dislocation)

    } else if (a > 0 && a < (dislocations_to_insert-1)) {

      var previous_orient = a - 1
      if (selected_type_array[a] == 'edge') {
        var orient = 'orient ' + selected_direction_array[previous_orient] + ' ' + selected_direction_array[a]
      }

      if (selected_type_array[a] == 'screw') {
        let screw_directions = options.slip_systems.find(o => o.direction == selected_direction_array[a])
        var orient = 'orient ' + selected_direction_array[previous_orient] + ' ' + screw_directions.direction_aligned
      }

      if (selected_type_array[a] == 'edge') {
      var insert_dislocation = 'dislocation ' + selected_position_array[a] + '*box ' + selected_position_array[pos] + '*box ' + selected_type_array[a] + ' Z Y ' + options.burger.edge_burger + ' ' + options.misc.poisson
      }

      if (selected_type_array[a] == 'screw') {
      var insert_dislocation = 'dislocation ' + selected_position_array[a] + '*box ' + selected_position_array[pos] + '*box ' + selected_type_array[a] + ' Z Y ' + options.burger.edge_burger
      }

      command_array.push(orient)
      command_array.push(insert_dislocation)

    } else {

      var previous_orient = a - 1
      if (selected_type_array[a] == 'edge') {
        var orient = 'orient ' + selected_direction_array[previous_orient] + ' ' + selected_direction_array[a]
      }

      if (selected_type_array[a] == 'screw') {
        let screw_directions = options.slip_systems.find(o => o.direction == selected_direction_array[a])
        var orient = 'orient ' + selected_direction_array[previous_orient] + ' ' + screw_directions.direction_aligned
      }

      if (selected_type_array[a] == 'edge') {
      var insert_dislocation = 'dislocation ' + selected_position_array[a] + '*box ' + selected_position_array[pos] + '*box ' + selected_type_array[a] + ' Z Y ' + options.burger.edge_burger + ' ' + options.misc.poisson
      }

      if (selected_type_array[a] == 'screw') {
      var insert_dislocation = 'dislocation ' + selected_position_array[a] + '*box ' + selected_position_array[pos] + '*box ' + selected_type_array[a] + ' Z Y ' + options.burger.edge_burger
      }

      if (selected_type_array[a] == 'edge') {
      var reorient = 'orient ' + selected_direction_array[a] + ' [110] [-111] [1-12]'
      var write = 'write system' + count + '.cfg'
      var merge = 'atomsk --merge 2 padding.cfg system' + count + '.cfg combined_system' + count + '.cfg'
      }

      if (selected_type_array[a] == 'screw') {
      let screw_directions = options.slip_systems.find(o => o.direction == selected_direction_array[a])
      var reorient = 'orient ' + screw_directions.direction_aligned + ' [110] [-111] [1-12]'
      var write = 'write system' + count + '.cfg'
      var merge = 'atomsk --merge 2 padding.cfg system' + count + '.cfg combined_system' + count + '.cfg'
      }

      command_array.push(orient)
      command_array.push(insert_dislocation)
      command_array.push(reorient)
      command_array.push(write)
      padding_array.push(merge)
    }

  }
  console.log('--------------------------------------------------')
  console.log('Atomsk Dislocation Generation Command Array')
  console.log('--------------------------------------------------')
  console.log(command_array)

  console.log('')
  console.log('')
  console.log('--------------------------------------------------')
  console.log('Write Atomsk Input Files to Working Directory')
  console.log('--------------------------------------------------')

  if (count == args.systems) {

    // Write randomly generated commands to txt files for production in Atomsk
    require("fs").writeFile('./Run1/' + count + '_System_Command_Script.txt', command_array.map(function(v){ return v }).join('\n'),
         function (err) {
           console.log(err ? 'Error :'+err : 'Dislocation network generation command script was saved.')
    });

    require("fs").writeFile('./Run1/' + count + '_System_Padding_Command_File.txt', padding_array.map(function(v){ return v }).join('\n'),
         function (err) {
           console.log(err ? 'Error :'+err : 'Lattice padding command file was saved.')
    });
  }

  if (count < args.systems) {
    count = count + 1
    randomize_dislocations(d_3D, count);
  }

}

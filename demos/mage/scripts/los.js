


var los = {
  isVisible: function (startcoord, endcoord) {
 
      var start = startcoord,
      end = endcoord,
        // Step directions
        stepX = this.getDirection(start.x, end.x),
        stepY = this.getDirection(start.y, end.y),
        
        // Boundary for largest movement point
        deltaX = Math.abs(end.x - start.x), 
        deltaY = Math.abs(end.y - start.y),
        // deltaZ = Math.abs(end.z - start.z),
        
        // How many squares to advance in an increment (prevents reading corners)
        err = deltaX - deltaY;
        
    var x = start.x, y = start.y, valid = true, errCalc;
    for (var i = 0; i < tileEngine.tilemap.width*2; i++) {
      // Check for invalid tile
      if (!this.isWalkable(x, y)) { return false; } // no vision 
      
      // Check for destination
      if (x === end.x && y === end.y) { return true; } // valid los 
      
      // Check error and increment x
      errCalc = 2 * err;
      if (errCalc > deltaY * -1) {
        err -= deltaY;
        x += stepX;
      }
      
      // Check for destination
      if (x === end.x && y === end.y) {  return true; } // valid los 
      
      // Inrement y
      if (errCalc < deltaX) {
        err += deltaX;
        y += stepY;
      }
    }
  },

  // Get the direction between two points
  getDirection: function (a, b) {
    if (a < b) {
      return 1;
    } else {
      return -1;
    }
  },

  isWalkable: function (x, y) {
    return tileEngine.checkVision(x, y);
  }
};


/*



/*
Author: Ash Blue
Site: blueashes.com

Implementing Z-Axis support
- Tile map will need to indicate vision with a separate array or non-numeric value (ex 'v')
*/
/*
var $BTN_SIGHT = $('#btn-check-sight');

var _event = {
  isVisible: function () {
    var start = rC.getStart(),
        end = rC.getEnd(),
        
        // Step directions
        stepX = rC.getDirection(start.x, end.x),
        stepY = rC.getDirection(start.y, end.y),
        
        // Boundary for largest movement point
        deltaX = Math.abs(end.x - start.x), 
        deltaY = Math.abs(end.y - start.y),
        // deltaZ = Math.abs(end.z - start.z),
        
        // How many squares to advance in an increment (prevents reading corners)
        err = deltaX - deltaY;
        
    var x = start.x, y = start.y, valid = true, errCalc;
    for (var i = 0; i < 20; i++) {
      // Check for invalid tile
      if (rC.isBlocked(x, y)) { rC.setResult('Sight is blocked at ' + (x + 1) + ' ' + (y + 1)); break; }
      
      // Check for destination
      if (x === end.x && y === end.y) { rC.setResult('Valid line-of-sight'); break; }
      
      // Check error and increment x
      errCalc = 2 * err;
      if (errCalc > deltaY * -1) {
        err -= deltaY;
        x += stepX;
      }
      
      // Check for destination
      if (x === end.x && y === end.y) { rC.setResult('Valid line-of-sight'); break; }
      
      // Inrement y
      if (errCalc < deltaX) {
        err += deltaX;
        y += stepY;
      }
    }
  }
};

// Ray Casting API
var rC = {
  open: [],
  
  init: function () {
    this.bind();
  },
  
  bind: function () {
    $BTN_SIGHT.click(_event.isVisible);
  },
  
  getStart: function () {
    return {
      x: parseInt($('#start-x').val() - 1, 10),
      y: parseInt($('#start-y').val() - 1, 10)
    };
  },
  
  getEnd: function () {
    return {
      x: parseInt($('#end-x').val() - 1, 10),
      y: parseInt($('#end-y').val() - 1, 10)
    };
  },
  
  // Get the direction between two points
  getDirection: function (a, b) {
    if (a < b) {
      return 1;
    } else {
      return -1;
    }
  },
  
  setResult: function (message) {
    $('#result').html(message);
  },
  
  isBlocked: function (x, y) {
    return map[y][x] === 0;
  }
};

rC.init();

// Output map
var $MAP = $('#map');
var map = [
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 0, 0, 1, 1, 1, 1, 1 ],
  [ 1, 1, 0, 0, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
];

map.forEach(function (e) {
  $MAP.append(e.join(', ') + '<br/>');
});*/
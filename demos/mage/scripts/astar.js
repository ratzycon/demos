
var map = {
    data: null,

        setData: function (map) {
            this.data = map;
            return this;
        },

        getWidthInTiles: function () {
            return this.data[0].length;
        },

        getHeightInTiles: function () {
            return this.data.length;
        },

        blocked: function (x, y) {
            if (_private.outOfBounds(x, y)) {
                return true;
            }

            if (this.data[y][x] === 0) {
                return true;
            }

            return false;
        },

        getNeighbors: function (x, y) {
            var neighbors = [];

            // Check left, right, top, bottom
            if (!this.blocked(x + 1, y)) neighbors.push(new jp.Tile(x + 1, y));
            if (!this.blocked(x - 1, y)) neighbors.push(new jp.Tile(x - 1, y));
            if (!this.blocked(x, y + 1)) neighbors.push(new jp.Tile(x, y + 1));
            if (!this.blocked(x, y - 1)) neighbors.push(new jp.Tile(x, y - 1));

            return neighbors;
        },

        // Only works when moving to adjacent levels
        getCost: function (xC, yC, xT, yT) {
            return this.data[yT][xT];
        }
};


var pathfinder = {

    map: null,
    setMap: function(map){this.map = map;},

    closed: [],

    // Available steps that can be taken
    open: [],

    // Step count
    step: 0,

    // Maximum number of steps that can be taken before shutting down a closed path
    maxSearchDistance: 10,

    addOpen: function (step) {
        this.open.push(step);
        return this;
    },

    // Remove a step that already exists by object memory address (not actual x and y values)
    removeOpen: function (step) {
        for (var i = 0; i < this.open.length; i++) {
            if (this.open[i] === step) this.open.splice(i, 1);
        }
        return this;
    },

    // Check if the step is already in the open set
    inOpen: function (step) {
        for (var i = 0; i < this.open.length; i++) {
            if (this.open[i].x === step.x && this.open[i].y === step.y)
                return this.open[i];
        }

        return false;
    },

    // Get the lowest costing tile in the open set
    getBestOpen: function () {
        var bestI = 0;
        for (var i = 0; i < this.open.length; i++) {
            if (this.open[i].f < this.open[bestI].f) bestI = i;
        }

        return this.open[bestI];
    },

    addClosed: function (step) {
        this.closed.push(step);
        return this;
    },

    // Check if the step is already in the closed set
    inClosed: function (step) {
        for (var i = 0; i < this.closed.length; i++) {
            if (this.closed[i].x === step.x && this.closed[i].y === step.y)
                return this.closed[i];
        }

        return false;
    },

    findPath : function(xC, yC, xT, yT) {
        var current, // Current best open tile
            neighbors, // Dump of all nearby neighbor tiles
            neighborRecord, // Any pre-existing records of a neighbor
            stepCost, // Dump of a total step score for a neighbor
            i;

        // You must add the starting step
        this.reset()
            .addOpen(new pathstep(xC, yC, xT, yT, this.step, false));

        while (this.open.length !== 0) {
            current = this.getBestOpen();

            // Check if goal has been discovered to build a path
            if (current.x === xT && current.y === yT) {
                return this.buildPath(current, []);
            }

            // Move current into closed set
            this.removeOpen(current)
                .addClosed(current);

            // Get neighbors from the map and check them
            neighbors = this.map.getNeighbors(current.x, current.y);
            for (i = 0; i < neighbors.length; i++) {
                // Get current step and distance from current to neighbor
                stepCost = current.g + this.map.getCost(current.x, current.y, neighbors[i].x, neighbors[i].y);

                // Check for the neighbor in the closed set
                // then see if its cost is >= the stepCost, if so skip current neighbor
                neighborRecord = this.inClosed(neighbors[i]);
                if (neighborRecord && stepCost >= neighborRecord.g)
                    continue;

                // Verify neighbor doesn't exist or new score for it is better
                neighborRecord = this.inOpen(neighbors[i]);
                if (!neighborRecord || stepCost < neighborRecord.g) {
                    if (!neighborRecord) {
                        this.addOpen(new pathstep(neighbors[i].x, neighbors[i].y, xT, yT, stepCost, current));
                    } else {
                        neighborRecord.parent = current;
                        neighborRecord.g = stepCost;
                        neighborRecord.f = stepCost + neighborRecord.h;
                    }
                }
            }
        }

        return false;
    },

    // Recursive path buliding method
    buildPath: function (tile, stack) {
        stack.push(tile);

        if (tile.parent) {
            return this.buildPath(tile.parent, stack);
        } else {
            return stack;
        }
    },

    reset: function () {
        this.closed = [];
        this.open = [];
        return this;
    },

    // Euclidean distance, C = current, T = target
    distanceE: function (xC, yC, xT, yT) {
        var dx = xT - xC, dy = yT - yC;
        return Math.sqrt((dx * dx) + (dy * dy));
    },

    // Manhattan distance (use this one)
    distanceM: function (xC, yC, xT, yT) {
        var dx = Math.abs(xT - xC), dy = Math.abs(yT - yC);
        return dx + dy;
    },
    
    stepfunc = function(xC, yC, xT, yT, totalSteps, parentStep) {
        // herustic
        var h = distanceM(xC, yC, xT, yT);

        this.x = xC;
        this.y = yC;
        this.g = totalSteps;
        this.h = h;
        this.f = totalSteps + h;
        this.parent = parentStep;
    }
};
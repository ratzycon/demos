// Assorted math utilities

var mathx = {


	pow2: function(v) {
		return v*v;
	},

	 lerp: function(a,b,t) {
		return a+(b-a)*t;
	},

	clamp: function(v,a,b) {
		return Math.max(a,Math.min(v,b));
	},

	randomInt: function(v) {
		return Math.floor(Math.random()*v);
	},

	 randomIntRange: function(a,b) {
		return Math.floor(Math.random()*(b-a)+a);
	},

	 randomFloat: function(v) {
		return Math.random()*v;
	},

	 randomFloatRange: function(a,b) {
		return Math.random()*(b-a)+a;
	},

	 randomColor: function(min, max) {
		return MakeColor(RandomIntRange(min, max), RandomIntRange(min, max), RandomIntRange(min, max));
	}

}
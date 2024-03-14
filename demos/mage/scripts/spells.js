
var item = {
	name:"",
	desc:"",
	details:"",
	icon:"",
	image:""
};

var castType = {
	"aoe",
	"direct",
	"enchant",
	"summon"
};


var spells = {
	
	"Mystic Missile" : 
	{
		castType:"direct",
		targets:1,
		damageBase:1,
		range:5,
		cast: function(level){

			var levels = {
				1: function(){},
				2: function(){},
				3: function(){},
				4: function(){}
			};
		}

	}
	
};

//beginselect
//checkendselect
//endselect

function selectTargets(numTargets, targetFlags, callback){

	var targets = [];
	for(var i;i<entities.length;i++)
		if(intersect(targetFlags, entities[i].targetFlags))
			targets.push(entities[i]);
		
	// highlight targets
	// flip through targets
	// select / deselect targets
	// submit selects
	// start selct chain with n targets
	
}

function beginSelect(targetlist, num){

}

function select(){

}

function deselect(){
	
}

var targets = [];
function checkSelectComplete(num, callback){
	if(targets.length == num)
	{
		callback(targets);
	}
}

function intersect(array1, array2){
	var found = false;
	for (var i = 0; i < array2.length; i++) {
	    if (array1.indexOf(array2[i]) > -1) {
	        found = true;
	        break;
	    }
	}
	return found;
}

var effects = {

	bleed: function(){},
	stun: function(){},
	wound: function(){},
	slay: function(){},
	ignite: function(){},
	drain: function(){},
	spelldamage: function(){},
	poison: function(){},
	bind: function(){},
	freeze: function(){},
	shatter: function(){},
	immobilize: function(){},
	enchant: function(){},
	portal: function(){},
	teleport: function(){},
	heal: function(){},
	damage: function(){},
	recall: function(){},
	stealth: function(){},
	projectile: function(){},
	summon: function(){},
	steal: function(){},
	critical: function(){},
	trap: function(){}

};

var weapons = {

	dagger:
	{
		attacks:["stab", "throw"],
		damage: 1,
		range: 1,
		apcost:1,
		itemid:0,

	},
};



var spellbook = {
	numspells:
	{
		1:3,
		2:0,
		3:0,
		4:0,
		5:0,
		6:0,
		7:0
	},
	bonusspells:
	{
		1:0,
		2:0,
		3:0,
		4:0,
		5:0,
		6:0,
		7:0
	},
	spells:
	[
		["spellstrike", "haste"], //lvl 1
		[], //lvl 2
		[], //lvl 3
		[], //lvl 4
		[], //lvl 5
		[], //lvl 6
		[]  //lvl 7
	],
	memorized:
	[
		["spellstrike", "spellstrike", "haste"], //lvl 1
		[], //lvl 2
		[], //lvl 3
		[], //lvl 4
		[], //lvl 5
		[], //lvl 6
		[]  //lvl 7
	]
};

function cast(caster, spellname){
	if(caster.spellbook.spells.indexOf(spellname)>-1 && 
		caster.spellbook.memorized.indexOf(spellname)>-1)
	{
		spells[spellname](caster);
	}
	else return false;
}
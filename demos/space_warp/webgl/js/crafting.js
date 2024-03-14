
var items = {

	"empty_vial":
	{
		name:"Empty Vial",
		desc:"An empty vial.",
		icon:"empty_vial.png",
		type:"ingredient",
		flags:["breakable"],
		stackmax:5,
		value:10,
		breakdown:[
			{item:"glass_splinters", amountmin:1, amountmax:2, chance:0.5}
		]
	},

	"mana_potion":
	{
		name:"Mana Potion",
		desc:"Restores 30 mana points.",
		icon:"blue_vial.png",
		type:"potion",
		flags:["consumable", "breakable"],
		stackmax:0,
		value:50,
		breakdown:[{"empty_vial", amount:1, chance:1}]
	},

	"slimy_goo":
	{
		name:"Slimy Goo",
		desc:"Bluish goo from a monster.",
		icon:"slimy_goo.png",
		type:"ingredient",
		stackmax:10,
		value:1
	},

	"glass_splinters":
	{
		name:"Glass Splinters",
		desc:"Sharp..ouch!",
		icon:"glass_splinters.png",
		type:"ingredient",
		stackmax:10,
		value:0
	}
};

var recipies = {
	0:{
		input1:"empty_vial",
		input2:"slimy_goo",
		output:"mana_potion",
		amount:1,
		skill:"alchemy",
		difficulty:2
	}
};

var inventory = {
	slots:9,
	content:{
		0:{item:"glass_splinters", amount:3},
		1:{item:"slimy_goo", amount:5},
		2:null,
		3:null,
		4:null,
		5:null,
		6:null,
		7:null,
		8:null
	}
};

var craftingInterface = {
	input1:null,
	input2:null,
	setInput:function(item, inputslot){},
	update:function(){
		if(input1 && input2){
			// if recipe exists set crafting button active

			// show result preview if recipe is known else show "?"
		} else {
			// filter recipe list for recipies containing input item
		}
	},
	craft:function(){
		// if recipe was unknown, learn recipe
		// update inventory
		// update crafting ui
	},
	clear:function(){
		input1 = null;
		input2 = null;
		update();
	},
	getResult:function(){
		for(var i=0;i<recipies.length;i++){
			var r = recipies[i];
			if(r.input1 == input1 && r.input2 == input2)
				return r.output;
		}
	}
}

function setCraftingComponent(input, item){

}



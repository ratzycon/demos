

/*

orbits
	
	    close orbits 	far orbits

	o 		)))			    )))

signature types

	star, planet, cluster, nebula, supernova, supernova remnant, planetary nebula, moon
	neutron star, black hole, wormhole, comet, ice field, astroid field, colony, installation
	starfold, command center, probe, debris, monolith, drone, spacecraft, jump signature, 
	anormally, relic, habitat, 


*/




var spaceobject = {

	orbits:{}
};

// 
function generateStar(){

	/* 
																												giant stars 			white dwarfs 			supergiant stars
					main sequence stars 																		low mass stars near    dying remnant of  		high mass stats near 
																											 the end of thier life 	   and imploded star        the end of thier life
	spectral types			O 			B 			A 			F 			G 			K  			M 				F,G,K, M 				D 						O,B,A,F,G,K,M
	temperature 		40.000K		20.000K 	  8500K 	  6500K 	  5700K 	  4500K		  3200K 			3000-10.000K 		below 50.000K 			4000-40.000K
	radius (sun = 1)	   10 			5 			1.7 	    1.3   		1 			0.8 		0.3 			10 - 50 			under 0.01 				30 - 500
	mass(sun = 1) 		   50 			10 			2.0 		1.5 		1 			0.7 		0.2 			1-5 				under 1.4 				10 - 70
	luminocity(sun = 1)  100.000 	    1000 		20 			4 			1 			0.2 		0.01 			50-1000 			under 0.01 				30.000 - 1.000.000
	lifetime (mil yrs) 	   10 			100 		1000 		5000 	  10.000 	   50.000 	 100.000 			1000 				- 						10
	abundance 			 0.00001% 	   0.05% 		0.3% 		1.5% 		4% 			9% 			80% 			0.5% 				5% 						0.0001%

																						   (red dwarf)


	max star size (super giant)
	radius: 1.19e+12 m

	// supernova
	// planetary nebula
	// supernova remnant

	// solar planets
	sun sized stars - 1 in 16 chance of gas giants (jupiter size)
	double sun size stars - 1 in 6 chance of gas giants
	red dwarf stars - 1 in 50 chance of gas giants, 40% chance of super-earth planets in habitable zone

	pulsar neutron star, core less than 10km radius rotational period 1.5msec - several sec

	mass-luminosity relation
	3.5 for main sequence
	L = M^3.5 ( for main sequence stars 0.1 - 50 solar masses)

	a : 1 < a < 6 (3.5 main seq)
	2M0 < M < 20M0 (dont apply to red giants or white dwarfs)
	L/L0 = (M/M0)^a
	
	inputs:
	mass, age

	*/




	var s = {
		spectraltype:"O", // B A
	}

}

// tiny, small, medium, large, massive
function generateStarCluster(){

}

// proto, gas giant, oceanic, frozen, temperate
function generatePlanet(){

	var p = {
		signature:".planet",
		surface:0,
		atmosphere:0,

	};

}

function generateMoon(){}

function generateSpaceSignature(){

}

function generateStarSystem(){}

function generateSector(){}

function generateAtmosphere(){
	var a = {
		composition:{}
	};
}

function generatePlanetSurface(){
	// surface types : oceanic, solid, gaseous, 
	var s = {
		composition:{} // 
	};
}

function generateLifeform(){}

function generateXenoflora(){
	// basically a converter
	// dna sample

}
//																	3%				60%
// resource extraction: difficulty increase with ratio .. eg. [{oxygen:30}, {nitrogen:600000}] 3/100 = 0.01 difficulty modifier

function generateEcosystem(){}

var spaceobjects = {

	planet:{

		radius:7000000,
		mass: 10000000,
		orbits:{},

		inclination:.1,




		signature:"planet",
		gravity:4.7,
		temperature:100,
		atmosphere:{},
		surface:{},
		core:{},
		installations:[],

		
	}

};

var energy_mass_converter = {

	'water':{energy:20, mass:4},
	'oxygen':{energy:}
}

var converter_programs = {

	water_program:
	 {
	 	name: "water production",
	 	type:["converter", "production"]
	 	efficiency: 0.8,
	 	productiontime: 2,
		input:[{'hydrogen':2}, {'oxygen':1}, {'energy':1}],
		output:['water':1]
	},

	fuel_rods:{
		name:"rad fuel production",
		efficiency:0.3,
		productiontime:3,
		input:[{'uranium':1}, {'water':10}, {'energy':2}],
		output:[{'rad fuel':1}, {'radioactive waste':2}]
	},



}

function converter(input_cache, output_cache, coverter_program){
	var c = {
		active: true,

	};
}

var stargame = {

	menu:{

		main:{

			newgame:{},
			continuegame:{},
			loadgame:{},
			newlocalgame:{},
			startservergame:{},
			remoteservergame:{}
		},

		options:{}
	},

	

	settings:{

		server:{
			ip:{'192.168.0.1', '8000' },
			max_users:128
		},

		client:{
			server_ip:{'localhost', 8000}
		},

		user:{
			colors:{
				1:"blue",
				2:"darkblue",
				3:"white"
			}
		}
	},

	starmap:null,

	gamedata:{
		players:{},
		simulation_pulse_interval: 10000,
		galaxy:{
			age:10000000000,
			seed:0,
			starfields:{}
		}
	},

	game_resources:{
		graphics:{
			models:{},
			textures:{},
			shaders:{}
		},
		audio:{
			music:{},
			sounds:{},
			streams:{}
		}
	},

	game_mods:{},

	expansions:{},

	systems:{

		rendering:{},
		audio:{},
		gamelogic:{},
		chat:{},
		user_interface:{},

	},

	utilities:{

		helpers:{
			scatter_spherical:null,
			scatter_planar:null,
			scatter_radial:null,
		},

		generators:{
			noise_gen:null,
			galaxy_gen:null,
			starfield_gen:null,
			starsystem_gen:null,
			planet_gen:null,
			astroid_field_gen:null,
			nebula_gen:null,
			star_gen:null,
			moon_gen:null,
			encounter_gen:null,
			colony_gen:null,
			resource_gen:null,
			supernova_gen:null,
			missile_gen:null,
			meteor_gen:null,
			comet_gen:null,
		}
	},

	client:{

		status:'disconnected',

		net:{

			protocol:{
				version: 1,
				commands:{
					'request_global_game_update': game.client.net.functions.request_global_game_update
				}
			}

			functions:{

				request_update:null,
				request_starprobe:null,
				request_planet_scan:null,
				request_entity_scan:null,
				request_orbit:null,
				request_orbit_construct:null,
				request_construct_fleet_beacon:null,
				request_fleet_beacon_place:null,
				request_market_data:null,
				request_global_game_update:null,
				request_starfield_update:null,
				request_solarsystem_update:null,
				request_planet_update:null,
				request_colony_update:null,
				request_planet_data:null,
				request_fleet_update:null,
				request_enter_game:null,
				request_attack_entity:null,
				request_deconstruct_entity:null,
				request_create_route:null,
				request_delete_route:null,
				request_change_route:null,
				request_star_info:null,
				request_starfold_warp:null,
				request_entity_warp:null,
				request_name_entity:null,
				request_install_entity_module:null,
				request_change_entity_module:null,
				request_remove_entity_module:null,
				request_upgrade_entity:null,
				request_downgrade_entity:null,
				request_change_starfield:null,
				request_set_entity_params:null,
				request_send_player_message:null,
				request_send_admin_message:null,
				request_research_technology:null,
				request_share_technology:null,
				request_techtree_update:null,
				request_player_alliance:null,
				request_set_entity_owner:null,
				request_transfer_resources:null,
				request_accept_trade:null,
				request_new_market_order:null,
				request_cancel_market_order:null,
				request_change_market_order:null,
				request_transfer_currency:null,
				request_player_trade:null,
				request_start_trade_delivery:null,
				request_accept_trade_delivery:null,
				request_simulation_pulse_timer:null,
				request_player_login:null,
				request_player_logout:null,
				request_admin_game_pause:null,
				request_admin_game_resume:null,
				request_new_galaxy_creation:null,

			}
		},

		local:{
			functions:{

			}
		}

	},

	server:{

		status:'stopped',

		net:{

			functions:{

			}
		},

		local:{
			database:null,
			functions:{

			}
		}
		
	}
	
	

}
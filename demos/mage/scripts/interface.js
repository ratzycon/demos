

var interface = {

	state: [],

	select:function(){
		var targets = [];
		game.events.addListener('onEntityClicked', function(e){
			
		});
	},

	set: function(state){
		this.state.push(state);
	}


}
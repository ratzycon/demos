
game.triggers.queue = [];
game.triggers.events = new EventTarget();

game.triggers.add = function(trigger){
	game.triggers.queue.push(trigger);
	game.triggers.events.fire('onNewTrigger', trigger);
};
game.triggers.next = function(){
	if(game.triggers.queue.length>0)
	{
		var trigger = game.triggers.queue.shift();
		game.triggers.events.fire('onTriggerExecuting', trigger);
		var c = trigger.execute(game.triggers.next);
	}
};

function effectManager(){
	var em = 
	{
		effects:[],
		addEffect: function(){},
		clearEffects: function(){},
		endEffect: function(){},
		tick: function(){}
	};
	return em;
}

var player = {

	statpoints : 50,

	stats : [

		["strength", 1],
		["intellect", 1],
		["vitality", 1],
		["willpower", 1],

	]
};

function init() {

	wlog('system initialized');

	renderStats();
}

var logstr = 'Log:' + '<br>';
		
function wlog(msg){

	var d = new Date();
	//logstr += msg + '<br>';
	var l = document.getElementById('log');
	var entry = document.createElement('div');
	entry.setAttribute('class', 'logmsg');
	entry.innerHTML =  d.getHours()+':'+d.getMinutes() + msg;
	if(l.children.length > 0)
		l.insertBefore(entry, l.children[0]);
	else l.appendChild(entry);
}

function increaseStat(index)
{
	//var cost = player.stats[index][1] * 2;
	var cost = player.stats[index][1] + 1;

	if(player.statpoints>=cost)
	{
		player.stats[index][1] += 1;
		player.statpoints -= cost;
		document.getElementById('sfx_click').play();
	}
}

function decreaseStat(index)
{
	if(player.stats[index][1]-1>0)
	{
		player.statpoints += (player.stats[index][1]-1)*2;
		player.stats[index][1] -= 1;
		document.getElementById('sfx_click').play();
	}
}

var count = 0;
function learnskill(){
	player.stats.push(["skill" + count++, 1]);
	renderStats();
	document.getElementById('sfx_click').play();
}

function resetskills()
{
	var pts = player.statpoints;
	for(i=0;i<player.stats.length;i++)
	{
		pts += player.stats[i][1];
	}

	pts = 50;

	player.statpoints = pts;

	player.stats = [

		["strength", 1],
		["intellect", 1],
		["vitality", 1],
		["willpower", 1],

	];

	renderStats();
	document.getElementById('sfx_click').play();
}

function addSkillPoints(points){
	player.statpoints += points;
	renderStats();
	document.getElementById('sfx_click').play();
}

function renderStats()
{
	var list = document.getElementById('ui_stats');
	list.innerHTML = "statpoints: " + player.statpoints;

	for(index = 0; index < player.stats.length; index++)
	{
		var entry = document.createElement('div');
		entry.setAttribute('class', 'panel_item');
		
		var stat = document.createElement('div');
		stat.innerHTML = player.stats[index][0] + " : " + player.stats[index][1] + '<br>' + 'cost to increase: ' + (player.stats[index][1] + 1);

		var b_inc = document.createElement('button');
		b_inc.style.width = "30px";
		b_inc.style.height = "30px";
		b_inc.innerHTML = '+';
		b_inc.statid = index;
		b_inc.onclick = function(){
			increaseStat(this.statid);
			renderStats();
		};

		var b_dec = document.createElement('button');
		b_dec.style.width = "30px";
		b_dec.style.height = "30px";
		b_dec.innerHTML = '-';
		b_dec.statid = index;
		b_dec.onclick = function(){
			decreaseStat(this.statid);
			renderStats();
		};

		entry.appendChild(stat);
		entry.appendChild(b_dec);
		entry.appendChild(b_inc);

		list.appendChild(entry);

	}
}


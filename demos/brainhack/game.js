console.log("game.js");
console.log("screen resolution: " + window.innerWidth + " x " + window.innerHeight);


var gameframe = document.getElementById("gameframe");

var screens = document.getElementById("screens");

var gamescreen = document.getElementById("game");
var menuscreen = document.getElementById("menu");
var scorescreen = document.getElementById("hiscore");

var gems_div = document.getElementById("gems");
var settings_div = document.getElementById("settings");

var gemList = [];
var settingList = [];

var gemIndex = 0;

var points_div = document.getElementById("points");
var points = 0;

var levelReady = false;
var mistakes = 0;
var levelsWithNoMistakesCounter = 0;

var level = 0;
var lives = 0;
var lives_div = document.getElementById("lives");

var audioEnabled = false;

var difficultyMax = 4;
var difficultyMin = 0;
var difficultySpan = 999;

var difficultyMod = 2;
var extraLifeMod = 10;

var images = "img/";

var gems = [
	 "gem_square.png",
	 "gem_diamond.png",
	 "gem_facet.png",
	 "gem_triangle.png",
	 "gem_puzzle1.png",
	 "gem_reflect.png",
	 "gem_anarchy.png",
	 // "gem_eye.png",
	 "gem_multi2x2.png",
	 "gem_pattern1.png",
	 "gem_pi.png",
	 "gem_poke.png",
	 "gem_puzzle2.png",
	 "gem_puzzle3.png",
	 "gem_radioactive.png",
	 "gem_rgb_b.png",
	 "gem_rgb_g.png",
	 "gem_smily.png",
	 "gem_sqrt.png",
	 "gem_star.png"
];

var settings = [
	"set_square.png",
	"set_diamond.png",
	"set_facet.png",
	"set_triangle.png",
	"set_puzzle1.png",
	"set_reflect.png",
	"set_anarchy.png",
	// "set_eye.png",
	"set_multi2x2.png",
	"set_pattern1.png",
	"set_pi.png",
	"set_poke.png",
	"set_puzzle2.png",
	"set_puzzle3.png",
	"set_radioactive.png",
	"set_rgb_b.png",
	"set_rgb_g.png",
	"set_smily.png",
	"set_sqrt.png",
	"set_star.png"
];

window.onload=function(){

	console.log("game start");
	
	menu();
}

function loadAudio(){

	if(!webAudioSupport){
		console.log("web audio not supported by browser");
		audioEnabled = false;
		return;
	}

	loadSound("success", "sfx/success2.wav");
	loadSound("fail", "sfx/fail.wav");
	loadSound("level", "sfx/complete.wav");
	loadSound("ready", "sfx/ready.wav");

	audioEnabled=true;
}

function getGem(gemID){
	return  images + gems[gemID];
}

function getSetting(insetID){
	return images + settings[insetID];
}

function newGame(){
	points = 0;
	difficultyMax = 4;
	addPoints(0);
	addLives(3);
	newLevel();
	//settings_div.innerHTML = window.innerWidth + "x" + window.innerHeight;
}

function increaseDifficulty(){
	
	difficultyMax++;
	if(difficultyMax>gems.length-1)
		difficultyMax = gems.length-1;

	difficultyMin = difficultyMax-difficultySpan;
	if(difficultyMin<0)
		difficultyMin = 0;

	console.log("difficulty: " + difficultyMax + " difficultyMin: " + difficultyMin);
}


function newLevel(){

	level++;

	// extra life
	if(level%extraLifeMod==0 && lives<10){
		addLives(1);
	}

	// difficulty increase
	if(level%difficultyMod==0){
		increaseDifficulty();
	}

	mistakes = 0;
	gemIndex=0;

	gems_div.innerHTML = "";
	settings_div.innerHTML = "";

	gemList = [];
	settingList = [];

	var numGems = 9;
	var numSettings = ranInt(3,6);

	for(var j = 0; j<numSettings;j++){
		var settingID = ranInt(difficultyMin,difficultyMax);
		settingList.push(settingID);
		gemList.push(settingID);
	}

	for(var i = 0; i<(numGems-numSettings);i++){
		gemList.push(ranInt(difficultyMin,difficultyMax));
	}

	shuffle(gemList);

	for(var g = 0; g<gemList.length;g++){
		var gem = document.createElement('img');
		gem.onmousedown= function(){return false;};
		gem.src = getGem(gemList[g]);
		gem.gemId = gemList[g];
		//console.log(gem.gemId);

		gem.clickFunc = function(e){
			e.preventDefault();
			e.stopPropagation();
			checkClicked(e.target);
		};

		gem.addEventListener('touchend', gem.clickFunc, false);
		gem.addEventListener("mouseup", gem.clickFunc, false);

		gems_div.appendChild(gem);
	}

	for(var s = 0; s<settingList.length;s++){
		var setting = document.createElement('img');
		setting.onmousedown= function(){return false;};
		setting.src = getSetting(settingList[s]);
		settings_div.appendChild(setting);
	}

	if(audioEnabled){
		playSound("ready");
	}

	levelReady = true;
}

function clickGem(element){
	return function(element){
		element.stopPropagation();
		//console.log("clicked: " + element.toElement.gemId);
		checkClicked(element.toElement);
	};
}

function checkClicked(element){

	if(settingList[gemIndex]==element.gemId) // success
	{
		console.log("correct!");

		addPoints(100);
		settings_div.childNodes[gemIndex].style.backgroundImage="url(" + settings_div.childNodes[gemIndex].src + ")"; 
		settings_div.childNodes[gemIndex].src = element.src;
		element.src = "img/empty.png";

		if(audioEnabled){ playSound("success"); }

		element.removeEventListener('touchend', element.clickFunc, false);
		element.removeEventListener('mouseup', element.clickFunc, false);

		gemIndex++;
		checkLevelComplete();
		
	} 
	else // fail
	{
		console.log("incorrect");

		levelsWithNoMistakesCounter = 0;
		mistakes++;
		removeLife();

		screens.classList.add("flash");
		setTimeout(function(){screens.classList.remove("flash");}, 30);
		setTimeout(function(){screens.classList.add("flash");}, 60);
		setTimeout(function(){screens.classList.remove("flash");}, 90);

		if(audioEnabled){ playSound("fail"); }
	}
}

function checkLevelComplete(){

	if(gemIndex>settingList.length-1){

		console.log("level complete!");

		var message = document.createElement('div');
		message.innerHTML = "Level " + level + " complete!";
		message.className = "message";

		message.onclick = function(){
			newLevel();
		};
		
		if(mistakes==0){
			levelsWithNoMistakesCounter++;
			message.innerHTML += "<br><br>" + getCompliment();
			message.innerHTML += "<br>+100 Points";
			addPoints(100);
		}

		message.innerHTML += "<br><br>Click for Next";

		gems_div.innerHTML="";
		gems_div.appendChild(message);

		if(audioEnabled){
			playSound("level");
		}

		screens.classList.add("flash_success");
		setTimeout(function(){screens.classList.remove("flash_success");}, 30);
		setTimeout(function(){screens.classList.add("flash_success");}, 60);
		setTimeout(function(){screens.classList.remove("flash_success");}, 90);

		levelReady = false;
	}
}

function addLives(_amount){
	lives += _amount;
	console.log("lives added: " + _amount);

	for(var i = 0; i<_amount; i++){
		var l = document.createElement('img');
		l.src = "img/life_s.png";
		lives_div.appendChild(l);
	}
}

function removeLife(){
	lives--;
	lives_div.removeChild(lives_div.childNodes[lives_div.childNodes.length-1]);
	console.log("lives left: " + lives);
	if(lives==0){
		gameOver();
	}
}

function gameOver(){
	console.log("game over");
	settings_div.innerHTML = "Game Over"; // should load hi score
	gems_div.innerHTML = "";
	gamescreen.onclick = function(){
		console.log("go to menu");
		gamescreen.onclick='undefined';
		menu();
	}
}

function addPoints (_points) {
	points += _points;
	points_div.dataset.points = points;
}

function ranInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {

  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var successWords = ["Excellent!", "Flawless!", "No Mistakes!", "Fantastic!", "Perfect!", "Skilled!", "Superb!", "Amazing!", "Correct!", "Doing good!", "Exactly!", "Outstanding!", "Sublime!", "Good!", "Exactly!", "Keep it up!"];
function getCompliment(){
	return successWords[ranInt(0, successWords.length-1)];
}

// menu options ---------------------------------------------

function game(){

	loadAudio();

	fullscreen(gameframe);

	gamescreen.style.display = "block";
	scorescreen.style.display = "none";
	menuscreen.style.display = "none";

	newGame();
}

function menu(){

	gamescreen.style.display = "none";
	scorescreen.style.display = "none";
	menuscreen.style.display = "block";
}

function hiscore(){
	gamescreen.style.display = "none";
	scorescreen.style.display = "block";
	menuscreen.style.display = "none";
}

var hiscores = {

	scores:[
		{"name":"test", "score": 0},
		{"name":"test", "score": 0},
		{"name":"test", "score": 0}
	]

}

function quit(){
	exitFullscreen();
}

// menu options end ---------------------------------------------


function getSHighestScore(){
	var highestIndex = 0;
	var highestScore = 0;
	for(var i = 0; i<hiscores.scores.length;i++){
		var s = hiscores.scores[i]["score"];
		if(s>highestScore){
			highestScore = s;
			highestIndex = i;
		}
	}
	var result = hiscores.scores[highestIndex];
	console.log("get highest score: " + result["name"] + " : " + result["score"]);
	return result;
}


function getLowestScore(){
	var lowIndex = 0;
	var lowestScore = 0;
	for(var i = 0; i<hiscores.scores.length;i++){
		var s = hiscores.scores[i]["score"];
		if(s<lowestScore){
			lowestScore = s;
			lowIndex = i;
		}
	}
	var result = hiscores.scores[lowIndex];
	console.log("get lowest score: " + result["name"] + " : " + result["score"]);
	return result;
}

function getScorePosition(_score){

}

function checkScore(_score){
	var lowest = getLowestScore();
	if(_score > lowest["score"])
		return true;
	else return false;
}

function loadHiScore(){

}

function saveHiScore(_data){

	var hiscoreDataStr = JSON.stringify(_data);

	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("HISCORE", hiscoreDataStr);
    
	} else {
	    console.log("no local storage support");
	}
}

function loadHiScore(){
	var data = localStorage["HISCORE"];
	return JSON.parse(data);
}

function fullscreen(element){

	// if (element.webkitRequestFullscreen) {
	// 	element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	// } 
	// else 
	// {
	// 	if (element.mozRequestFullScreen) {
	//   		element.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	// 	}
	// 	else {
	// 	  	element.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	// 	}
	// }


	if (element.requestFullscreen) {
	    element.requestFullscreen();
	}
	else if (element.mozRequestFullScreen) {
	    element.mozRequestFullScreen();
	}
	else if (element.webkitRequestFullScreen) {
	    element.webkitRequestFullScreen();
	}
	else if (element.msRequestFullscreen) {
	    element.msRequestFullscreen();
	}

	console.log("fullscreen requested");
}

function exitFullscreen(){
	console.log("exit fullscreen");
	if(document.webkitExitFullscreen)
  		document.webkitExitFullscreen();
}



















// mobile locks 

/* Locking mobile browser non-gaming manipulations */
// document.body.addEventListener("touchmove", function(e)
// {
//     e.preventDefault();
//     return false;
// });

// document.body.addEventListener("touchstart", function(e)
// {
//     e.preventDefault();
//     return false;
// });

// document.body.addEventListener("selectstart", function(e)
// {
//     e.preventDefault();
//     return false;
// });

// document.body.addEventListener("dragstart", function(e)
// {
//     e.preventDefault();
//     return false;
// });

// document.body.addEventListener("contextmenu", function(e)
// {
//     e.preventDefault();
//     return false;
// });


// myarray.sort( function(a,b) { return b - a; } );



// function toggleFullScreen() {
//   var doc = window.document;
//   var docEl = doc.documentElement;

//   var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
//   var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

//   if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
//     requestFullScreen.call(docEl);
//   }
//   else {
//     cancelFullScreen.call(doc);
//   }
// }


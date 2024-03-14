
function sprite(name){
    return {
        name: name,
        img:"",
        x:0,
        y:0
    };
}

function gamesprite(name){
    var gs = sprite(name);
    gs.move = function(x, y){
        gs.x = x;
        gs.y = y;
    };
    return gs;
}

function printpos(_e){
    console.log(_e.name + " pos: " + _e.x + "," + _e.y);
}

var player = gamesprite("player");
player.move(5,5);

function createEntity(name){
    
    var e = entity("enemy");
   // moveable(e);
   // scalable(e);
   // rotatable(e);
    
    return e;
}

function createEnemy(){
    
    //var e = sprite("enemy");
    var e = createEntity("enemy");
    //moveable(e);
    //scalable(e);
    //rotatable(e);
    
    return e;
}

var enemy = createEnemy();

var enemies = [];
for(var i=0;i<10;i++)
    enemies.push(createEnemy());
    
for(var i=0;i<10;i++)
     printObj(enemies[i]);
     
//for(var x in enemies)
//    printObj(x);

//enemy.move(10,10).scale(3).rotate(2);

//move(enemy, 200, 200);

//p.move(3,3);
//printpos(p);
//printpos(player);
//printObj(player);
printObj(enemy);

//console.log(typeof player);

var eId =0;
function entity(name){
    return {
        name:name,
        id:eId++
    };
}

function moveable(obj){
    obj.x = 0;
    obj.y = 0;
    obj.move = function(_x, _y){
        obj.x = _x;
        obj.y = _y;
        return obj;
    };
    return obj;
}

function scalable(obj){
    obj.size = 1;
    obj.scale = function(_size){
        obj.size = _size;
        return obj;
    };
    return obj;
}

function rotatable(obj){
    obj.rotation = 0;
    obj.rotate = function(_rot){
        obj.rotation = _rot;
        return obj;
    }
    return obj;
}

function move(obj, x, y){
    obj.x = x;
    obj.y = y;
    return obj;
}

function printObj(obj){
    for(var propName in obj)
    {
        console.log(propName + ":" + obj[propName]);
    }
    console.log(".......");
}




function fade(id){

    var dom = document.getElementById(id), 
    level = 1;

    function step(){
        var h = level.toString(16);
        dom.style.backgroundColor = '#FFFFF' + h + h;
        if(level<15){
            level += 1;
            setTimeout(step, 100);
        }
    }
    setTimeout(step, 100);
}


function moveTo(obj, x, y, speed, callback){


    function animate(){

    }
    animate();
}
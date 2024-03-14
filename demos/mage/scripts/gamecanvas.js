
function GameCanvas(canvas){
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.ctx.translate(canvas.width/2, canvas.height/2);
	this.drawImg = function(img){this.ctx.drawImage(img, 0,0,0,0,0,0)} // srcX, srcY, srcWidth, srcHeight, desX, desY, desWidth, desHeight
	this.drawImgCentered = function(img){this.ctx.drawImage(img, -img.width*0.5, -img.height*0.5);}
	this.clear = function(){this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);}

	//fitToContainer(this.canvas);
}


 // resize the canvas to fill browser window dynamically
   // window.addEventListener('resize', resizeCanvas, false);

    //function resizeCanvas() {
   //         canvas.width = window.innerWidth;
   //         canvas.height = window.innerHeight;

           

            /**
             * Your drawings need to be inside this function otherwise they will be reset when 
             * you resize the browser window and the canvas goes will be cleared.
             */
           // drawStuff(); 
    //}
   // resizeCanvas();


function fitToContainer(canvas){

  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
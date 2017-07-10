var canvas = document.getElementById("canvas");
var button1 = document.getElementById('button1');
var messageDiv = document.getElementById('messageDiv');
var button2 = document.getElementById('button2');
var context = canvas.getContext('2d');
var over =0;
var borad = [];
		for(var i=0;i<=15;i++){
			borad[i]=[];
			for(var j=0;j<=15;j++){
				borad[i][j]=0;
			}
		}

var Borad = function(){
	this.started = false;
	this.messageDiv = messageDiv;
	this.borad = borad;
	this.steps = [];

	this.container = canvas;
	var self = this;
	this.container.onclick = function(e){
		if(!self.started || self.lock)
			return;
		var x = Math.floor(e.offsetX/30);
	    var y = Math.floor(e.offsetY/30);
	    if(self.borad[x][y] != 0)
	    	return;
	    self.borad[x][y] = 2;
	    self.draw(x,y,2);
	    self.worker.postMessage([x,y]);
	    self.lock = true;
	    self.messageDiv.innerHTML = '电脑正在落子...';

	}


	this.worker = new Worker('./js/computer.js');
	this.worker.onmessage = function(e){
		over = e.data[2];
		if(over == 1 ){
			self.messageDiv.innerHTML = '你赢了';
		}else {
			self.draw(e.data[0],e.data[1],1);
			borad[e.data[0]][e.data[1]] = 1;
			if(over == 2){
				self.messageDiv.innerHTML = '电脑赢了';
			}else{
				self.lock = false;
				self.messageDiv.innerHTML = "电脑下子("+e.data[0]+","+e.data[1]+")";
			}
			
		}
		
	}


}

// 棋盘初始化
Borad.prototype.inital = function(){
	var context = canvas.getContext('2d');
		if(canvas==null)
			return false;
		context.strokeStyle = '#000000';
		for(var i=0;i<15;i++){
			context.beginPath();
			context.moveTo(15+30*i,15);
			context.lineTo(15+30*i,435);
			context.moveTo(15,15+30*i);
			context.lineTo(435,15+30*i);
			context.closePath();
			context.stroke();	
		}	
	var borad = [];
		for(var i=0;i<=15;i++){
			borad[i]=[];
			for(var j=0;j<=15;j++){
				borad[i][j]=0;
			}
		}
}

// 画棋子
Borad.prototype.draw = function(x,y,player){
	if(player==0)
		return;
 	context.beginPath();
	context.arc(x*30+15,y*30+15,13,0,Math.PI*2,true);
	context.closePath();
    var g = context.createRadialGradient(x*30+15+2,y*30+15-2,0,x*30+15,y*30+15,15);
    if(player==1){
    	g.addColorStop(0,'#636766');
        g.addColorStop(1,'#0a0a0a');
    }else{
    	g.addColorStop(0,'#f9f9f9');
        g.addColorStop(1,'#d1d1d1');
    }
    context.fillStyle=g;
    context.fill();
}

// 开始游戏
Borad.prototype.start = function(){
	if(this.started)
		return;
	// 开始游戏时，清除落子
	var context = canvas.getContext('2d');
	context.clearRect(0,0,450,450);
	this.inital();

	this.messageDiv.innerHTML = "欢迎开始五子棋游戏,请落子";
	this.started = true;
}

//结束游戏
Borad.prototype.stop = function(){
	if(!this.started) 
		return;
	var context = canvas.getContext('2d');
	context.clearRect(0,0,450,450);
	this.inital();
	this.messageDiv.innerHTML ="请点击开始按钮";
	this.started = false;
}

var b = new Borad();
 b.inital();
button1.onclick = function(){

	b.start();
	b.inital();
};
button2.onclick = function(){
	if(confirm('确定要重新开始吗')){
	    b.stop();
	}
}
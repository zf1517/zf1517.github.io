//赢法数组
var borad = [];
	for(var i=0;i<=15;i++){
		borad[i]=[];
		for(var j=0;j<=15;j++){
			borad[i][j]=0;
		}
    }

	var wins = [];
	for(var i=0;i<15;i++){
		wins[i] = [];
		for(var j = 0;j<15;j++){
			wins[i][j] = [];
		}
	}
	var count = 0;
	for(var i=0;i<15;i++){
		for(var j=0;j<11;j++){
			for(var k=0;k<5;k++){
				wins[i][j+k][count]=true;
			}
			count++;
		}
	}
	for(var i=0;i<11;i++){
		for(var j=0;j<15;j++){
			for(var k=0;k<5;k++){
				wins[i+k][j][count]=true;
			}
			count++;
		}
	}
	for(var i=0;i<11;i++){
		for(var j=0;j<11;j++){
			for(var k=0;k<5;k++){
				wins[i+k][j+k][count]=true;
			}
			count++;
		}
	}
	for(var i=0;i<11;i++){
		for(var j=14;j>3;j--){
			for(var k=0;k<5;k++){
				wins[i+k][j-k][count]=true;
			}
			count++;
		}
	}

	//赢法统计数组
	var myWin = [];
	var comWin = [];
	for(var i=0;i<count;i++){
		myWin[i] = 0;
		comWin[i] = 0;	
	}
	
	var result = [0,0,0];
	var myScore = [];
	var computerScore = [];
	for(var i=0;i<15;i++){
			myScore[i] = [];
			computerScore[i] = [];
			for(var j=0;j<15;j++){
				myScore[i][j]=0;
				computerScore[i][j]=0;
			}
		}

onmessage = function(event){
	var x = event.data[0];
	var y = event.data[1];

	borad[x][y] = 2; //人落子xy

	for (var k=0;k<count;k++){
		if(wins[x][y][k]){
			myWin[k]++;
			comWin[k] = -1;
			if(myWin[k] == 5){
				result = [15,15,1];
			}
		}
	}
	var max=0;
	var u = 0;
	var v = 0;
	if(result[2] != 1){
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				if(borad[i][j] == 0){
					for(var k=0;k<count;k++){
						if(wins[i][j][k]){
							if(myWin[k] == 1){
								myScore[i][j] += 200;
							}else if(myWin[k]==2){
								myScore[i][j] += 400;
							}else if(myWin[k]==3){
								myScore[i][j] += 2000;
							}else if(myWin[k] == 4){
								myScore[i][j] += 10000;
							}
							if(comWin[k] ==1 ){
								computerScore[i][j]+=220;
							}else if(comWin[k] == 2){
								computerScore[i][j]+=420;
							}else if(comWin[k] == 3){
								computerScore[i][j]+=2100;
							}else if(comWin == 4){
								computerScore[i][j] += 20000;
							}
						}
					}
					if(myScore[i][j]>max){
						max = myScore[i][j];
						u = i;
						v = j;
					}else if(myScore[i][j]==max){
						if(computerScore[i][j]>computerScore[u][v]){
							u = i;
							v = j;
						}
					}
					if(computerScore[i][j]>max){
						max = computerScore[i][j];
						u =i;
						v =j;
					}else if(computerScore[i][j]==max){
						if(myScore[i][j]>myScore[u][v]){
							u = i;
							v = j;
						}
					}

				}
			}
		}
		for (var k=0;k<count;k++){
			if(wins[u][v][k]){
				comWin[k] ++;
				if(comWin[k] == 5){
					result[2] = 2;
				}else{
					result[2] = 0;
				}
			}
		}
		result[0] = u;
		result[1] = v;
		
	}
	borad[u][v] = 1;
	postMessage(result);
}
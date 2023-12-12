var dlevel=1;
var levelItem = [35, 45, 50, 55, 60];
var question;
var answer;
var mistake;
var reqNumber;

// Backend Logic

function StartPlaying() {
  dlevel = document.getElementById("difficultySelect").value;
  myFunction(dlevel);
  
  loadSudukoUI();
}

function myFunction(level) {
    
    //process question & answer array
    var arr = [		
        [[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]],[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]],[[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]],[[0,0,0],[0,0,0],[0,0,0]]]
    ];

    sudukoSolver(arr, 0,0,0,0);

    answer = arrayConversion(arr); //2d
    
    question = arrayCopy(answer);
    createQuestion(level, question);
}

function arrayCopy(arr){
    var temp = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    for(var i =0; i<9; i++){
        for(var j=0; j<9; j++){
            temp[i][j]=arr[i][j];
        }
    }
    return temp;
}

function arrayConversion(arr){
    
		var question=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
		var row = 0;
        var col = 0;

		for(var i=0; i<3; i++) {
			for(var j=0; j<3; j++) {
				for(var k=0; k<3; k++) {
					for(var l=0; l<3; l++) {
						if(col==9) {
							row++;
							col=0;
						}
						question[row][col] = arr[i][j][k][l];
						col++;
					}
				}
			}
		}
		return question;
}

function createQuestion(level,arr){
    var row = 0, col = 0, min = 0, max = 8;
    for(var i=0; i<levelItem[level-1]; ) {
        row = getRndInteger(min,max);
        col = getRndInteger(min,max);
        if(arr[row][col] != 0 ) {
            arr[row][col] = 0;
            i++;
        }
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function arrayManipulate(arr){
    var arr1 = arr;
    for(var i=0; i<3; i++) {
        for(var j=0; j<3; j++) {
            for(var k=0; k<3; k++) {
                for(var l=0; l<3; l++) {
                    arr1[i][j][k][l]=0;
                }
            }
        }
    }
}


function sudukoSolver(arr, mainRow, mainCol, row, col){
		if(col>2) {
			row++;
			col=0;
		}
		if(row>2) {
			mainCol++;
			row=0;
		}
		if(mainCol>2) {
			mainRow++;
			mainCol=0;
		}
		if(mainRow>2) {
			return true;
		}

		if(arr[mainRow][row][mainCol][col]>0) 
			return sudukoSolver(arr, mainRow, mainCol, row, col+1);

        var arr1 = [1,2,3,4,5,6,7,8,9];
        shuffle(arr1);

		for(var i=0; i<9; i++) {
            var elm = arr1[i];
			if(isValid(arr, mainRow, mainCol, row, col, elm)) {
				arr[mainRow][row][mainCol][col]=elm;
				if(sudukoSolver(arr, mainRow, mainCol, row, col+1))
					return true;
				arr[mainRow][row][mainCol][col]=0;
			}
		}

		return false;
}
 
// 4D array input
function isValid(arr, mainRow, mainCol, row, col, num){
    for(var i=0; i<3; i++) {
        for(var j=0; j<3; j++) {
            if(arr[mainRow][row][i][j]==num || arr[mainRow][i][mainCol][j]==num || arr[i][j][mainCol][col]==num){
                return false;
            }
        }
    }

    return true;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// UI Logic

function refreshPressed() {
  loadSudukoUI();
}

function resetPressed() {
  document.getElementById('menuContainer').style.display = 'flex';
  document.getElementById('gameContainer').style.display = 'none';
}

function loadSudukoUI() {
  document.getElementById('menuContainer').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';

  reqNumber = levelItem[dlevel-1];

  mistake = 0;
  document.getElementById('mistakeCount').innerHTML = 'Mistake: '+mistake+' / 5';

  var sdk = document.getElementById('mySuduko');
  sdk.innerHTML = '';
  for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
      var num = question[i][j].toString();
      var isEditable = 'readonly';
      if (num == '0') {
        isEditable = '';
        num = ''
      }

      var style = '';
      if (j % 3 == 2 && j != 8) {
        style = 'border-right: 2px solid black;z-index: 1;';
      }
      if (i % 3 == 2 && i != 8){
        style += 'border-bottom: 2px solid black;';
      }

      var elmId = 'sudukoItem_'+i+'_'+j;//oninput="this.value = this.value.match(/[1-9]/g);"
      sdk.innerHTML += '<input id="'+elmId+'" class="sudoku_child_item" type="tel" style="'+style+'" value="'+num+'" maxlength="1" oninput="numberTyped('+i+','+j+','+elmId+')" '+isEditable+' onclick="itemClicked('+i+','+j+','+elmId+')">';
    } 
  }
}

function itemClicked(i, j, elmId){
  // alert(""+i+" "+j+" "+elmId);
}

function numberTyped(i, j, elmId){
  // alert(elmId.value);
  var num = elmId.value.match(/[1-9]/g); 
  elmId.value = num
  if (isNaN(parseInt(num))) {
    return;
  } 
  
  if (answer[i][j] == elmId.value) {
    // success
    reqNumber--;
    elmId.style.color = 'black';
    if(reqNumber==0){
      alert('congratulation!!! Retuning to main menu.');
      resetPressed();
    }
  } else {
    // fail
    mistake++;
    document.getElementById('mistakeCount').innerHTML = 'Mistake: '+mistake+' / 5';
    if(mistake  >= 5 || mistake <= 0){
      // document.getElementById('mistakeCount').innerHTML = 'Mistake: '+mistake+' / 5';
      alert('Maximum mistake limit reached. Refreshing Suduko !!!');
      refreshPressed();
    }
    
    elmId.style.color = 'red';
  }
}
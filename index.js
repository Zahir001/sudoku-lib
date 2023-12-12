const sudokuQuestion = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const sudokuAnswer = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

window.addEventListener('load', function() {
  loadSuduko();
})

function loadSuduko() {
  var sdk = document.getElementById('mySuduko');
  sdk.innerHTML = '';
  for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
      var num = sudokuQuestion[i][j].toString();
      var isEditable = 'readonly';
      if (num == 0) {
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
  
  if (sudokuAnswer[i][j] == elmId.value) {
    // success
    elmId.style.color = 'black';
  } else {
    // fail
    elmId.style.color = 'red';
  }
}
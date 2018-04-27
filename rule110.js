//rows and columns of grid
var rows = 24;
var cols = 65;

//our current row number, starting at 0
var rowNum = 0;

//current row array
var grid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var nextGen = [];


//init: run this at start
function initialize(){
	createTable();
	initGrid();
	setupButton();
	
}

function copyAndReset(){
	//we are copying the nextGen grid into grid and then erasing the nextGen for next update.
            grid = nextGen.slice();
}


//create our grid
function createTable(){
	
	//get the div holding the grid
	var container = document.getElementById("rule110");
	//create our table
	var table = document.createElement("table");
//rows  and cols
	for (var i = 0; i < 24; i++){
		var tr = document.createElement("tr");
		//columns
		for (var j = 0; j < 65; j++){
			var cell = document.createElement("td");
			//give each cell its own id
			cell.setAttribute("id", i + "_" + j);
			
			cell.setAttribute("class", "dead");
			
				//append cell to rrow
			tr.appendChild(cell);
		}
		//add row to table
		table.appendChild(tr);
	}
	
	//add table to page
	container.appendChild(table);
}

//initial grid
function initGrid(){	
	var startCell = document.getElementById("0_32");
	startCell.setAttribute("class", "live");
}

//set up the button
function setupButton(){
	//start
	var goBtn = document.getElementById("start");
	goBtn.onclick = goButton;	
}

function goButton(){
	//for now, every time go button is pressed the next row updates	
	
	//apply rules to every cell in  current row only
	for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 65; j++) {
	 		var cellID = document.getElementById(i + "_" + j);
			//apply the rules to the current row of cells
			if(i == rowNum){
			applyRules(j);	
				
				}
			}
		}	
	//update table
		updateGrid();
		copyAndReset();
		
	}

function applyRules(cellID){
//cellIDs is id#  grid[cellID] is contents of array

	//edge case: leftmost grid: leave the same 
	if(cellID == 0){
		nextGen[cellID] = grid[cellID];
			}
	//edge case: rightmost grid
	else if(cellID == 64){
		nextGen[cellID] = grid[cellID];
			}
	//not an edge case:

	else {
	//If the current cell is dead (0):
			if(grid[cellID] === 0){
			//>If its neighbours are both dead, it stays dead. (000 -> 0) 
				if(grid[cellID+1] ===0 && grid[cellID-1] === 0){
					nextGen[cellID] = 0;
				}
				
				//If both of its neighbours are alive, it comes alive (101 ->1 )
				else if(grid[cellID+1] ===1 && grid[cellID-1]=== 1){
						nextGen[cellID] = 1;
				}
					//<li>If its left neighbour is alive, it stays dead (100 ->0)</li>
				else if(grid[cellID - 1] == 1){
						nextGen[cellID] = 0;
					}
				//>If its right neighbour is alive, it comes alive (001-> 1)</li>
				else{
					nextGen[cellID] = 1;
				}
			}
		//if the current cell is alive	
			else if(grid[cellID] === 1){
				//If both of its neighbours are dead, it stays alive (010 -> 1)
					if(grid[cellID+1] ===0 && grid[cellID-1]=== 0){
								nextGen[cellID] = 1;
					}
				//If both of its neighbours are alive, it becomes dead (111 -> 0)
					else if(grid[cellID+1] ===1 && grid[cellID-1]=== 1){
						nextGen[cellID] = 0;
						}
				//If just one of its neighbours are alive, it stays alive (011 -> 1; 110 -> 1)
					else{
					nextGen[cellID] =1;
					}
		}
	
	}
	

}


function updateGrid(){
	//display next row
	//set attributes of cells 
	for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 65; j++) {
	 		var cell = document.getElementById((i + 1) + "_" + j);
			//apply the rules to the current row of cells
			if(i == rowNum){
			  if(nextGen[j] === 0){
					cell.setAttribute('class', 'dead');
				}
				else{
					cell.setAttribute('class', 'live');
				}
				
				}
			}
		}	
	
	rowNum ++;
}		


//start it all
window.onload = initialize;
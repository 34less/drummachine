// Drum Arrays
var kicks = Array(16).fill(false);
var snares = Array(16).fill(false);
var hiHats = Array(16).fill(false);
var rideCymbals = Array(16).fill(false);

// This function gives the possibility to toggle the drum
function toggleDrum(played, index){

	switch(played) {
	    case 'kicks':
	        kicks[index]=true;
	        break;
	    case 'snares':
	        snares[index]=true;
	        break;
	    case 'hiHats':
	    	hiHats[index]=true;
	    	break;
	    case 'rideCymbals':
	    	rideCymbals[index]=true;
	    	break;
	}

}

//this function clear the corresponding row
function clear(arrayname){

	switch(arrayname) {
	    case 'kicks':
	        kicks=Array(16).fill(false);
	        break;
	    case 'snares':
	        snares=Array(16).fill(false);
	        break;
	    case 'hiHats':
	    	hiHats=Array(16).fill(false);
	    	break;
	    case 'rideCymbals':
	    	rideCymbals=Array(16).fill(false);
	    	break;
		}

	}

//this function invert the corresepondig row
function invert(arrayname){

	switch(arrayname) {
	    case 'kicks':
	        kicks.reverse();
	        break;
	    case 'snares':
	        snares.reverse();
	        break;
	    case 'hiHats':
	    	hiHats.reverse();
	    	break;
	    case 'rideCymbals':
	    	rideCymbals.reverse();
	    	break;
		}
}

// this function allows the use of the pad
function getNeighborPads(x,y,size){
	let neighbors = [];

	console.log(neighbors);

	if (x!=0){
		neighbors.push([x-1,y]);
	}
	if (x!=4){
		neighbors.push([x+1,y]);
	}
	if (y!=0){
		neighbors.push([x,y-1]);
	}
	if (y!=4){
		neighbors.push([x,y+1]);
	}	
	console.log(neighbors);

	return neighbors;

}
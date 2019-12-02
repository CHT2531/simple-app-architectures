let btn;
let colourTxtBox;

function changeTheColour(){
	if(localStorage.getItem("colour")){
		document.body.style.backgroundColor = localStorage.getItem("colour")
	}
}
function addtoWebStorage(){
	const userColour = colourTxtBox.value;
	localStorage.setItem("colour",userColour);
	changeTheColour();
}

function init(){
	colourTxtBox = document.querySelector("#colourTxtBox");
	btn = document.querySelector("#btn");
	btn.addEventListener("click",addtoWebStorage,false);
	changeTheColour();
}

init();

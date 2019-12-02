let userColourEl;


function init(){
	userColourEl = document.querySelector("#colour-heading");
	const userColour = sessionStorage.getItem("colour");
	document.body.style.backgroundColor=userColour;
	userColourEl.textContent=`You chose ${userColour}`;

}

init();

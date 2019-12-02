let page1Link;
let page2Link;
let page1;
let page2;



function changeScreen(id){
	if(id==="1"){
		page1.classList.remove("hide");
		page2.classList.add("hide");
	}else{
		page1.classList.add("hide");
		page2.classList.remove("hide");
	}
}

function linkHandler(evnt){
	evnt.preventDefault(); //stop the default hyperlink
	const id = evnt.target.getAttribute("data-page"); //get the id of the screen to make visible
	changeScreen(id);
	//add a new history entry see:- https://css-tricks.com/using-the-html5-history-api/
	history.pushState({"page":id},null, id);
}

//this event is triggered when the back button is hit
window.addEventListener('popstate', function(evnt) {
	changeScreen(evnt.state.page);
});

function init(){

	page1Link = document.querySelector("#page1Link");
	page2Link = document.querySelector("#page2Link");
	page1 = document.querySelector("#page1");
	page2 = document.querySelector("#page2");

	page1Link.addEventListener("click",linkHandler,false);
	page2Link.addEventListener("click",linkHandler,false);

}

init();

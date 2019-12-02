

let titleEl;
let capitalEl;
let populationEl;


function buildPage(country)
{


	titleEl.textContent = country.name;
	capitalEl.textContent = country.capital;
	populationEl.textContent = country.population;
}


function init(){
	titleEl=document.querySelector("#title");
	capitalEl=document.querySelector("#capital");
	populationEl=document.querySelector("#population");
	const country = JSON.parse(sessionStorage.getItem("country"));
	buildPage(country);
}


init();

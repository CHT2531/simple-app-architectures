
let titleEl;
let capitalEl;
let populationEl;

function doAjax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
}

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

	//URLSearchParams provides an easy method for getting data from the querystring e.g. details.html?id=3
	//see https://davidwalsh.name/query-string-javascript for more info
	var urlParams = new URLSearchParams(window.location.search);
	var id = urlParams.get("id");

	doAjax("data/country"+id+".json",buildPage); //request a JSON file e.g. country3.json
}


init();

let countriesList;
let countries;

function doAjax(url,callback)
{
	fetch(url).then(function(response) {
		return response.json();
	}).then(function(json) {
		callback(json)
	});
}


function getCountryHandler(country)
{
	return function(){
		sessionStorage.setItem("country",JSON.stringify(country));
	}
}


function buildCountryList(data)
{
		countries = data
		const countriesFragment = document.createDocumentFragment();
		countries.forEach(function(country){
				const newLink = document.createElement("a");
		    const newLi = document.createElement("li");
		    newLi.textContent = country.name;
				newLink.appendChild(newLi);
				newLink.setAttribute("href","details.html");
				newLink.addEventListener("click",getCountryHandler(country),false)
		    countriesFragment.appendChild(newLink);
		});
		countriesList.appendChild(countriesFragment);
}

function init(){
	countriesList = document.querySelector("#countries-list");
	doAjax("data/countries.json",buildCountryList);
}

init();

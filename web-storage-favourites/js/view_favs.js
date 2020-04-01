//typically this data would come from Ajax
const countries=[
    {id:1, name:"England", capital : "London", continent : "Europe", population: 53000000},
    {id:2, name:"France", capital : "Paris", continent : "Europe", population: 67000000},
    {id:3, name:"USA", capital : "Washington", continent : "N. America", population: 325000000},
    {id:4, name:"Japan", capital : "Tokyo", continent : "Asia", population: 127000000}
]

function showFavourites(){
  const countriesFragment = document.createDocumentFragment(); //create a fragment
  if(localStorage.getItem("savedCountries")){
    //we have some ids in the web storage
    const savedCountriesStr = localStorage.getItem("savedCountries"); //get the string from web storage
    const savedCountries = JSON.parse(savedCountriesStr); //convert the string to JSON
    countries.forEach(function(country){
      if(savedCountries.indexOf(country.id) > -1){
        //the countries id matches an id from web storage
        const newP = document.createElement("p"); //create a <p> element
        newP.textContent = country.name; //insert the text into the paragraph
        countriesFragment.appendChild(newP);
      }
    }); //end of forEach
  }else{
    //no favourites
    const newP = document.createElement("p"); //create a <p> element
    newP.textContent = "You haven't got any favourites"; //insert the text into the paragraph
    countriesFragment.appendChild(newP);
  }
  const countriesDiv = document.querySelector("#countries"); //get hold of the div from the page
  countriesDiv.appendChild(countriesFragment); // we only update the document once!
}


function init(){
  showFavourites();
}
init();

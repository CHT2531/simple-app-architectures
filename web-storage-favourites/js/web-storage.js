//typically this data would come from Ajax
const countries=[
    {id:1, name:"England", capital : "London", continent : "Europe", population: 53000000},
    {id:2, name:"France", capital : "Paris", continent : "Europe", population: 67000000},
    {id:3, name:"USA", capital : "Washington", continent : "N. America", population: 325000000},
    {id:4, name:"Japan", capital : "Tokyo", continent : "Asia", population: 127000000}
]
function getAddToStorage(country){
  return function(){
    if(localStorage.getItem("savedCountries")){
      const savedCountriesStr = localStorage.getItem("savedCountries"); //get the string from web storage
      const savedCountries = JSON.parse(savedCountriesStr); //convert the string to JSON
      console.log(savedCountries.indexOf(country.id))
      if(savedCountries.indexOf(country.id) > -1){
        //it's already in the array
        alert("It's already in the favourites")
      }else{
        savedCountries.push(country.id)
        localStorage.setItem("savedCountries",JSON.stringify(savedCountries))
        alert(`Added ${country.name} to the favourites`)
      }
    }else{
      const savedCountries = [country.id];
      localStorage.setItem("savedCountries",JSON.stringify(savedCountries))
      alert(`Added ${country.name} to the favourites`)
    }
  }
}

function showCountries(){
  const countriesFragment = document.createDocumentFragment(); //create a fragment
  countries.forEach(function(country){
      const newDiv = document.createElement("div"); //create a <div> element
      const newLink = document.createElement("a"); //create a hyperlink element
      newLink.textContent = country.name+" (add to favourites)"; //insert the text into the hyperlink
      newLink.addEventListener("click",getAddToStorage(country))
      newDiv.appendChild(newLink);
      countriesFragment.appendChild(newDiv); //insert the <p> into the fragment
  });
  const countriesDiv = document.querySelector("#countries"); //get hold of the div from the page
  countriesDiv.appendChild(countriesFragment); // we only update the document once!
}


function init(){
  showCountries();
}
init();

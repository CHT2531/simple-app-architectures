# Simple JavaScript Application Architectures

The following describes some simple approaches to building dynamic JavaScript applications i.e. apps where we load data using Ajax and use JavaScript to dynamically change the HTML document. It is split into two parts
1. Techniques and APIs
2. Application Architectures

## Techniques and APIs
### Associating data with dynamically generated elements
In a front-end web applications, there is often a requirement to dynamically generate HTML elements from an array of data. Here's an example.

```javascript
const students=[
  {name:"Jane",course:"ICT", mark:67},
  {name:"Imran",course:"BACB", mark:42},
  {name:"Zofia",course:"BAIM", mark:72},
  {name:"Bill",course:"BAIM", mark:39}
]

function showMsg()
{
  console.log("You clicked on a student")
}

const studentsFragment = document.createDocumentFragment(); //create a fragment
students.forEach(function(student){
  const newLi=document.createElement("li"); //create a new <li>
  newLi.textContent=student.name; //add the student's name
  newLi.addEventListener("click",showMsg,false); // add an event listener
  studentsFragment.appendChild(newLi); //insert into the <ul> element
})

const stuList=document.querySelector("#stu-list"); //get hold of a <ul> element
stuList.appendChild(studentsFragment);

```

A new list item is added for each of the students. When a list element is clicked the console displays 'You clicked on a student'.

How would you go about associating data with a list item? i.e. the console shouldn't just display a generic message, it should tell us which student was clicked and their mark.

The answer is to use a closure:

```javascript
const students=[
  {name:"Jane",course:"ICT", mark:67},
  {name:"Imran",course:"BACB", mark:42},
  {name:"Zofia",course:"BAIM", mark:72},
  {name:"Bill",course:"BAIM", mark:39}
]

function getShowMsgFnc(student){
  return function(){
		console.log(student.name+" has a mark of "+student.mark); //this works
	}
}

const studentsFragment = document.createDocumentFragment(); //create a fragment
students.forEach(function(student){
  const newLi=document.createElement("li"); //create a new <li>
  newLi.textContent=student.name; //add the student's name
  newLi.addEventListener("click",getShowMsgFnc(student),false); // add an event listener
  studentsFragment.appendChild(newLi); //insert into the <ul> element
})

const stuList=document.querySelector("#stu-list"); //get hold of a <ul> element
stuList.appendChild(studentsFragment);
```

Now instead of attaching an event listener function directly we call *getShowMsgFnc* and pass the current student as an argument to this function. The returned function closes around this value so it can access the specific student when the list element is clicked. For more info on closures see https://github.com/CHT2531/functional-programming/blob/master/notes.md#closures.

### Storing Data in the Browser
There are a number of options for storing data via the browser:

* Cookies
  - Limited storage capacity
  - Clunky to get data in and out


* IndexedDB  
  - https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API  
  - A NoSQL DB for browsers
  - For storing large amounts of complex data


* Web Storage
  - Good browser support
  - Simple API
  - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  
  - It does have limitations - https://hacks.mozilla.org/2012/03/there-is-no-simple-solution-for-local-storage/  

#### Web Storage

There are two type of storage
* **sessionStorage** - data is deleted when the browser window is closed
* **localStorage** - data persists even when the browser window is closed

To save data in web storage we simply use
```javascript
localStorage.setItem("key","value");
```
To retrieve a value from web storage
```javascript
localStorage.getItem("value");
```

* It works exactly the same with **sessionStorage**.
* We can use developer tools and the 'Application' tab to see the data in web storage.
* We can only store basic data types - strings, numbers, boolean values.
* Often we want to store more complex data structure e.g. arrays or objects.  
  * To do this we can use JSON
      - To store data use **JSON.stringify()** - convert the object into a string
      - To retrieve data we use **JSON.parse()** - convert the string back into objects.

Here's an example:

```javascript
const films=[
  {title:"Jaws", year:1975, duration:124},
  {title:"Get Out", year:2017, duration:117},
  {title:"Winter's Bone", year:2010, duration:100},
  {title:"The Incredibles", year:2004, duration:115},
]

const filmsJson=JSON.stringify(films); //convert array into JSON
sessionStorage.setItem("films", filmsJson); //store data in web storage

//later on retrieve items from sessionStorage
films=JSON.parse(sessionStorage.getItem('films')); //convert JSON into array
console.log(films[0].title); //outputs Jaws
```
#### Web Storage - Use cases
* Navigation (maintaining state between different pages)
  * The user selects an item on page 1
  * Store the id in web storage
  * User navigates to page 2
  * Retrieve the id from web storage
  * Use the id  to retrieve full details for the item


* Favourites
  - The user selects favourite items
  - Favourites are stored in web storage e.g. as an array
  - Next time the user visits the app, it remembers their favourites

### The History API
Allows us to artificially manipulate the browser history:
* Useful for applications that really heavily on Ajax
* Single Page Apps (SPAs)
* See the following for full info
  - https://css-tricks.com/using-the-html5-history-api/  
  - https://developer.mozilla.org/en-US/docs/Web/API/History_API  


We can use **pushState** to artificially create a browser history entry

```javascript
history.pushState({"colour":"red"}, null, "red.html");
```
The arguments specify
1. Data (an object) to store as part of the history entry. This could be used to re-construct a page the user visited previously.
2. Title. At the moment browsers ignore this, we can too.
3. A URL to display in the browser window.


When the user hits the browser back button, a **popstate** event is triggered. We can listen for this and retrieve info about the history entry.

```javascript
history.pushState({"colour":"red"}, null, "red.html");

//the user hits the back button and popstate is triggered
function getHistoryInfo(evnt) {
  document.body.style.backgroundColor=(evnt.state.colour);//changes page to red
}

//listen for browser histroy events
window.addEventListener('popstate', getHistoryInfo, false);
```

## Application Architectures

### Multi-page Apps

#### Passing data using a query string
* Page 1
  - Use Ajax to load a list of items
  - Use the DOM to display items in the HTML page
  - User clicks on an item
  - Pass the id of the item in the querystring e.g. *page2.html?id=2*
  - Browser goes to page 2

* Page 2
  - Get the id from the query string
  - Using this id, use Ajax to load the full details for the item
  - Use the DOM to display the details for the user
  - See *passing-data-querystring* for a complete example

#### Passing data using web storage
* Page 1
  - Use Ajax to load a list of items
  - Use the DOM to display items in the HTML page
  - User clicks on an item
    - Put the item's details into web storage
    - Browser goes to page 2


* Page 2
  - Get the item's data from web storage
  - Use the DOM to display the details for the user
  - See *passing-data-web-storage* for a complete example

### Single Page App
* Use Ajax to load a list of items.
* User clicks on an item.
* Use the DOM to display the details for the item.
* Hide the HTML containing the list of items (page 1).
* Show the HTML containing the details for an item (page 2).
* Use the history API to store info about which pages the user has visited.

const listUl = document.querySelector('.student-list');
const listItems = document.querySelectorAll('.student-item');
const buttonLi = document.querySelectorAll('.pagination ul li');
const paginationDiv = document.querySelector('.page');
const studentsPerPage = 10;
let numberOfButton = Math.floor(listItems.length/studentsPerPage) + 1;
let itemsOnLastPage = (listItems.length % studentsPerPage);
const pageHeaderDiv = document.querySelector('.page-header');
const links = document.getElementsByTagName('a');

//Function to hide the name of studets

function hideEveryone( list ){
	for(let i = 0 ; i < list.length ; i++ ){
		list[i].style.display = "none";
	}
}
//Hiding the students initially
hideEveryone(listItems);

//Function to calculate number of students according to page number 
function groupList( studentList , pageNumber ){
	
	//If it's the first page
	if( pageNumber === 1){
		hideEveryone(listItems);
		for( let i = 0 ; i < studentsPerPage ; i++){
			studentList[i].style.display = 'block';
		}
	}
	//If it's the last page
	else if( pageNumber == numberOfButton){
		hideEveryone(listItems); 
		for( let i = (pageNumber-1)*studentsPerPage  ; i <= (pageNumber-1)*studentsPerPage + itemsOnLastPage-1; i++){
			studentList[i].style.display = 'block';
		}
	}

	else{
		hideEveryone(listItems); 
		for( let i = (pageNumber-1)*studentsPerPage  ; i <= (pageNumber*studentsPerPage)-1; i++){
			studentList[i].style.display = 'block';
		}
	}
}
//Calling the groupList function to show 10 students on the first page initially
groupList( listItems , 1);


//Function to calculate number of buttons required according to length
//of students list and then appending the buttons to html
function createButton(numberOfButton){
	let div = document.createElement('div');
	div.className = 'pagination';
	let ul = document.createElement('ul');
	div.appendChild(ul);
	// const numberOfButton = Math.floor(listItems.length/10) + 1;
	for( let i = 1 ; i <= numberOfButton; i++){
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.setAttribute('href' , '#');
		a.textContent = i;
		li.appendChild(a);
		ul.appendChild(li);

	}
	paginationDiv.appendChild(div);
}

createButton(6);


//Fucntion to add event listener to each link to go to specific pages and 
//display specific number of results

function linksToPages(){
	links[0].className = 'active';
	for(let i = 0 ; i < numberOfButton; i++){
		links[i].addEventListener('click' , (event) => {
			var current = document.getElementsByClassName("active");
			current[0].className = current[0].className.replace("active","");
			event.target.className = "active";
			groupList(listItems , event.target.textContent);

		});
	}
}

linksToPages();

//Inserting search bar element

function searchBox(){
	const div = document.createElement('div');
	div.className = 'student-search';
	const input = document.createElement('input');
	input.setAttribute('placeholder' , 'Search for students...');
	input.className = "Search-Input";
	const button = document.createElement('button');
	button.className = "Search";
	button.textContent = "Search";
	div.appendChild(input);
	div.appendChild(button);
	pageHeaderDiv.appendChild(div);
}
searchBox();

//Selecting 'button' element & 'input' element .
const searchButton = document.getElementsByClassName('Search')[0];
const searchInput = document.getElementsByClassName('Search-Input')[0];
//Selecting 'h3' elements consisting of names of students.
const studentNameList = document.getElementsByTagName('h3');
//Creating a new list item to display "message" when no elements matches
var lis = document.createElement('li');
lis.className = "random-list";
lis.textContent = "No elements have been found!";
listUl.appendChild(lis);
const randomList = document.querySelector('.random-list');
//Hiding the newly created list item initially
randomList.style.display = "none";


//Adding event listener to the 'Search' Button.
searchButton.addEventListener('click' , () => {
	//Checking if the value of input is "empty" or not
	for( let i = 0 ; i < numberOfButton ; i++){
		links[i].style.display = 'none';
	}

	if( searchInput.value !== ""){
		var counter = 0;
		var filter = searchInput.value;
		for(let i = 0 ; i < studentNameList.length ; i++){
			let studentName = studentNameList[i];
			if(studentName.textContent.indexOf(filter) > -1){
				studentNameList[i].parentNode.parentNode.style.display = 'block';
				counter += 1;
				randomList.style.display = "none";
			}
			else{
				studentNameList[i].parentNode.parentNode.style.display = 'none';
			}
		}

		if( counter == 0 ){
			randomList.style.display = "block";
		}
	}

	//If the value of 'input' is empty , show the first page of student list
	else{
		randomList.style.display = "none";
		groupList( listItems , 1);
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace("active","");
		links[0].className = 'active';

	}

	var buttonCount = Math.floor(counter/10+1);
	for( let i = 1 ; i <= buttonCount ; i++){

		links[i].style.display = "block";
	}

});





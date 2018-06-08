const listUl = document.querySelector('.student-list');
const listItems = document.querySelectorAll('.student-item');
const buttonLi = document.querySelectorAll('.pagination ul li');
const paginationDiv = document.querySelector('.page');
const studentsPerPage = 10;
const numberOfButton = Math.floor(listItems.length/studentsPerPage) + 1;
let itemsOnLastPage = (listItems.length % studentsPerPage);
const pageHeaderDiv = document.querySelector('.page-header');




//Function to hide the name of studets
function hideEveryone( list ){
	for(let i = 0 ; i < list.length ; i++ ){
		list[i].style.display = "none";
	}
}
//Hiding the students initially
hideEveryone(listItems);

//Function to calculate number of students as per page 
function groupList( studentList , pageNumber ){
	
	if( pageNumber === 1){
		hideEveryone(listItems);
		for( let i = 0 ; i < studentsPerPage ; i++){
			studentList[i].style.display = 'block';
		}
	}

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



// groupList( listItems , 1);


//Function to calculate number of buttons required according to length
//of students list and then appending the buttons to html
function createButton(listItems){
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

createButton(listItems);


//Fucntion to add event listener to each link to go to specific pages and 
//display specific number of results

function linksToPages(){
	const links = document.getElementsByTagName('a');
	for(let i = 0 ; i < numberOfButton ; i++){
		links[i].addEventListener('click' , (event) => {
			groupList(listItems , event.target.textContent);
		});
	}
}

linksToPages();



//Inserting search bar

function searchBox(){
	const div = document.createElement('div');
	div.className = 'student-search';
	const input = document.createElement('input');
	input.setAttribute('placeholder' , 'Search for students...');
	const button = document.createElement('button');
	button.textContent = "Search";
	div.appendChild(input);
	div.appendChild(button);
	pageHeaderDiv.appendChild(div);
}

searchBox();

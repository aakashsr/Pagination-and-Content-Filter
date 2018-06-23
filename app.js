const listUl = document.querySelector('.student-list');
const listItems = document.querySelectorAll('.student-item');
const buttonLi = document.querySelectorAll('.pagination ul li');
const paginationDiv = document.querySelector('.page');
const studentsPerPage = 10;
const pageHeaderDiv = document.querySelector('.page-header');
const paginationLinksDiv = document.querySelector('.paginationLinksDiv');
const initialListLength =  Math.floor(listItems.length/studentsPerPage) + 1;

//Function to hide individual students
function hideEveryone( list ){
	for(let i = 0 ; i < list.length ; i++ ){
		list[i].style.display = "none";
	}
}

//Hiding the students initially
hideEveryone(listItems);

//Function to calculate number of students according to page number 
function groupList( studentList , pageNumber ){
	var numberOfButton = Math.floor(studentList.length/studentsPerPage) + 1;
	let itemsOnLastPage = (studentList.length % studentsPerPage);

	//Checking if the length of studentList is lower or greater than "studentsPerPage".
	//If greater , then run the for loop upto value of "studentsPerPage" i.e 10 
	if( studentList.length > studentsPerPage){
		//If it's the first page
		if( pageNumber == 1){
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
		//If it's the any other page
		else{
			hideEveryone(listItems); 
			for( let i = (pageNumber-1)*studentsPerPage  ; i <= (pageNumber*studentsPerPage)-1; i++){
				studentList[i].style.display = 'block';
			}
		}
	}
	//Otherwise run the loop upto the length of studentList as it is lower than the 
	//value of studentsPerPage . For ex: When we search students ,say "phil" , there will
	//be only 2 results . So we will let the loop run upto "studentList.length" ,which is 2.
	else{
		if( pageNumber == 1){
			hideEveryone(listItems);
			for( let i = 0 ; i < studentList.length ; i++){
				studentList[i].style.display = 'block';
			}
		}
	}


}
//Calling the groupList function to show 10 students on the first page initially
groupList( listItems , 1);


//Function to calculate number of buttons required according to length
//of students list and then appending the buttons to html
//Giving "numberOfButton" as parameter to create the buttons dynamically
function createButton(numberOfButton){
	let div = document.createElement('div');
	div.className = 'pagination';
	let ul = document.createElement('ul');
	div.appendChild(ul);
	for( let i = 1 ; i <= numberOfButton; i++){
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.setAttribute('href' , '#');
		a.textContent = i;
		li.appendChild(a);
		ul.appendChild(li);

	}
	paginationLinksDiv.appendChild(div);
}

//Initially creating number of buttons as per the length of studentList
createButton(initialListLength);


//Function to add event listener to each link to go to specific pages and 
//display specific number of results

//Giving "studentList" as parameter to get the number of buttons dynamically , because
//every time you search for students , buttons will be created dynamically and you have to 
//provide functionality to each button 
function linksToPages(studentList){
	if(studentList.length > 10){
		var aLinks = document.getElementsByTagName('a');
		console.log(aLinks);
		var numberOfButton = Math.floor(studentList.length/studentsPerPage) + 1;
		aLinks[0].className = 'active';
		for(let i = 0 ; i < numberOfButton; i++){
			aLinks[i].addEventListener('click' , (event) => {
			//Giving the 'active' class only to the button corresponding to currently opened page 
			var current = document.getElementsByClassName("active");
			current[0].className = current[0].className.replace("active","");
			event.target.className = "active";
			groupList(studentList , event.target.textContent);
		});

		}
	}
}

linksToPages(listItems);

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
//Selecting 'h3' elements consisting names of students.
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
	//Making paginationLinksDiv "empty" when user click on serch button to prevent the 
	//buttons from creating everytime user clicks on "search" button
	paginationLinksDiv.innerHTML = "";

	var newStudentList = [];
	if( searchInput.value !== ""){
		var filter = searchInput.value;
		for(let i = 0 ; i < studentNameList.length ; i++){
			let studentName = studentNameList[i];
			if(studentName.textContent.indexOf(filter) > -1){
				studentNameList[i].parentNode.parentNode.style.display = 'block';
				//Adding the matched students to the newly created array
				newStudentList.push(studentNameList[i].parentNode.parentNode);
				//Hiding the newly created list item when "searchInput.value" matches any of the name of students
				randomList.style.display = "none";
			}
			else{
				studentNameList[i].parentNode.parentNode.style.display = 'none';
			}
		}

		if( newStudentList.length == 0){
			//Showing the newly created list item with message "No elements have been found!" 
			//when no element matches with "searchInput.value"
			randomList.style.display = "block";
		}
	}

	//If the value of 'input' is empty , show the first page of student list
	else{
		randomList.style.display = "none";
		groupList( listItems , 1);
		//As you have set the "textContent" of paginationLinksDiv to 'empty' , you have to call "createButton" function to show buttons
		createButton(initialListLength);
		//Now , you have to call "linkToPages" function to add functionality to these newly created buttons
		linksToPages(listItems);
	}

	//Always showing the first page of students list when "searchInput.value" matches the names of students lists.
	//Run these functions only , when there is atleast one element within the "newStudentList" , otherwise above "else" condition will rule.
	if( newStudentList.length > 1 ){
		groupList(newStudentList , 1);
		// //Creating random links on the basis of length of students list
		createRandomLinks(newStudentList.length);
		// //Adding the functionality to the newly created links
		linksToPages(newStudentList);
	}

});

//Function to create random links on the basis of length of students list
function createRandomLinks(listItemsNumber){
	//When listItemsNumber < studentsPerPage , no button will be created
	if( listItemsNumber < studentsPerPage){
		var buttonCount = Math.floor(listItemsNumber/10);
	}
	else{
		var buttonCount = Math.floor(listItemsNumber/10+1);
	}
	createButton(buttonCount);
}





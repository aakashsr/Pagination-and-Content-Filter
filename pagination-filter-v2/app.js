const listUl = document.querySelector('.student-list');
const listItems = document.querySelectorAll('.student-item');
const buttonLi = document.querySelectorAll('.pagination ul li');
const paginationDiv = document.querySelector('.page');
const numberOfButton = Math.floor(listItems.length/10) + 1;
console.log(numberOfButton);
let itemsOnLastPage = (listItems.length % 10);
console.log(itemsOnLastPage);

//Function to calculate number of students as per page 
function hideEveryone( list ){
	for(let i = 0 ; i < list.length ; i++ ){
		list[i].style.display = "none";
	}
}

hideEveryone(listItems);

function groupList( studentList , pageNumber ){
	// let lastPage = Math.floor(studentList.length/10) + 1;
	if( pageNumber === 1){
		hideEveryone(listItems);
		for( let i = pageNumber ; i <= 10 ; i++){
			studentList[i].style.display = 'block';
		}
	}

	else if( pageNumber == numberOfButton){
		hideEveryone(listItems); 
		for( let i = (pageNumber-1)*10 + 1 ; i <= (pageNumber-1)*10+itemsOnLastPage; i++){
			studentList[i].style.display = 'block';
		}
	}

	else{
		hideEveryone(listItems); 
		for( let i = (pageNumber-1)*10 + 1 ; i <= pageNumber*10; i++){
			studentList[i].style.display = 'block';
		}
	}
}

groupList( listItems , 1);



// groupList( listItems , 1);


//Function to calculate number of buttons required according to 
//then appending the buttons to htmllength of students list and 
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
			console.log(event.target.textContent);
		});
	}
}

linksToPages();

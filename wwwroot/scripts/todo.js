var storedDate;
var storedTodos = [];

function initTodo() {
	getTodoFromLocalStorage();
	initCalendarPicker();
}

function initCalendarPicker() {
	// Calendar picker: Format date and store date info in Todo
	$('#date_calendar').calendar({
		monthFirst: false,
		type: 'date',
		formatter: {
			date: function(date, settings) {
				date.setHours(0, 0, 0, 0);
				storedDate = date;
			}
		}
	});
}
//Function To Display Popup
function div_show() {
	document.getElementById('abc').style.display = 'block';
	//TODO: Skapa css klass för block
}
//Function to Hide Popup
function div_hide() {
	document.getElementById('abc').style.display = 'none';
	//TODO: Skapa css klass
}

//adds item to list
function addNewTodoItem(event) {
	event.preventDefault();

	//var li = document.createElement('li');
	var inputValue = document.getElementById('myInput').value;

	//TODO: kolla att datum är valt

	if (inputValue === '') {
		alert('You must write something!');
	} else {
		storeCreatedTodos(inputValue); //TODO--Denna ska lagra todo-datan
		renderTodos(storedTodos);
	}
	//Tömmer skrivfältet
	document.getElementById('myInput').value = '';
}

//Create editbutton for everylistitem
function createEditButton() {
	const span2 = document.createElement('span');
	span2.innerText = '\u{1F58B}';
	span2.addEventListener('click', () => editTodo());
	span2.classList.add('icon-span-edit-button');
	return span2;
}
	
//Create deletebutton for everylistitem
function createDeleteButton() {
	const span = document.createElement('span');
	span.innerText = '\u{1F5D1}';
	span.addEventListener('click', () => deleteTodo());
	span.classList.add('icon-span-delete-button');
	return span;
}

//Tömmer skrivfältet

function deleteTodo(todoItem) {
	storedTodos.splice(storedTodos.indexOf(todoItem), 1);
	updateLocalStorage();
	renderTodos(storedTodos);
	loadCalendar();

}

//TODO: ändra denna funktion så den uppdaterar rätt todo
//i arrayen för nu lägger den bara till nya toditems
function editTodo() {
	var edit = document.getElementsByClassName('icon-span-delete-button');
	var i;
	for (i = 0; i < edit.length; i++) {
		edit[i].onclick = div_show();
	}
}

// Lagra todos
function storeCreatedTodos(todoText) {
	var todoItem = { date: storedDate, text: todoText };
	storedTodos.push(todoItem);
	resetCalendar();
	loadCalendar();
	saveTodoToLocalStorage();
}

function updateLocalStorage() {
	localStorage.clear();
	saveTodoToLocalStorage();
}

function saveTodoToLocalStorage() {
	var stringifyTodos = JSON.stringify(storedTodos);
	localStorage.setItem('todos', stringifyTodos);
}

function getTodoFromLocalStorage() {
	var stringifyTodos = localStorage.getItem('todos');
	if(!stringifyTodos) {
		storedTodos = [];
	}
	else{
		storedTodos = JSON.parse(stringifyTodos);
		for (const todo of storedTodos) {
			todo.date = new Date(todo.date);
		}
		renderTodos(storedTodos);
	}
}

function renderTodos(todosToRender) {
	resetTodos();

	todosToRender.forEach(todoItem => {
		var li = document.createElement('li');
		li.classList.add('todo-list-item');
		li.innerText = todoItem.text;
		document.getElementById('todoList').appendChild(li);
		li.append(createEditButton());
		li.append(createDeleteButton());
	});
}

function resetTodos() {
    document
      .querySelectorAll('.todo-list-item')
      .forEach((e) => e.parentNode.removeChild(e));
}

/**
 * 
 * @param {Date} selectedDate 
 * @returns {Array}
 */
function loadTodos(selectedDate) {
	let tempTodos = [];
	console.log(storedTodos);
	for (item of storedTodos) {
		if (item.date.valueOf() == selectedDate.valueOf()) {
			tempTodos.push(item);
		}
	}
	return tempTodos;
}

function appendSelectedDateInfo(selectedDate) {
	var li = document.createElement('li');
	li.classList.add('todo-list-item');
	li.innerText = 'Todos för: \n' + selectedDate.toLocaleDateString();
	document.getElementById('todoList').insertBefore(li, document.getElementById('todoList').firstChild);
	li.append(createResetButton());
}

//Create deletebutton for everylistitem
function createResetButton() {
	const span = document.createElement('span');
	span.innerText = '\u{2716}';
	span.addEventListener('click', () => renderTodos(storedTodos));
	span.classList.add('icon-span-delete-button');
	return span;
}
const taskInput = document.getElementById("newTask");
const addButton = document.getElementById("button-input");
const incomplete = document.getElementById("incomplete-tasks"); 
const complete = document.getElementById("completed-tasks");


addButton.addEventListener("click", addList);

//New task list item
function createList(taskString) {

	const listItem = document.createElement("li");

	const label = document.createElement("label");
	label.className = "item";
	listItem.appendChild(label);

	const editInput = document.createElement("input");
	editInput.type = "text";
	listItem.appendChild(editInput);
	
	const deleteButton = document.createElement("button");
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add("delete");
	listItem.appendChild(deleteButton);

	const editButton = document.createElement("button");
	editButton.innerHTML = '<i class="fas fa-pen"></i>';
	editButton.classList.add("edit");
	listItem.appendChild(editButton);
	
	const doneButton = document.createElement("button");
	doneButton.innerHTML = '<i class="fas fa-check"></i>';
	doneButton.classList.add("done");
	listItem.appendChild(doneButton);

	label.innerText = taskString;
	return listItem;
}

function addList() {
	
	if (document.getElementById("newTask").value == "") {
		var erro = document.getElementById("messageError").innerHTML = "Please fill in the field";
		return erro;
	} else {
		//Create a new list item with the text from the #newTask:
		const listItem = createList(taskInput.value);
		//Append listItem to incomplete
		incomplete.appendChild(listItem);
		eventsTask(listItem, tasksCompleted);
		taskInput.value = "";
	}
	return document.getElementById("messageError").innerHTML = " ";
}

//Edit an existing task.
function editTask() {

	const listItem = this.parentNode;

	const editInput = listItem.querySelector('input[type=text]');
	const label = listItem.querySelector("label");
	const containsClass = listItem.classList.contains("editMode");
	const editButton = listItem.querySelector("button.edit");
	const doneButton = listItem.querySelector("button.done");

	//change pen icon for save icon and vice-versa
	if (editButton.innerHTML.toLowerCase() == '<i class="fas fa-pen"></i>') {
		editButton.innerHTML = '<i class="fas fa-save"></i>';
		doneButton.style.visibility='hidden';
		doneButton.style.display="none";
	} else {
		editButton.innerHTML = '<i class="fas fa-pen"></i>';
		doneButton.style.visibility='visible';
		doneButton.style.display="inline-block";
	}

	if (containsClass) {
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}

	//toggle .editmode on the parent.
	listItem.classList.toggle("editMode");
}

//Delete task.
function deleteTask() {
	
	const listItem = this.parentNode;
	const ul = listItem.parentNode;
	//Remove the parent list item from the ul.
	ul.removeChild(listItem);	
}

//Mark task completed
function tasksCompleted() {
	//list the incomplete items
	for (var i = 0; i < complete.children.length; i++) {
		//bind events to list items chldren(tasksIncompleted)		
		eventsTask(complete.children[i], taskIncompleted);		
	}
	//Append the task list item to the #completed-tasks
	const listItem = this.parentNode;
	complete.appendChild(listItem);
	eventsTask(listItem, taskIncompleted);
}

function taskIncompleted() {
	//list the complete items
	for (var i = 0; i < incomplete.children.length; i++) {
		//bind events to list items chldren(tasksCompleted)
		eventsTask(incomplete.children[i], tasksCompleted);
	}
	const listItem = this.parentNode;
	incomplete.appendChild(listItem);
	eventsTask(listItem, tasksCompleted);
}

function eventsTask(taskListItem, doneEventButton) {
	//select ListItems children
	const doneButton = taskListItem.querySelector("button.done");
	const editButton = taskListItem.querySelector("button.edit");
	const deleteButton = taskListItem.querySelector("button.delete");

	//Bind editTask to edit button.
	editButton.onclick = editTask;
	//Bind deleteTask to delete button.
	deleteButton.onclick = deleteTask;
	//Bind tasksCompleted to doneEventButton.
	doneButton.onclick = doneEventButton;
}

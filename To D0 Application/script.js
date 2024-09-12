let todoitems = document.getElementById("todoitems");
let addtodobutton = document.getElementById("addtodobutton");
let savetodobutton = document.getElementById("savetodobutton");



function gettodofrontodolist(){
  let stringfiedtodo = localStorage.getItem("todolist");
  let parsedtodo = JSON.parse(stringfiedtodo);
  if (parsedtodo===null){
    return [];
  }else{
    return parsedtodo;
  }
}
let todolist = gettodofrontodolist();


function onTodoStatusChange(checkboxId, labelId,todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelelement = document.getElementById(labelId);

  labelelement.classList.toggle('checked');
  let todoobjindex  = todolist.findIndex(function(eachtodo){
    let eachtodoid = "todo" + eachtodo.UniqueNo;
    if(eachtodoid===todoId){
      return true;
    }else{
       return false
    }
  });
  let todoobj = todolist[todoobjindex];
  if(todoobj.isChecked === true){
    todoobj.isChecked=false;
  }else{
    todoobj.isChecked=true;
  }
};

function ondeletetodo(todoId) {
  let todoelement = document.getElementById(todoId);

  todoitems.removeChild(todoelement);
  // console.log(todolist);
  let deleteindex = todolist.findIndex(function(eachtodo){
  let eachtodoid="todo"+ eachtodo.UniqueNo;
  // console.log(eachtodoid,todoId);
    if(eachtodoid === todoId){
      return  true;
    }else{
      return false;
    }
  });
  todolist.splice(deleteindex,1);
  console.log(todolist)
};

function createAndAppendTodo(todo) {
  let todoId = 'todo' + todo.UniqueNo;
  let checkboxId = 'checkbox' + todo.UniqueNo;
  let labelId = 'label' + todo .UniqueNo;

  let todoelement = document.createElement("li");
  todoelement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoelement.id = todoId;
  todoitems.appendChild(todoelement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked=todo.isChecked;
  inputElement.onclick = function() {
    onTodoStatusChange(checkboxId, labelId,todoId);
  }

  inputElement.classList.add("checkbox-input");
  todoelement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoelement.appendChild(labelContainer);

  let labelelement = document.createElement("label");
  labelelement.setAttribute("for", checkboxId);
  labelelement.id = labelId;
  labelelement.classList.add("checkbox-label");
  labelelement.textContent = todo.text;

  if(todo.isChecked===true){
    labelelement.classList.add("checked")
  }
  labelContainer.appendChild(labelelement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    ondeletetodo(todoId);
  };

  deleteIconContainer.appendChild(deleteIcon);
};

for (let todo of todolist) {
  createAndAppendTodo(todo);
};

function onAddTodo() {
// console.log(todolist);
let todoscount = todolist.length;
  let userinput = document.getElementById("todouserinput");
  let userinputvalue = userinput.value;

  if(userinputvalue === ""){
    alert("Enter Valid Text");
    return;
  }

  todoscount = todoscount + 1;

  let newtodo = {
    text: userinputvalue,
    UniqueNo: todoscount,
    isChecked:false
  };
  todolist.push(newtodo);
  createAndAppendTodo(newtodo);
  userinput.value = "";
  
};

addtodobutton.onclick = function(){
  onAddTodo();
};
savetodobutton.onclick=function(){
  localStorage.setItem("todolist",JSON.stringify(todolist));
  console.log(todolist)
};


// let myarray= [10,40,50,120,5];
// let nbrindex = myarray.findIndex(function(item){
//   if (item === 50){
//     return true;
//   }else{
//     return false;
//   }
// });
// console.log(nbrindex);
// console.log(myarray);

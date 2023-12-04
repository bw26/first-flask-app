function addProperties(new_item) {
  var text = document.createElement("input");
  text.type = "text";
  new_item.appendChild(text);
  var edit = document.createElement("button");
  edit.innerHTML = "Edit";
  edit.setAttribute("onclick", "editTask(this)");
  edit.className = "edit";
  new_item.appendChild(edit);
  var del = document.createElement("button");
  del.innerHTML = "Delete";
  del.setAttribute("onclick", "deleteTask(this)");
  del.className = "delete";
  new_item.appendChild(del);
  return new_item;
}

function addTask() {
  var taskInput = document.getElementById("new-task");
  if (taskInput.value.trim() != "") {
    var list = document.getElementById("incomplete-tasks");

    var new_item = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = "";
    checkbox.setAttribute("onclick", "isBoxChecked(this)");
    new_item.appendChild(checkbox);
    var label = document.createElement("label");
    label.innerHTML = taskInput.value;
    new_item.appendChild(label);
    new_item = addProperties(new_item);

    list.appendChild(new_item);
    taskInput.value = "";
  }
}

function isBoxChecked(element) {
  if (element.checked == true) {
    deleteTask(element);
    var completed = document.getElementById("completed-tasks");
    var new_item = document.createElement("li");
    var label = document.createElement("label");
    label.innerHTML =
      element.parentNode.getElementsByTagName("label")[0].innerHTML;
    new_item.appendChild(label);
    new_item = addProperties(new_item);

    completed.appendChild(new_item);
  }
}

function editTask(element) {
  var input = prompt("Edit your entry");
  var entry = element.parentNode.getElementsByTagName("label")[0];
  entry.innerHTML = input;
}

function deleteTask(element) {
  var list = element.parentNode.parentNode;
  var li = element.parentNode;
  list.removeChild(li);
}

function markAllTasksDone() {
  var current_tasks = document.querySelectorAll("#incomplete-tasks li");
  var completed = document.getElementById("completed-tasks");
  Array.from(current_tasks).forEach((listItem) => {
    listItem.parentNode.removeChild(listItem);
    var new_item = document.createElement("li");
    var label = document.createElement("label");
    label.innerHTML = listItem.getElementsByTagName("label")[0].innerHTML;
    new_item.appendChild(label);
    new_item = addProperties(new_item);

    completed.appendChild(new_item);
  });
}
function clearAllTasks() {
  var incompleted = document.querySelectorAll("#incomplete-tasks li");
  Array.from(incompleted).forEach((listItem) => {
    listItem.parentNode.removeChild(listItem);
  });
  var completed = document.querySelectorAll("#completed-tasks li");
  Array.from(completed).forEach((listItem) => {
    listItem.parentNode.removeChild(listItem);
  });
}

// Login Validation
function validate() {
  var username = document.getElementById("user_name").value;
  var password = document.getElementById("password").value;

  fetch("static/passwords.txt")
    .then((res) => res.text())
    .then((text) => {
      var creds = text.split("\n");
      var notFound = true;
      creds.forEach((line) => {
        var cred = line.split(",");
        if (username == cred[0].trim() && password == cred[1].trim()) {
          console.log(username);
          console.log(cred[0].trim());
          console.log(password);
          console.log(cred[1].trim());
          window.location = "home";
          notFound = false;
          return;
        }
      });
      if (notFound) alert("Incorrect Login Credentials.");
      document.getElementById("user_name").value = ""
      document.getElementById("password").value = ""
    })
    .catch((e) => console.error(e));
}

function logout(){
  window.location = "login";
}

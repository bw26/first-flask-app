/*
  Add Task:
  Event Listener for 'Add' Button
  Sends a POST request to API to insert new row into incomplete table in MySQL database.
*/
function addTask() {
  const url = "http://127.0.0.1:5000/api/incomplete";
  var taskInput = document.getElementById("new-task");
  if (taskInput.value.trim() != "") {
    var properties = taskInput.value.split(",");
    if(properties.length < 6){
      alert("Incorrect Input Format")
      return;
    }
    var task_name = properties[0].trim();
    var date_created = properties[1].trim();
    var date_completed = properties[2].trim();
    var completion_status = properties[3].trim();
    var priority = properties[4].trim();
    var time_to_complete = properties[5].trim();
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "task_name": task_name,
        "date_created": date_created,
        "date_completed": date_completed,
        "completion_status": completion_status,
        "priority": priority,
        "time_to_complete": time_to_complete
      })
    })
      .then(response => {
        if(!response.ok){
          alert("Unable to Add Task")
        }
        else window.location = "home"
      })
  }
}

/*
  Check if checkbox is checked:
  Event Listener for Checkboxes
  If box is checked, send a DELETE request to API to remove row from incomplete table and 
  a POST request to insert new row into complete table in MySQL database.
*/
function isBoxChecked(element) {
  console.log("HI")
  if (element.checked == true) {
    const url = "http://127.0.0.1:5000/api/complete";
    var row = element.parentNode.parentNode;
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "taskid" : row.cells[1].innerHTML,
        "task_name": row.cells[2].innerHTML,
        "date_created": row.cells[3].innerHTML,
        "date_completed": row.cells[4].innerHTML,
        "completion_status": row.cells[5].innerHTML,
        "priority": row.cells[6].innerHTML,
        "time_to_complete": row.cells[7].innerHTML
      })
    })
      .then(response => {
        if(!response.ok){
          alert("Unable to Move Task to Completed")
        }
        else {
          deleteTask(element);
          window.location = "home"
        }
      })
  }
}

/*
  Edit Task:
  Event Listener for 'Edit' Button
  Sends a PUT request to API to update row in table in MySQL database.
*/
function editTask(element) {
  var input = prompt("Edit your entry");
  var entry = element.parentNode.getElementsByTagName("label")[0];
  entry.innerHTML = input;
}

/*
  Delete Task:
  Event Listener for 'Delete' Button
  Sends a DELETE request to API to remove row from table in MySQL database.
*/
function deleteTask(element) {
  var url;
  var table = element.parentNode.parentNode.parentNode.parentNode;
  console.log(table.id);//not getting table.id
  if(table.id === 'incomplete-tasks'){
    url = "http://127.0.0.1:5000/api/incomplete";
  }
  else if (table.id === 'completed-tasks'){
    url = "http://127.0.0.1:5000/api/complete";
  }
  var row = element.parentNode.parentNode;
  var taskid = row.cells[1].innerHTML
  console.log(taskid);
  fetch(url, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "taskid": taskid
    })
  })
    .then(response => {
      if(!response.ok){
        alert("Unable to Delete Task")
      }
      else window.location = "home"
    })
}

/*
  Mark All Task as Done:
  Event Listener for 'Mark All Done' Button
  Sends a POST request to API to add all rows in incomplete table to complete table,
  and clear incomplete table in MySQL database.
*/
function markAllTasksDone() {
  const url = "http://127.0.0.1:5000/api/complete";
  var table = document.getElementById("incomplete-tasks")
  var rows = table.rows;

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i]
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "taskid" : row.cells[1].innerHTML,
        "task_name": row.cells[2].innerHTML,
        "date_created": row.cells[3].innerHTML,
        "date_completed": row.cells[4].innerHTML,
        "completion_status": row.cells[5].innerHTML,
        "priority": row.cells[6].innerHTML,
        "time_to_complete": row.cells[7].innerHTML
      })
    })
      .then(response => {
        if(!response.ok){
          alert("Unable to Move Task to Completed")
          return;
        }
      })
  }
  const incomplete_url = "http://127.0.0.1:5000/api/incomplete/clear";
  fetch(incomplete_url, {
    method: "POST"
  })
    .then(response => {
      if(!response.ok){
        alert("Unable to Move Task to Completed")
        return;
      }
      window.location = "home"
    })
}

/*
  Clear All Task:
  Event Listener for 'Clear' Button
  Sends a request to API to clear incomplete and complete tables in MySQL database.
*/
function clearAllTasks() {
  const url = "http://127.0.0.1:5000/api/clear";
  fetch(url, {
    method: "POST"
  })
    .then(response => {
      if(!response.ok){
        alert("Unable to Clear Tasks")
      }
      else {
        window.location = "home"
      }
    })
}

/*
  Login Validation:
  Event Listener for 'Login' Button
  Sends a POST request to API to validate credentials in MySQL database.
*/
function validate() {
  const url = "http://127.0.0.1:5000/login";
  var username = document.getElementById("user_name");
  var password = document.getElementById("password");

  fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "username": username.value, 
                           "password": password.value })
  })
    .then(response => {
      if(!response.ok){
        alert("Invalid Login Credentials")
        username.value=""
        password.value=""
      }
      else window.location = "home"
    })
}

/*
  Log Out:
  Event Listener for 'Log Out' Button
  Sends a GET request to API to go back to Login page.
*/
function logout() {
  const export_url = "http://127.0.0.1:5000/api/export";
  fetch(export_url, {method: "GET"})
  const url = "http://127.0.0.1:5000/login";
  fetch(url, {method: "GET"})
  .then(response => {
    if(response.ok) window.location = "login"
  })
}

/*
  Toggle Dark Mode:
  Event Listener for 'Dark Mode' Button
  Changes page to dark mode
*/
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  document.getElementsByTagName("table").classList.toggle("dark-mode");
  document.getElementsByTagName("th").classList.toggle("dark-mode");
  document.getElementsByTagName("td").classList.toggle("dark-mode");
}

/*
  Import file:
  Event Listener for 'Import' Button
  Imports file into database
*/
function importFile() {
  const url = "http://127.0.0.1:5000/api/upload"
  var file = document.getElementById("uploadTaskFile").files[0];
  if (!file) {
    alert("Invalid File");
    return;
  }
  var formData = new FormData();
  formData.append('file', file);
  fetch(url, {
    method: 'POST',
    body: formData,
  })
  .then(response => {
      if(!response.ok){
        alert("Unable to Upload File")
      }
      else window.location = "home"
  })
  .catch(error => console.error('Fetch error:', error));
}

/* 
  Requests 
  some requests
*/
function getIncomplete() {
  const url = "http://127.0.0.1:5000/api/incomplete";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}
function getComplete() {
  const url = "http://127.0.0.1:5000/api/complete";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}

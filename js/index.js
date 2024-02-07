var addTaskForm = document.getElementById("addTask");
var allTask = document.getElementById("allTask");
var task = document.getElementsByClassName("task");


addTaskForm.addEventListener("submit", addNewTasks);
// addTaskForm.addEventListener("submit", (event) => { event.preventDefault() });


function insert_into_dom(myObject){
   var listHtml = "";
   for (let index = 0; index < myObject.length; index++) {
      listHtml += 
      `
         <section class="task">
            <p>${myObject[index].body}</p>

            <span class="buttons">
               <span class="firstButtons edit" onclick='editOrUpdate(${myObject[index].id}, ${index})'>Edit</span>
               <span class="secondButtons delete" onclick='deleteOrCancel(${myObject[index].id}, ${index})'>Delete</span>
            </span>
         </section>
      `;
   }
   
   allTask.innerHTML = listHtml
}


async function fetch_all_data(){
   var result = await fetch(`./scripts/async.php?action=todoAll`);
   var request = await result.json();
   
   insert_into_dom(request);
}

fetch_all_data();


async function addNewTasks(event) {
   event.preventDefault();

   var inputValue = addTaskForm.firstElementChild.value;

   if (inputValue != "") {
      var result = await fetch(`./scripts/async.php?action=todoAdd&text=${inputValue}`);
      // var req = await result.json();

      addTaskForm.firstElementChild.value = "";
      fetch_all_data();
   } 
}


async function editOrUpdate(db_id, dom_index){

   var buttonText = task[dom_index].lastElementChild.firstElementChild.textContent;

   if(buttonText == "Edit"){
      var inputText = task[dom_index].firstElementChild.textContent;
      var taskEdit = 
      `
         <input type="text" value="${inputText}">

         <span class="buttons">
            <span class="firstButtons update" onclick='editOrUpdate(${db_id}, ${dom_index})' >Update</span>
            <span class="secondButtons cancel" onclick='deleteOrCancel(${db_id}, ${dom_index})' >Cancel</span>
         </span>
      `;
   }

   if(buttonText == "Update"){
      var inputValue = task[dom_index].firstElementChild.value;

      var result = await fetch(`./scripts/async.php?action=todoUpdate&text=${inputValue}&id=${db_id}`);
      // var req = await result.json();

      var taskEdit = 
      `
         <p>${inputValue}</p>

         <span class="buttons">
            <span class="firstButtons edit" onclick='editOrUpdate(${db_id}, ${dom_index})' >Edit</span>
            <span class="secondButtons delete" onclick='deleteOrCancel(${db_id}, ${dom_index})' >Delete</span>
         </span>
      `;
   }

   task[dom_index].innerHTML = taskEdit;
   
}


async function deleteOrCancel(db_id, dom_index){
   var buttonText = task[dom_index].lastElementChild.lastElementChild.textContent;

   if(buttonText == "Delete"){
      var result = await fetch(`./scripts/async.php?action=todoDelete&id=${db_id}`);

      fetch_all_data();
   }

   if(buttonText == "Cancel"){
      fetch_all_data();
   }


}

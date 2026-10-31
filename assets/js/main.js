let todoSec = document.getElementById("todos");
let database;
function getApi() {
  todoSec.innerHTML = "";
  fetch("https://6adda9db4e88f1bba4a48a73.mockapi.io/product")
    .then((res) => res.json())
    .then((res) => {
      database = res;
      console.log(res);
      res.forEach((item) => {
        todoSec.innerHTML += `
         <div class="task-group">
              <h3>Date: ${item.createdAt.split("T")[0]}</h3>

              <div class="task">
                <i class="fa-regular fa-circle"></i>

                <p>${item.todo}</p>
                <i onclick="getUpdate(${item.id})" class="fa-solid fa-pen"></i>
                <i onclick="getDelete(${item.id})" class="fa-solid fa-trash-can"></i>
              </div>

            </div>

        `;
      });
    });
}
getApi();

let getPost = document.getElementById("getPost");
let inp = document.getElementById("inp");
getPost.addEventListener("click", postSend);

function postSend() {
  fetch("https://6adda9db4e88f1bba4a48a73.mockapi.io/product", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ todo: inp.value, username: "Leyla" }),
  }).then(() => {
    getApi();
    inp.value = "";
  });
}

function getDelete(id) {
  fetch(`https://6adda9db4e88f1bba4a48a73.mockapi.io/product/${id}`, {
    method: "DELETE",
  }).then(() => {
    getApi();
    alert("ugurla silindi ");
  });
}

//CRUD -  Update 2 usulnan olur 1 -ci PATCH  2-ci PUT
let modal = document.getElementById("modal");
let form = document.getElementById("form");

function getUpdate(id) {
  console.log(id);
  modal.style.display = "block";
  let find = database.find((item) => item.id == id);
  console.log(find.todo);

  form.innerHTML = `
              <input id="updateInput" type="text" value="${find.todo}">
                <button onclick="getTodoUpdate(${id})" id="update">Yadda saxla </button>
            
`;

  let updateInput = document.getElementById("updateInput");
  find.todo = updateInput.value;

}

function closeModal() {
  modal.style.display = "none";
}

function getTodoUpdate(id){
    
  fetch(`https://6adda9db4e88f1bba4a48a73.mockapi.io/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({todo:updateInput.value}),
  }).then(() =>{
    getApi();
    alert("melumat ugurla yenilendi")
    closeModal()
  })
}
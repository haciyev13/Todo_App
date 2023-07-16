let btnAdd = document.querySelector("#btnAddNewTask");
let btnClear = document.querySelector("#btnClear");

let gorevListesi = [
  { id: 1, gorevAdi: "Gorev 1", durum: "completed" },
  { id: 2, gorevAdi: "Gorev 2", durum: "pending" },
  { id: 3, gorevAdi: "Gorev 3", durum: "completed" },
  { id: 4, gorevAdi: "Gorev 4", durum: "pending" },
];
let editId;
let isEditTask = false;

let taskInput = document.querySelector("#txtTaskName");

displayTask();
function displayTask() {
  let ul = document.getElementById("task-list");
  ul.innerHTML = "";

  if (gorevListesi.length == 0) {
    ul.innerHTML = "<p class='p-3 m-0'>Gorev listeniz bos</p>";
  } else {
    for (let gorev of gorevListesi) {
      let completed = (gorevListesi.durum = "completed" ? "checked" : "");
      let li = `
            <li class="task list-group-item" style="display:flex; justify-content: space-between; align-items: center;"> 
                <div class="form-check">
                    <input type="checkbox" name="" id="${gorev.id} ${completed}" class="form-check-input">
                    <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
                </div>
                <div class="dropdown">
                      <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-ellipsis"></i>
                      </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Sil
                        </a>
                      </li>
                      <li>
                      <a onclick='editTask(${gorev.id},"${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Düzenle
                      </a>
                      </li>
                    </ul>
                   </div>
            </li>
        `;
      ul.insertAdjacentHTML("beforeend", li);
    }
  }
}

////////////////////////////////////////////////

btnAdd.addEventListener("click", newTask);
btnAdd.addEventListener("keypress", function () {
  if (e.key == "Enter") {
    document.getElementById("btnAddNewTask").click();
  }
});

/////////////////////////////////////////////////
btnClear.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click Remove");
});

function newTask(e) {
  if (taskInput.value == "") {
    alert("Bos Elave Ede Bilmersiz");
  } else {
    if (!isEditTask) {
      // elave etme
      gorevListesi.push({
        id: gorevListesi.length + 1,
        gorevAdi: taskInput.value,
      });
    } else {
      // guncelle
      for (let gorev of gorevListesi) {
        if (gorev.id == editId) {
          gorev.gorevAdi = taskInput.value;
        }
        isEditTask = false;
      }
    }

    taskInput.value = "";
  }

  displayTask();
  e.preventDefault();
}
/////////////////////////////////

function deleteTask(id) {
  let deleteId;
  // for (let index in gorevListesi) {
  //   if (gorevListesi[index].id == id) {
  //     deleteId = index;
  //   }
  // }
  deleteId = gorevListesi.findIndex(function (gorev) {
    return gorev.id == id;
  });
  gorevListesi.splice(deleteId, 1);
  displayTask();
}

////////////////////////////

function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskName;
  taskInput.focus();
  taskInput.classList.add("active");
}
///////////////////////////

btnClear.addEventListener("click", function () {
  gorevListesi.splice(0, gorevListesi.length);
  displayTask();
});

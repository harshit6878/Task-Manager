const update = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`;

const delete1 = `
<svg onclick="deleteEvent(event)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
`;

const addTask = (data)=>{
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    data.map((item, key) => {
        const node = document.createElement("tr");
        if (item.isChecked) {
            node.style.textDecoration = "line-through";
            node.style.backgroundColor = "lightgreen";
            node.style.opacity = 0.5;
        }
        node.innerHTML = `
            <td ><input onchange="handleCheckBox(event)" type="checkbox" ${
                item.isChecked && "checked"
            } ></td>
            <td>${key + 1}</td>
            <td style="display:none">${item.id}</td>
            <td>${item.name}</td>
            <td>${item.title}</td>
            <td>${item.category}</td>
            <td>${item.date}</td>
            <td>
            <div class="btn_container">
            <button onclick="modalClick(event)" class="btn btn-danger" id="update">
            ${update}
            </button>
            <button onclick="deleteEvent(event)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">${delete1}</button>
            </div>
            </td>
        `;
        tbody.appendChild(node);
    });
}



// adding new task
const handleAdd = (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const title = document.querySelector("#title").value;
    const option = document.querySelector("#category").value;
    const date = document.querySelector("#date").value;
    if (name === "" || title === "") {
        alert("Please fill all the fields");
        return;
    }
    if (option === "0") {
        alert("Please select a category");
        return;
    }
    if (date === "") {
        alert("Please select a date");
        return;
    }
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    const idTime = new Date().getTime();
    const todo = {
        isChecked: false,
        id: idTime,
        name,
        title,
        date: date,
        category: option,
    };
    const tbody = document.querySelector("tbody");
    const node = document.createElement("tr");
    node.innerHTML = `
        <td><input onchange="handleCheckBox(event)" type="checkbox"></td>
        <td>${data.length + 1}</td>
        <td style="display:none">${idTime}</td>
        <td >
        ${name}
        </td>
        <td>${title}</td>
        <td>${option}</td>
        <td>${date}</td>
        <td>
        <div class="btn_container">
        <button onclick="modalClick(event)" class="btn btn-danger" id="update">
        ${update}
        </button>
        <button onclick="deleteEvent(event)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        ${delete1}
        </button>
        </div>
        </td>
    `;
    
    localStorage.setItem("todo", JSON.stringify([...data, todo]));
    tbody.appendChild(node);
    document.querySelector("#name").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#category").value = "";
    document.querySelector("#date").value = "";
    if(data.length === 0){
        window.location.reload();
    }
};
// update the todo list
const handleModal = () => {
    const body = document.querySelector("body");
    body.style.overflow = "auto";
    const modal = document.querySelector("#modal");
    modal.style.display = "none";
};

const handleUpdate = () => {
    const id = document.querySelector("#id").value;
    const name2 = document.querySelector("#name2").value;
    const title2 = document.querySelector("#title2").value;
    const category2 = document.querySelector("#category2").value;
    const date2 = document.querySelector("#date2").value;
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    const findIndex = data.findIndex((item) => item.id === parseInt(id));
    console.log("date2 ",date2);
    data[findIndex] = {
        isChecked: false,
        id: data[findIndex].id,
        name: name2,
        title: title2,
        date: date2,
        category: category2,
    };
    console.log(data[findIndex]);
    localStorage.setItem("todo", JSON.stringify(data));

    window.location.reload();
};
const modalClick = (e) => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    const modal = document.querySelector("#modal");
    modal.style.display = "flex";
    const node = e.target.parentElement.parentElement.parentElement;
    console.log(node);
    const td = node.querySelectorAll("td");
    const id = td[2].innerHTML;
    const name = td[3].innerHTML;
    const title = td[4].innerHTML;
    const category = td[5].innerHTML;
    const date = td[6].innerHTML;
    console.log("date ",date);
    document.querySelector("#id").value = id;
    document.querySelector("#name2").value = name;
    document.querySelector("#title2").value = title;
    document.querySelector("#category2").value = category;
    document.querySelector("#date2").value = date;
};

// delete the list
const deleteEvent = (e) => {
    const node = e.target.parentElement.parentElement.parentElement;
    const td = node.querySelectorAll("td")[2];
    const id = td.innerHTML;
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    const newData = data.filter((item) => item.id !== parseInt(id));
    localStorage.setItem("todo", JSON.stringify(newData));
    window.location.reload();
};

// search in the list
const handleSearch = () => {
    const query = document.querySelector("#query").value;
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    const searchedItems = data.filter(
        (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.title.toLowerCase().includes(query.toLowerCase())
    );
    addTask(searchedItems);
};

//filter in the list
const handleFilter = () => {
    const option = document.querySelector("#cat").value;
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    if (option === "default") {
        addTask(data);
        return;
    }
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    let newData = data.filter((item) => item.category === option);

    addTask(newData);
};
// sort by date
const sortDate = () => {
    const date_cat = document.querySelector("#date_cat").value;
    console.log(date_cat);
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    let newData;
    if (date_cat === "0") {
        addTask(data);
        return;
    }

    if (date_cat === "asc") {
        newData = data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }
    if (date_cat === "desc") {
        newData = data.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    }
    addTask(newData);
};

//checkox
const handleCheckBox = (e) => {
    console.log(e.target.checked);
    const node = e.target.parentElement.parentElement;
    const td = node.querySelectorAll("td")[2].innerHTML;
    console.log(td);
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    const findIndex = data.findIndex((item) => item.id === parseInt(td));
    data[findIndex].isChecked = e.target.checked;
    localStorage.setItem("todo", JSON.stringify(data));
    if (e.target.checked) {
        node.style.textDecoration = "line-through";
        node.style.backgroundColor = "lightgreen";
        node.style.opacity = 0.5;
    } else {
        node.style.textDecoration = "none";
        node.style.backgroundColor = "white";
        node.style.opacity = 1;
    }
};

const handleSubmit2 = (e) => {
    e.preventDefault();
};

// on refresh fetch the list
window.addEventListener("load", () => {
    const data = JSON.parse(localStorage.getItem("todo")) || [];
    const todos = document.querySelector("#todos");
    if (data.length === 0) {
        todos.style.display = "none";
        return;
    } else {
        todos.style.display = "block";
    }
    addTask(data);
});

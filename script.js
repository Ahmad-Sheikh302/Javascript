document.addEventListener('DOMContentLoaded', () => {

    const displayList = document.getElementById('display');
    const addBtn = document.getElementById('add-btn');
    const showList = document.querySelector('#list ul');
   console.log("javascript is running")

    const list = JSON.parse(localStorage.getItem('tasks')) || [];

    addBtn.addEventListener('click', () => {
        const taskText = displayList.value.trim();
        if (taskText === "") return;

        const preList = {
            id: Date.now(),
            text: taskText
        };

        list.push(preList);
        displayList.value = "";
        saveTask();
        renderTask();
        
    });

    function renderTask() {
        showList.innerHTML = "";
        list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.text;

            const delBtn = document.createElement('button');
            delBtn.textContent = "DELETE";
            delBtn.setAttribute('data-id', item.id);

            delBtn.addEventListener('click', () => {
                deleteTask(item.id);
            });

            li.appendChild(delBtn);
            showList.appendChild(li);
        });
    }

    function deleteTask(id) {
        const index = list.findIndex(task => task.id === id);
        if (index !== -1) {
            list.splice(index, 1);
            saveTask();
            renderTask();
        }
    }

    function saveTask(){
        localStorage.setItem('tasks',JSON.stringify(list));
    }
    renderTask();
});
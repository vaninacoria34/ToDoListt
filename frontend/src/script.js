// Manejo de tareas
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskCategoryInput = document.getElementById('task-category');
const taskPriorityInput = document.getElementById('task-priority');
const taskStatusInput = document.getElementById('task-status');
const taskList = document.getElementById('task-list');

// Array para almacenar las tareas
let tasks = [];

// Escuchar el evento submit para agregar una tarea
if (taskForm) { // Verificar si estamos en la página que tiene el formulario de tareas
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Crear una nueva tarea con título, descripción, categoría, prioridad y estado
        const newTask = {
            title: taskTitleInput.value,
            description: taskDescInput.value,
            category: taskCategoryInput.value,
            priority: taskPriorityInput.value,
            status: taskStatusInput.value,
            completed: false
        };

        // Agregar la nueva tarea al array de tareas
        tasks.push(newTask);

        // Renderizar la lista de tareas actualizada
        renderTasks();

        // Limpiar el formulario después de agregar la tarea
        taskForm.reset();
    });
}

// Función para renderizar las tareas en el HTML
function renderTasks() {
    if (taskList) {
        taskList.innerHTML = ''; // Limpiamos la lista de tareas

        // Recorrer el array de tareas y mostrar cada una
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            // Mostrar el título, descripción, categoría, prioridad y estado de la tarea
            li.innerHTML = `
                <div>
                    <strong>${task.title}</strong> - ${task.description}
                    <span class="badge bg-${task.completed ? 'success' : 'warning'}">${task.completed ? 'Completada' : 'Pendiente'}</span>
                    <div>Categoría: ${task.category} - Prioridad: ${task.priority} - Estado: ${task.status}</div>
                </div>
                <div>
                    <button class="btn btn-success btn-sm me-2" onclick="toggleTask(${index})">${task.completed ? 'Reabrir' : 'Completar'}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Eliminar</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
}

// Función para alternar el estado de una tarea (completada/pendiente)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Función para eliminar una tarea por su índice
function deleteTask(index) {
    tasks.splice(index, 1); // Eliminar la tarea del array
    renderTasks(); // Volver a renderizar las tareas
}

// Cargar las categorías desde localStorage
function loadCategories() {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    const categoryList = document.querySelector('#sidebar ul');

    // Limpiar la lista de categorías
    if (categoryList) {
        categoryList.innerHTML = '';

        // Agregar las categorías almacenadas a la lista
        categories.forEach(function(category) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = category;
            categoryList.appendChild(li);
        });
    }
}

// Función para agregar una nueva categoría al formulario
function addCategoryToForm(category) {
    const categorySelect = document.getElementById('task-category');
    if (categorySelect) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    }
}

// Función para agregar un nuevo estado al formulario
function addStatusToForm(status) {
    const statusSelect = document.getElementById('task-status');
    if (statusSelect) {
        const option = document.createElement('option');
        option.value = status;
        option.textContent = status;
        statusSelect.appendChild(option);
    }
}

// Alternar el contraste y almacenar en localStorage
document.getElementById('toggle-contrast').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('icon-mode');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        localStorage.setItem('contrastMode', 'dark');  // Guardar estado en localStorage
    } else {
        icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        localStorage.setItem('contrastMode', 'light');  // Guardar estado en localStorage
    }
});

// Aplicar el estado de contraste almacenado al cargar la página
window.addEventListener('load', function() {
    const contrastMode = localStorage.getItem('contrastMode');
    if (contrastMode === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('icon-mode');
        if (icon) {
            icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        }
    }
});

// Validación para agregar categoría
if (document.getElementById('category-form')) {
    document.getElementById('category-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const newCategory = document.getElementById('new-category').value;

        if (newCategory.trim() === '') {
            alert("Por favor, escribe una categoría.");
            return;
        }

        // Agregar la categoría al formulario principal
        window.opener.addCategoryToForm(newCategory);

        // Mostrar mensaje de confirmación
        alert('Categoría agregada exitosamente');
        window.close();
    });
}

// Validación para agregar estado
if (document.getElementById('status-form')) {
    document.getElementById('status-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const newStatus = document.getElementById('new-status').value;

        if (newStatus.trim() === '') {
            alert("Por favor, escribe un estado.");
            return;
        }

        // Agregar el estado al formulario principal
        window.opener.addStatusToForm(newStatus);

        // Mostrar mensaje de confirmación
        alert('Estado agregado exitosamente');
        window.close();
    });
}
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskList = document.getElementById('task-list');

// Array para almacenar las tareas
let tasks = [];

// Variables para almacenar los filtros seleccionados
let selectedCategory = null;
let selectedPriority = null;

// Escuchar el evento submit para agregar una tarea
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Crear una nueva tarea con título, descripción, categoría y prioridad
    const newTask = {
        title: taskTitleInput.value,
        description: taskDescInput.value,
        category: document.getElementById('task-category').value, // Nueva categoría
        priority: document.getElementById('task-priority').value, // Nueva prioridad
        completed: false
    };

    // Agregar la nueva tarea al array de tareas
    tasks.push(newTask);
    
    // Renderizar la lista de tareas actualizada
    renderTasks();

    // Limpiar el formulario después de agregar la tarea
    taskForm.reset();
});

// Función para renderizar las tareas en el HTML
function renderTasks() {
    taskList.innerHTML = ''; // Limpiamos la lista de tareas
    
    // Recorrer el array de tareas y aplicar los filtros seleccionados
    tasks
        .filter(task => {
            // Si hay una categoría seleccionada, filtramos por ella
            if (selectedCategory && task.category !== selectedCategory) return false;
            
            // Si hay una prioridad seleccionada, filtramos por ella
            if (selectedPriority && task.priority !== selectedPriority) return false;

            return true; // De lo contrario, incluimos la tarea en la lista
        })
        .forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            // Mostrar el título, descripción, categoría, prioridad y estado de la tarea
            li.innerHTML = `
                <div>
                    <strong>${task.title}</strong> - ${task.description}
                    <span class="badge bg-${task.completed ? 'success' : 'warning'}">${task.completed ? 'Completada' : 'Pendiente'}</span>
                    <div>Categoría: ${task.category} - Prioridad: ${task.priority}</div>
                </div>
                <div>
                    <button class="btn btn-success btn-sm me-2" onclick="toggleTask(${index})">${task.completed ? 'Reabrir' : 'Completar'}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Eliminar</button>
                </div>
            `;
            taskList.appendChild(li);
        });
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

// Función para aplicar filtros al hacer clic en las categorías y prioridades de la barra lateral
document.querySelectorAll('#sidebar .list-group-item').forEach(item => {
    item.addEventListener('click', function() {
        const value = this.textContent.trim();

        // Verificar si es una categoría o una prioridad
        if (['Trabajo', 'Estudio', 'Personal'].includes(value)) {
            selectedCategory = value; // Aplicamos el filtro de categoría
        } else if (['Alta', 'Media', 'Baja'].includes(value)) {
            selectedPriority = value; // Aplicamos el filtro de prioridad
        }

        // Renderizamos las tareas filtradas
        renderTasks();
    });
});
// Seleccionar el botón de cambio de contraste
const toggleContrastBtn = document.getElementById('toggle-contrast');

// Escuchar el clic en el botón para alternar el modo oscuro
toggleContrastBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode'); // Alternar la clase 'dark-mode' en el cuerpo
});

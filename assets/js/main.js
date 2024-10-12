window.addEventListener('DOMContentLoaded', () => {
  const taskManager = new TaskManager('tasks-container');

  // Formulario para añadir tareas
  const taskForm = document.getElementById('task-form');
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = document.getElementById('task-date').value; // Capturamos la fecha seleccionada

    taskManager.add({ name: taskName, priority: taskPriority, date: taskDate });
    taskManager.render();

    taskForm.reset(); // Limpiar el formulario después de añadir la tarea
  });

  // Capturamos el cambio en el filtro de prioridad
  const filterForm = document.getElementById('task-filter');
  filterForm.addEventListener('change', (event) => {
    const selectedFilter = event.target.value;
    taskManager.setFilter(selectedFilter);
    taskManager.render();
  });

  taskManager.render();
});



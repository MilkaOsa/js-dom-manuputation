class TaskManager {
  constructor(containerId) {
    this.containerId = containerId;
    this.tasks = [];
    this.filter = 'all'; // El filtro por defecto sigue siendo 'all'
  }

  // El método add ahora también recibe la fecha
  add(taskData) {
    const { name, priority, date } = taskData;
    this.tasks.push({
      id: self.crypto.randomUUID(),
      name,
      priority,
      date, // Añadimos la fecha
      completed: false
    });
  }

  delete(id) {
    this.tasks = this.tasks.filter(task => task.id !== id && !task.completed);
  }

  toggleCompleted(id) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  setFilter(filter) {
    this.filter = filter;
  }

  buildTaskHTML(task) {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('id', task.id);
    taskNode.classList.add('list-group-item', 'd-flex', 'gap-1', 'align-items-baseline');

    const taskDate = new Date(task.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecemos la hora de hoy en 00:00:00

    // Si la tarea es de hoy, le damos fondo amarillo
    if (taskDate.getTime() === today.getTime()) {
      taskNode.style.backgroundColor = 'yellow';
    }

    // Si la fecha es pasada y la tarea no está completada, fondo rojo
    if (taskDate.getTime() < today.getTime() && !task.completed) {
      taskNode.style.backgroundColor = 'red';
    }

    if (task.completed) {
      taskNode.classList.add('completed');
    }

    const taskNameNode = document.createElement('div');
    taskNameNode.classList.add('me-auto');
    if (task.completed) {
      taskNameNode.classList.add('text-decoration-line-through');
    }
    taskNameNode.appendChild(document.createTextNode(`${task.name} - Due: ${task.date}`));
    taskNode.appendChild(taskNameNode);

    const taskActionsNode = document.createElement('div');
    taskActionsNode.classList.add('d-flex', 'gap-2');
    taskNode.appendChild(taskActionsNode);

    if (!task.completed) {
      const deleteTaskNode = document.createElement('i');
      deleteTaskNode.classList.add('fa', 'fa-trash-o', 'text-danger');
      deleteTaskNode.setAttribute('role', 'button');
      taskActionsNode.appendChild(deleteTaskNode);

      deleteTaskNode.addEventListener('click', () => {
        this.delete(task.id);
        this.render();
      });
    }

    const completeTaskNode = document.createElement('i');
    completeTaskNode.classList.add('fa', 'fa-check', 'text-success');
    completeTaskNode.setAttribute('role', 'button');
    taskActionsNode.appendChild(completeTaskNode);

    completeTaskNode.addEventListener('click', () => {
      this.toggleCompleted(task.id);
      this.render();
    });

    const priorityIcon = document.createElement('img');
    priorityIcon.src = `/assets/img/icons/priority/${task.priority.toLowerCase()}.svg`;
    priorityIcon.alt = task.priority;
    priorityIcon.classList.add('priority-icon');
    taskActionsNode.appendChild(priorityIcon);

    return taskNode;
  }

  render() {
    const container = document.getElementById(this.containerId);
    container.innerHTML = '';

    // Filtrar tareas según la prioridad seleccionada
    const filteredTasks = this.tasks.filter(task => {
      return this.filter === 'all' || task.priority === this.filter;
    });

    // Ordenar las tareas por fecha
    const sortedTasks = filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Renderizar las tareas ordenadas
    for (let i = 0; i < sortedTasks.length; i++) {
      const task = sortedTasks[i];
      container.appendChild(this.buildTaskHTML(task));
    }
  }
}






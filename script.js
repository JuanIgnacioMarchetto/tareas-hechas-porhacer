const tareaInput = document.getElementById('tarea-input');
const diaInput = document.getElementById('dia-input');
const numeroInput = document.getElementById('numero');
const colorInput = document.getElementById('color');
const contenedorDivs = document.getElementById('contenedor');
const botonCrear = document.getElementById('boton-crear');
const botonArcoiris = document.getElementById('boton-arcoiris');
const realizadasList = document.getElementById('realizadas-list');
const pendientesList = document.getElementById('pendientes-list');
const nav = document.querySelector('.nav');

function crearDivs() {
  const numero = parseInt(numeroInput.value);
  const color = colorInput.value;

  for (let i = 0; i < numero; i++) {
    const tarea = tareaInput.value;
    const dia = diaInput.value;

    const div = document.createElement('div');
    div.classList.add('task-card');
    div.style.backgroundColor = color;

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = tarea ? tarea : `Tarea ${i + 1}`;

    const taskDay = document.createElement('p');
    taskDay.textContent = dia ? `Día: ${dia}` : 'Día: No especificado';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      div.classList.add('deleted');
      updateNav();
    });

    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.classList.add('complete-button');
    completeButton.addEventListener('click', () => {
      div.classList.toggle('completed');
      updateNav();
    });

    div.appendChild(taskTitle);
    div.appendChild(taskDay);
    div.appendChild(deleteButton);
    div.appendChild(completeButton);

    contenedorDivs.appendChild(div);
  }

  if (numero.toString().startsWith('7')) {
    botonArcoiris.style.display = 'block';
  } else {
    botonArcoiris.style.display = 'none';
  }

  updateNav();
}

function pintarArcoiris() {
  const bloques = contenedorDivs.getElementsByClassName('task-card');
  const coloresArcoiris = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  let indiceColor = 0;

  for (let bloque of bloques) {
    bloque.style.backgroundColor = coloresArcoiris[indiceColor];
    indiceColor = (indiceColor + 1) % coloresArcoiris.length;
  }
}

function updateNav() {
  const completedTasks = contenedorDivs.getElementsByClassName('task-card completed');
  const pendingTasks = contenedorDivs.getElementsByClassName('task-card:not(.completed):not(.deleted)');

  realizadasList.innerHTML = '';
  pendientesList.innerHTML = '';

  for (let task of completedTasks) {
    const taskTitle = task.querySelector('h3').textContent;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${taskTitle}</span> <span>Realizada</span>`;
    realizadasList.appendChild(listItem);
  }

  for (let task of pendingTasks) {
    const taskTitle = task.querySelector('h3').textContent;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${taskTitle}</span> <span>Pendiente</span>`;
    pendientesList.appendChild(listItem);
  }

  if (completedTasks.length > 0 || pendingTasks.length > 0) {
    nav.classList.add('visible');
  } else {
    nav.classList.remove('visible');
  }
}

botonCrear.addEventListener('click', crearDivs);
botonArcoiris.addEventListener('click', pintarArcoiris);

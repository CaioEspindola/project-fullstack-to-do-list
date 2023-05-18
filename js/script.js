const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.form')
const inputTask = document.querySelector('.input-task')

/*CRUD*/
const fetchTasks = async () => {
  const res = await fetch('http://localhost:3001/tasks')
  const tasks = await res.json()
  return tasks
}

const addTask = async event => {
  event.preventDefault()
  const task = { title: inputTask.value }

  await fetch('http://localhost:3001/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task) /*Para passar uma string em formato de objeto*/
  })
  loadTasks()
  inputTask.value = ''
}

const deleteTask = async id => {
  await fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'delete'
  })
  loadTasks()
}

const updateTask = async ({ id, title, status }) => {
  await fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status })
  })
  loadTasks()
}

/*CREATE ELEMENT*/
const formatDate = dateUTC => {
  const options = { dateStyle: 'long', timeStyle: 'short' }
  const date = new Date(dateUTC).toLocaleString('pt-br', options)
  return date
}

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag)

  if (innerText) {
    element.innerText = innerText
  }

  if (innerHTML) {
    element.innerHTML = innerHTML
  }
  return element
}

const createSelect = value => {
  const optionsSelect = `
  <option value="pendente">Pendente</option>
  <option value="em andamento">Em andamento</option>
  <option value="concluído">Concluído</option>
  `

  const select = createElement('select', '', optionsSelect)

  select.value = value

  return select
}

/*CREATE ROW*/ /*Destructuring tasks*/
const createRow = task => {
  const { id, title, create_at, status } = task

  const tr = createElement('tr')

  const tdTitle = createElement('td', title)
  const tdCreatedAt = createElement('td', formatDate(create_at))
  const tdStatus = createElement('td')
  const tdActions = createElement('td')

  const select = createSelect(status)

  select.addEventListener('change', ({ target }) =>
    updateTask({ ...task, status: target.value })
  )

  const editButton = createElement(
    'button',
    '',
    '<span class="material-symbols-outlined"> edit_note </span>'
  )
  /*Ao criar o botão, já adicionará a classe e colará os dados dentro da "td"*/
  editButton.classList.add('btn-action')

  const deleteButton = createElement(
    'button',
    '',
    '<span class="material-symbols-outlined"> delete_forever </span>'
  )

  /*Ao criar o botão, já adicionará a classe e colará os dados dentro da "td"*/
  deleteButton.classList.add('btn-action')

  deleteButton.addEventListener('click', () => deleteTask(id))

  /*Para Editar o título, criando um campo de edição*/
  const editForm = createElement('form')
  const editInput = createElement('input')

  editForm.addEventListener('submit', event => {
    event.preventDefault()

    updateTask({ id, title: editInput.value, status })
  })

  editInput.value = title
  editForm.appendChild(editInput)
  editButton.addEventListener('click', () => {
    tdTitle.innerText = ''
    tdTitle.appendChild(editForm)
  })

  tdStatus.appendChild(select)
  tdActions.appendChild(editButton)
  tdActions.appendChild(deleteButton)

  /*Montar o elemento task.Dentro da linha "tr" coloco os dados das "td" */
  tr.appendChild(tdTitle)
  tr.appendChild(tdCreatedAt)
  tr.appendChild(tdStatus)
  tr.appendChild(tdActions)

  return tr
}

const loadTasks = async () => {
  const tasks = await fetchTasks()

  tbody.innerHTML = ''

  tasks.forEach(task => {
    const tr = createRow(task)
    /*Colocar o elemento 'tr' criado dentro do body da tabela*/
    tbody.appendChild(tr)
  })
}

addForm.addEventListener('submit', addTask)

loadTasks()

/*Funções que vão interagir com o banco de dados*/
const connection = require('./connection')

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks')
  return tasks
}

module.exports = {
  getAll
}

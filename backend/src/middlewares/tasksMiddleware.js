const validadeFieldTitle = (req, res, next) => {
  const { body } = req

  if (body.title === undefined) {
    return res.status(400).json({ message: 'O campo Título é obrigatório!' })
  }

  if (body.title === '') {
    return res
      .status(400)
      .json({ message: 'O campo Título não pode ser vazio!' })
  }

  next()
}

const validadeFieldStatus = (req, res, next) => {
  const { body } = req

  if (body.status === undefined) {
    return res.status(400).json({ message: 'O campo Status é obrigatório!' })
  }

  if (body.status === '') {
    return res
      .status(400)
      .json({ message: 'O campo Status não pode ser vazio!' })
  }

  next()
}

module.exports = {
  validadeFieldTitle,
  validadeFieldStatus
}

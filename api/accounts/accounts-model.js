const db = require('../../data/db-config.js');

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id)
}

async function create(account) {
  // DO YOUR MAGIC
  return db('accounts').insert(account);
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts')
    .where('id', id)
    .update(account)
    .then(count => count > 0 ? getById(id) : null);
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

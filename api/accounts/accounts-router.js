const router = require('express').Router();
const accountsModel = require('./accounts-model');
const accountsMiddleware = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  return
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  return
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  return
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  return
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  return
})

module.exports = router;

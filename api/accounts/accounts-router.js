const router = require('express').Router();
const accountsModel = require('./accounts-model');
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.getById(req.params.id)
    .then(account => {
      res.status(200).json(account[0])
    })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.create(req.account)
    .then(createdId => {
      if(createdId){
        accountsModel.getById(createdId)
          .then(account => {
            res.status(201).json(account[0]);
          })
      }
    })
    .catch(err => next(err))
})

router.put('/:id', checkAccountPayload, checkAccountNameUnique, checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.updateById(req.params.id, req.account)
    .then(updatedAcc => {
      if(updatedAcc !== null){
        res.status(200).json(updatedAcc[0]);
      }
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  accountsModel.deleteById(req.params.id)
    .then(updatedAcc => {
      res.status(200).json(req.accountForDeletion);
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;

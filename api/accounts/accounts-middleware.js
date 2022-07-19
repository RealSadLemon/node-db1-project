const db = require('../../data/db-config.js');
const accountsModel = require('./accounts-model');

const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if(typeof req.body.name == 'undefined' || typeof req.body.budget == 'undefined'){
    res.status(400).json({message: 'name and budget are required'})
    return;
  }else if( req.body.name.trim().length < 3 || req.body.name.trim().length > 100 ){
    res.status(400).json({message: `name of account must be between 3 and 100 (${req.body.name.trim().length})`})
    return;
  }else if(typeof req.body.budget !== 'number'){
    res.status(400).json({message: `budget of account must be a number (${+req.body.budget})`})
    return;
  }else if(req.body.budget < 0 || req.body.budget > 1000000){
    res.status(400).json({message: 'budget of account is too large or too small'})
    return;
  }
  req.account = {
    name: req.body.name.trim(),
    budget: req.body.budget
  }
  next();
}

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  db('accounts').where('name', req.body.name)
    .then(result => {
      if(!result.length){
        next();
      }else{
        res.status(400).json({ message: 'that name is taken' })
        return;
      }
    })
}

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  if(id){
    accountsModel.getById(id)
    .then(account => {
      if(account.length){
        req.accountForDeletion = account
        next();
      } else {
        res.status(404).json({message: 'account not found.'})
        return;
      }
    })
  }
  return;
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}
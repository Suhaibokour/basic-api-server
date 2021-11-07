'use strict';

const express = require('express');
const { food } = require('../models/index');
const foodRouter = express.Router();


foodRouter.get('/food', getFood); 
foodRouter.get('/food/:id', getOneFoodItem); 
foodRouter.post('/food', nameFood); 
foodRouter.put('/food/:id', updateFood); 
foodRouter.delete('/food/:id', deleteFood); 


async function getFood(req, res) {
  const allFood = await food.findAll();
  res.status(200).json(allFood);

}

async function getOneFoodItem(req, res) {
  const id = parseInt(req.params.id); 
  const foods = await food.findOne({
    where: {
      id: id
    }
  });
  res.status(200).json(foods);
}

async function nameFood(req, res) {
  const obj = req.body;
  let foods = await food.create(obj);
  res.status(201).json(foods);

}
async function updateFood(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let foundFood = await food.findOne({ where: { id: id } });
  const updatedFood = await foundFood.update(obj);
  res.status(201).json(updateFood);
}
async function deleteFood(req, res) {
  const id = parseInt(req.params.id);
  const deletedFood = await food.destroy({ where: { id } });
  res.status(204).json(deleteFood);
}


module.exports = foodRouter;
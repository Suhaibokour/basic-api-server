'use strict';

const express = require('express');
const { games } = require('../models/index');
const gamesRouter = express.Router();



async function getGames(req, res) {
  const allGames = await games.findAll();
  res.status(200).json(allGames);

}

async function getOneGame(req, res) {
  const id = parseInt(req.params.id); 
  const game = await games.findOne({
    where: {
      id: id
    }
  });
  res.status(200).json(game);
}

async function nameGame(req, res) {
  const obj = req.body;
  let game = await games.create(obj);
  res.status(201).json(game);

}

async function updateGame(req, res) {
  const id = parseInt(req.params.id);
  const obj = req.body;
  let foundGames = await games.findOne({ where: { id: id } });
  const updatedGame = await foundGames.update(obj);
  res.status(201).json(updateGame);
}

async function deleteGame(req, res) {
  const id = parseInt(req.params.id);
  const deletedGame = await games.destroy({ where: { id } });
  res.status(204).json(deleteGame);
}



gamesRouter.get('/games', getGames);
gamesRouter.get('/games/:id', getOneGame);
gamesRouter.post('/games', nameGame); 
gamesRouter.put('/games/:id', updateGame);
gamesRouter.delete('/games/:id', deleteGame); 

module.exports = gamesRouter;
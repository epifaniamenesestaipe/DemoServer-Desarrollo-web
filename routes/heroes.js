var express = require('express');
var router = express.Router();

const heroes = [
  {
    id: 1,
    alias: 'batman',
    abilities: 'money',
    realName: 'Bruce wayne',
    antagonist: 'joker'
  }
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(heroes);
});
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const filterHeroes = heroes.filter(hero => hero.id == id);
  filterHeroes.length > 0 ?
    res.json(filterHeroes[0]) :
    res.status(404).json({msg: 'not found'});
});
router.post('/', verifyToken, function(req, res, next) {
  heroes.push(req.body);
  res.json(req.body);
});
router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  for (const index in heroes) {
    if (heroes[index].id == id) {
      heroes[index] = req.body;
      res.json(req.body);
      return null;
    }
  }
  res.status(404).json({msg: 'not found'});
});
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  for (const index in heroes) {
    const hero = heroes[index];
    if (hero.id == id) {
      heroes.splice(index, 1)
      res.json({msg: 'ok'});
      return null;
    }
  }
  res.status(404).json({msg: 'not found'});
});


function verifyToken(req, res, next) {
  next();
}
module.exports = router;

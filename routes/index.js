const routes = require('express').Router();
const bookController = require('../controllers/book.js');

routes.get('/', bookController.book1Route);
routes.get('/book2', bookController.book2Route);

module.exports = routes;

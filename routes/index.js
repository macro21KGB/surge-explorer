var express = require('express');
var router = express.Router();
var surgeUtil = require("../utils")


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { projects: await surgeUtil.getSurgeProjects(), username: await surgeUtil.getSurgeUsername() });
});


module.exports = router;

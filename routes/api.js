var express = require('express');
var router = express.Router();
var surgeUtil = require("../utils")



/* GET home page. */
router.get('/getUsername', async function (req, res, next) {
    res.json({ data: await surgeUtil.getSurgeUsername(), error: null });
});

router.get('/getStatus', async function (req, res, next) {
    res.json({ data: await surgeUtil.checkIfSurgeIsInstalled(), error: null });
});

router.get('/getProjects', async function (req, res, next) {
    res.json({ data: await surgeUtil.getSurgeProjects(), error: null });
});

router.get('/teardown/:id', async function (req, res, next) {
    const result = req.params.id;
    res.json({ data: result, error: null });
});


module.exports = router;

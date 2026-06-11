const express = require('express');
const router = express.Router();
const {testend} = require('../controllers/testend');
const {authCheck,adminCheck} = require('../middlewares/authCheck');




router.get('/testend',authCheck,adminCheck,testend)


module.exports = router;

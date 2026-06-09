const express = require('express');
const router = express.Router();
const { list, create, remove } = require('../controllers/category');

router.get('/category', list);
router.post('/category', create);
router.delete('/category/:id', remove);




module.exports = router;

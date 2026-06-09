const express = require('express');
const router = express.Router();
const {create, list, remove, listby, filters,update, read} = require('../controllers/product');


router.post("/product", create) // create
router.get("/products/:count", list) // list
router.get("/product/:id", read) // read
router.put("/product/:id", update) // update
router.delete("/product/:id", remove) // delete
router.post("/productby", listby) // list by
router.post("/search/filters", filters) // filters





module.exports = router;
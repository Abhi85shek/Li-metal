var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const hashing  = require('../helpers/bcrypt');
router.use(checkAuth);

console.log(hashing("admin"));


module.exports = router;

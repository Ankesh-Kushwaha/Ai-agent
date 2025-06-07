const express = require('express');
const router = express.Router();
const {userLogin,userSignUp,updateUser,getUser} =require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

//user routes 
router.post('/user/signup', userSignUp);
router.post('/user/login', userLogin);
router.post('/user/update', authenticate, updateUser);
router.get('/user/get',authenticate,getUser)

//ticket routes


module.exports = router;
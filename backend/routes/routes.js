import express from 'express'
const router = express.Router();
import {userLogin,userSignUp,updateUser,getUser} from '../controllers/userController.js'
import  { authenticate }  from '../middleware/authMiddleware.js'
import {createTicket,getTicket,getTickets} from '../controllers/ticketControllers.js'

//user routes 
router.post('/user/signup', userSignUp);
router.post('/user/login', userLogin);
router.post('/user/update', authenticate, updateUser);
router.get('/user/get',authenticate,getUser)

//ticket routes
router.post('/ticket/create', authenticate, createTicket);
router.get('/ticket/getallticket', authenticate, getTickets);
router.get('/ticket/get', authenticate, getTicket);

export default router;
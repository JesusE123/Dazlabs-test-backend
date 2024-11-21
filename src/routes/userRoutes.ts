import express, { Request, Response } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';


const router = express.Router()



// Ruta para crear un usuario
router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;

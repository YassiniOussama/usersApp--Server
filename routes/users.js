import express from 'express';
import { getUsers, getUser, getCountUsers, createUser, updateUser, deleteUser, getUsersByName } from '../controllers/users.js'

const router = express.Router();

router.get('/:page/:size', getUsers);
router.get('/count', getCountUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:page/:size/sherch', getUsersByName);


export default router;
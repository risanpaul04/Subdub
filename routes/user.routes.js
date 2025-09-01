import { Router } from 'express';
import {getUser, getUsers} from "../controllers/user.controller.js";
import { authorize, authorizeRoles} from '../middlewares/auth.middleware.js'
const userRouter = Router();

userRouter.get('/', authorize, authorizeRoles('admin', 'editor'), getUsers);
userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));
userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user'}));
userRouter.delete('/:id', authorize, authorizeRoles('admin'), (req, res) => res.send({title: 'DELETE user'}));

export default userRouter;
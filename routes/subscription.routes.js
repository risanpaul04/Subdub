import { Router } from 'express';
import {authorize, authorizeRoles} from "../middlewares/auth.middleware.js";
import {
    createSubscription,
    getAllSubscriptions,
    getUserSubscriptions
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, authorizeRoles('admin'), getAllSubscriptions);

subscriptionRouter.get('/:id', getAllSubscriptions);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({title: 'UPDATE subscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'DELETE subscription'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming subscription renewals'}));

export default subscriptionRouter;
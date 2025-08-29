// import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import User from "../models/User.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,

        })
        res.status(201).json({success: true, data: subscription});
    }   catch (error) { next(error) }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId);
        if(!user) throw new Error('No user found');

        let subscription = await Subscription.find({user: user._id});

        if(!subscription) throw new Error(`No subscription found for user: ${user.name}`);
        res.status(200).json({success: true, data: subscription});

    } catch (error) { next(error); }
}

export const getSubscription = async (req, res, next) => {
    try {
        let userId = req.user._id;
        const subscription = await Subscription.find({user: userId});
        if(!subscription) {
            res.status(400).json({success: false, message: 'Subscription not found'});
        }
        res.status(200).json({success: true, data: subscription});
    } catch (error) { next(error); }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id!==req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});
        res.status(200).json({success: true, data: subscriptions});
    } catch (error) {
        next(error);
    }
}
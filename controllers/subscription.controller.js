// import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/User.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        res.status(201).json({success: true, data: subscription});
    } catch (error) {
        // res.status(400);
        next(error);
    }

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
    }
    catch (error) {
        next(error);
    }
}
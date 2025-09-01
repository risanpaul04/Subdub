import User from '../models/User.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        if(!users) {
            return res.status(404).json({ error: 'No user found' });
        }
        res.status(200).json({success: true, data: users});
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}
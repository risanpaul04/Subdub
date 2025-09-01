import mongoose from 'mongoose';

const userSchema  = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Enter valid 10 digit phone number']
    },

    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 255,
        match: [/\S+@\S+\.\S+/, 'please fill a valid email address'],
    },

    password: {
        type: String,
        required: true,
        minLength: [6, 'Password should be at least 6 characters'],
    },

    role: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        default: 'user'
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
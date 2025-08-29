import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR'],
        default: 'INR',
    },

    frequency: {
        type: String,
        enum: ['weekly', 'monthly', 'quarterly', 'half_yearly', 'yearly'],
    },

    category: {
        type: String,
        enum: ['membership', 'personal-training', 'diet-chart', 'counselling'],
        required: true,
    },

    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },

    startDate: {
        type: Date,
        required: true,
        default: Date.now,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },

    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: 'Renewal date must be after start date',
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

}, {timestamps: true});

subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            weekly: 7,
            monthly: 30,
            quarterly: 90,
            half_yearly: 180,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
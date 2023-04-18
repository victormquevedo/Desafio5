import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
})

export const usersModel = mongoose.model('Users', usersSchema);
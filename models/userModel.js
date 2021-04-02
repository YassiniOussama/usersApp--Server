import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    gender: String,
    dob: Date,
    news: String,
    email: String,
    photo: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;


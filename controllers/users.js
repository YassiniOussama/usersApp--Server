import express from 'express';
import mongoose from 'mongoose';

import UserModel from '../models/userModel.js';

const router = express.Router();

export const getUsers = async (req, res) => {
    try {
        const size = req.params.size > 0 ? parseInt(req.params.size) : 10;
        const page = req.params.page ? parseInt(req.params.page) : 1;
        // const{page=1, limit=10} = req.query;
        const userModel = await UserModel.find()
            .limit(size)
            .skip((page - 1) * size);
        //console.log(userModel);

        res.status(200).json(userModel);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUsersByName = async (req, res) => {
    try {
        const size = req.params.size > 0 ? parseInt(req.params.size) : 10;
        const page = req.params.page ? parseInt(req.params.page) : 1;
        const username = req.query.username ? req.query.username : "";
        // const{page=1, limit=10} = req.query;
        const userModel = await UserModel.find({ username: req.query.username })
            .limit(size)
            .skip((page - 1) * size);
        console.log(userModel);
        res.status(200).json(userModel);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCountUsers = async (req, res) => {
    try {
        const userModel = await UserModel.find().count();
        res.status(200).json(userModel);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const { username, gender, dob, news, email, photo } = req.body;
    const newUserModel = new UserModel({ username, gender, dob, news, email, photo })
    try {
        await newUserModel.save();
        res.status(201).json(newUserModel);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, gender, dob, news, email, photo } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = { username, gender, dob, news, email, photo, _id: id };
    await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    await UserModel.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
}


export default router;
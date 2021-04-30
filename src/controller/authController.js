const express = require('express');
const { model } = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const auth = express.Router();


auth.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if(await User.findOne({ email })){
            req.body.password = undefined;
            return res.status(400).send('Usuario ja existe')
        }
        const user = await new User(req.body);
        const hash = bcrypt.hashSync(user.password, 10)
        user.password = hash;
        user.save()
        
        return res.status(200).json({ 'status': 'success', 'User': user });
    }
    catch (err) {
        return res.status(409).status({
            'status': 'failure',
            'mssg': 'unable to save to database'
        });
    }
    user.password = undefined;
});
module.exports = app => app.use('/auth', auth);
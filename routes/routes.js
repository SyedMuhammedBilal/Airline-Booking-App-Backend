const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send('wowo')
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(422).json({ error: 'please enter all fields' })
    }

    try {
        const response = await User.findOne({ email: email });
        
        if(response) {
            return res.status(422).json({ error: 'user already exist' })
        } else {
            const user = new User({ name, email, password });
            await user.save();
            res.status(201).json({ message: 'user registered successfully' });
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const  { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: "please fill all fields!" })
        }

        const userLogin = await User.findOne({email: email});

        if(userLogin) {
            const isMatched = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })
    
            if(!isMatched ) {
                res.status(400).json({error: "invalid credentials"})
            } else {
                res.status(200).json({error: "user Logged-in successfully"})
            }
        } else {
            res.status(400).json({error: "invalid credentials"})
        }

    } catch(error) {
        res.status(500).json({error})
    }
});

module.exports = router
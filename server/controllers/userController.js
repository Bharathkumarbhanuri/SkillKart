const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { insertUser, fetchUserByEmail } = require('../models/userModel');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        email = email.toLowerCase().trim();

        const existing_user = await fetchUserByEmail(email);
        if (existing_user) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const password_hash = await bcrypt.hash(password, 10);

        await insertUser({ name, email, password_hash });
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log('error creating user', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};


const loginUser = async(req,res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // email = email.toLowerCase().trim();
        const user = await fetchUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Email not registered' })
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            return res.status(400).json({ message: 'Password not matched' })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({message: 'Login Succesfull', token})
    } catch (error) {
        console.error('error logging in', error);
        res.status(500).json({error: 'Login failed'})
    }
}
module.exports = { createUser, loginUser };
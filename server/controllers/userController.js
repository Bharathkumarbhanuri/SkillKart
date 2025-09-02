const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { insertUser, fetchUserByEmail , fetchUserById, updateUserById} = require('../models/userModel');

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
            { expiresIn: '7d' }
        );

        res.json({message: 'Login Succesfull', token})
    } catch (error) {
        console.error('error logging in', error);
        res.status(500).json({error: 'Login failed'})
    }
}

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await fetchUserById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, education } = req.body;

    // profilePic handling (if using multer)
    const profilePic = req.file ? req.file.filename : null;

    await updateUserById(userId, { name, email, phone, education, profilePic });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

module.exports = { createUser, loginUser, getUserProfile, updateUserProfile };
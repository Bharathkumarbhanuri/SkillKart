const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const searchRoutes = require('./routes/searchRoutes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads/profilePics', express.static(path.join(__dirname, 'uploads/profilePics')));

app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist',wishlistRoutes);
app.use('/api/enroll',enrollmentRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/search',searchRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});



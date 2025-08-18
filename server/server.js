const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});



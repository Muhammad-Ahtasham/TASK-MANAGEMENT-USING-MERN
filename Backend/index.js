const express=require('express');
// const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');

require('dotenv').config();
const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', require('./Routes/authRouter'));
app.use('/products', require('./Routes/productrouter'));
app.use('/tasks', require('./Routes/taskRoutes'));



// app.use(bodyParser.urlencoded({ extended: true }));

require('./Models/db');


app.get('/', (req, res) => {
  res.send('Welcome to the MERN Auth App');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

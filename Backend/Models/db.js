const mongoose=require('mongoose');
const DB_NAME='Auth'; 


mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {;
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;

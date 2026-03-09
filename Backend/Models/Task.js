const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true
  },
  title:{
    type:String,
    required:true

  },
  description:{
    type:String,
    required:true

  },
  status:{
    type:String,
    required:true,
    default:"pending",
    enum:['pending','running','completed','failed']

  }
},{timestamps:true});

const Task = mongoose.model('Task', TaskSchema,'tasks');

module.exports = Task;
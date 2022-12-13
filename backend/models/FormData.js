const mongoose = require('mongoose');
const mongoDB = "mongodb://127.0.0.1/ArkDB";
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://localhost:27017/test/Data');
const { Schema } = mongoose;

const dataSchema = mongoose.Schema({
  Platform:  {type:String,required: true}, // String is shorthand for {type: String}
  UserName:{type:String, required: true},
  Email:{type:String, required: true},
  Hours: {type:String, required:true},
  Comment:{type:String, required:true},
},{collection: 'PlayersData',versionKey: false})

// const formData  = mongoose.model("formData", dataSchema)

module.exports =mongoose.model("formData", dataSchema)
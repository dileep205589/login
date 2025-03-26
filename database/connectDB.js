const mongoose  = require ("mongoose");

const connectDB = () =>{
    return mongoose.connect('mongodb://127.0.0.1:27017/register')
.then (() =>{
    console.log( connectDB )
})
.catch ((error) =>{
    console.log(error)
})
};
module.exports = connectDB ;

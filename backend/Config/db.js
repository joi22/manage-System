const { default: mongoose } = require('mongoose');

const connectDB = async ()=>{
   await mongoose.connect(process.env.DB_CONNECT)
   .then(()=>console.log("Atlast Connect"))
   .catch(()=>console.log("Atlast NOT Connect"))
}

module.exports = connectDB
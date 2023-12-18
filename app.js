require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT;
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');

server.use(morgan('dev'));
server.use(express.json())

async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL);
}
main().then(()=>{
    console.log('DB is connected...');
}).catch((err)=>{
    console.log(err);
})

server.use('/api/user',userRoutes);

server.listen(port,()=>{
    console.log(`server start at ${port}`);
})
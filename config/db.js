//NPM Packages
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
require('dotenv').config

module.exports = connect = asyncHandler(async () =>{
    try{
        const response = await mongoose.connect(process.env.URL, {
            useUnifiedTopology: true, 
            useNewUrlParser: true 
        })
        console.log('Connection Created')
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
})
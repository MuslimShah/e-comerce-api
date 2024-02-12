const mongoose=require('mongoose');
//user schema for storing user info
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide a name'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'email requiered'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'must provide a valid email'],
        unique: [true, 'must provide a unique email']
    },
    password:{
        type:String,
        required:[true,'password required'],
        minlength: [8, 'password must be atleast 8 characters'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, 'must provide correct password']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }

});

module.exports=mongoose.model('User',userSchema);
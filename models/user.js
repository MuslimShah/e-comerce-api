const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
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
//hashing password before saving in db
userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()
});


//comparing user pssword password with its alternative hashed -->stored in db
userSchema.methods.comparePassword=async function(candidatePassword){
    const isMatched=await bcrypt.compare(candidatePassword,this.password);
    return isMatched;
}



module.exports=mongoose.model('User',userSchema);
const mongoose=require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema= new Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    category:{
        String
    },
    company:{
        type:String
    },
    colors:{
        type:[]
    },
    featured:{
        type:Boolean
    },
    freeShipping:{
        type:Boolean
    },
    inventory:{
        type:Number
    },
    averegeRating:{
        type:Number
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true});

module.exports=mongoose.model("Products",ProductSchema);
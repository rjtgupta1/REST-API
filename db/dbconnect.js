import mongoose from "mongoose";
const studentSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    Address:{
        type:String,
        require:true
    }
},
{
    versionKey:false
})

const student = mongoose.model('student',studentSchema)
export default student

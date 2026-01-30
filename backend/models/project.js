import mongoose from 'mongoose'


const projectSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
    type:String,
    enum:['ACTIVE','ON-HOLD','COMPLETED'],
    required:true
    },
    manager_id:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
    },},
 { timestamps: true }
)
      
const Project=mongoose.model("Project",projectSchema)
export default Project





// secomf 



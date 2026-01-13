import mongoose, { isObjectIdOrHexString, Schema } from "mongoose";


mongoose.connect(process.env.DB_CONNECTION_STRING!);

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["teacher","student"] },
});

const classSchema = new Schema({
    className : String,
    teacherId : {   
        type : mongoose.Types.ObjectId,
        ref: "User"
    },
    studentIds : {
        type : [mongoose.Types.ObjectId],
        ref : "User"
    }
})

const AttendanceSchema = new Schema({
    classId : {
        type : mongoose.Types.ObjectId,
        ref : "Class"
    },
    teacherId : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    studentIds : {
        type : [mongoose.Types.ObjectId],
        ref : "User"
    },
    status : {type : String , enum : ["present","absent"]}
})

export const UserModel = mongoose.model("User",userSchema);
export const ClassModel = mongoose.model("Class",classSchema);
export const AttendanceModel = mongoose.model("Attendance",AttendanceSchema);

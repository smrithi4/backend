
const mongoose=require("mongoose");
const certmodel = require("./certdetails");

mongoose.connect("mongodb+srv://Smrithikarthikeyan:Smrithikarthikeyan@cluster0.ctqkoyu.mongodb.net/db1?retryWrites=true&w=majority")
.then(()=>{console.log("Db connected")})
.catch((err)=>{console.log(err)});

let sc=mongoose.Schema;
const studschema= new sc({
    Admno:String,
    Sname:String,
    Age:Number,
    Status:String

});
var studmodel=mongoose.model("Student",studschema)
module.exports=studmodel;

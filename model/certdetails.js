const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://Smrithikarthikeyan:Smrithikarthikeyan@cluster0.ctqkoyu.mongodb.net/db1?retryWrites=true&w=majority")
.then(()=>{console.log("Db connected")})
.catch(()=>{console.log(err)});

let sc=mongoose.Schema;
const certschema= new sc({
    sid:{type:mongoose.Schema.Types.ObjectId,ref:'students'},
    Qualification:String,
    certphoto:{
        data:Buffer,
        contentType:String,
    }
});
var certmodel=mongoose.model("Certificate",certschema)
module.exports=certmodel;
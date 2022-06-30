const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const route =require("./routes/route")

const app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://SandeepDarshanam:9866203258Aa@cluster0.pr0hn.mongodb.net/group67Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then(()=>console.log("Mongodb connected"))
.catch(err=>console.log(err))
app.use('/',route)
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

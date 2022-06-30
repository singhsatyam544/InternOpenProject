
const CollegeModel = require('../Models/CollegeModel')
const InternModel = require('../Models/InternModel')


/************************************************Create CollegeApi*******************************************************/

const isValid =  function(value){
    if(typeof value==='undefined' || typeof value === null) return  false
    if(typeof value === 'string' && value.trim().length===0) return false   
    if(typeof value === 'number') return false 
    else return true 
    }

const createCollege = async function(req,res){
    try {
        let data = req.body
        console.log(typeof data.name)
        // let a = typeof data
        // console.log(Object.keys(data).length)
        // console.log(data.name)
        // let b = value.trim().length
        // console.log( data.logoLink.length)
        // console.log(b.length)
    
        if(!Object.keys(data).length){
             return res.status(400).send({status:false, msg:"Please Enter the college details"})
        }
        if(!isValid(data.name)){
             return res.status(400).send({status:false, msg:"Please Enter the college name"})
        }
        if(!isValid(data.fullName)){ 
            return res.status(400).send({status:false, msg:"Please Enter the full name is college"})  
        }  
        if(!isValid(data.logoLink)){ 
            return  res.status(400).send({status:false, msg:"Please enter the logo link of the college"})
        }
        if(!data.logoLink.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
            return res.status(400).send({status:false, msg:"This url is not valid"})
        }
        let createdCollege = await CollegeModel.create(data)
        res.status(201).send({status:false, msg:"Congratulation : College created successfully" ,  data:createdCollege})
    } catch (err) {
        res.status(500).send({status:false, error:err.message})
    }
}

/**********************************GET COLLEGE AND INTERN DETAILS*******************************************************/

const getCollegeDetails = async function(req,res){
    try {
        let data= req.query   /*we take Input Here and check all the field and value*/
    //    console.log(data)    
        if(!Object.keys(data).length){
            return res.status(400).send({status:false, msg:"Please enter the college name"})
           /* we convert the data into lower case */ 
        }
        const lowerCollegeName = data.collegeName.toLowerCase()
        let checkCollegeName = await CollegeModel.findOne({name:lowerCollegeName, isDeleted:false})
        console.log(checkCollegeName)
        if(!checkCollegeName){
            return res.status(400).send({status:false, msg:"No such college name found "})
        }
        let collegeId = checkCollegeName._id
        let getAllInternData = await InternModel.find({collegeId:collegeId, isDeleted:false}).select({name:1,email:1,mobile:1})
        if(!getAllInternData){
            return res.status(400).send({status:false, msg:"No intern is apply for this porgram"})
        }
        /*Assign Value*/
        let name = checkCollegeName.name
        let fullName = checkCollegeName.fullName
        let logoLink = checkCollegeName.logoLink
        /*Create a CollegeData Object Here*/
        let collegeData ={
            name:name,
            fullName:fullName,
            logoLink:logoLink,
            interests:getAllInternData
        }
        res.status(200).send({status:true, msg:"Suceesfull", data:collegeData})
    } catch (err) {
        return res.status(500).send({status:false, error:err.message})
    }
}

module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails
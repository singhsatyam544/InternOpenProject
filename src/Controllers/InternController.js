const interModel = require('../Models/InternModel')
const CollegeModel = require('../Models/CollegeModel')

const isValid = function(value){
    if(typeof value === 'undefined' || typeof value ===null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    else return true
}
/******************************************************** Create intern Api ************************************************/

const  createInter = async function(req, res){
    try {
        let data = req.body
        if(!Object.keys(data).length){
            return res.status(400).send({status:false, msg:"Please enter the Intern Details"})
        }
        console.log(data.name)
        if(!isValid(data.name)){
            return res.status(400).send({status:false, msg:"Please enter the Intern Name"})
        }
        if(!isValid(data.mobile)){
            return res.status(400).send({status:false, msg:"Please enter the Intern mobile Number"})
        }
        if(!isValid(data.email)){
            return res.status(400).send({status:false, msg:"Please enter the Inter emailID"})
        }
        if(!isValid(data.collegeName)){
            return res.status(400).send({status:false, msg:"Please enter the college name"})
        }
        if (!(/^([+]\d{2})?\d{10}$/.test(data.mobile))) {
            return res.status(400).send({ status: false, msg: "invalid mobile number" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email))   /*validate Email ID*/

        return res.status(400).send({ status: false, msg: "email Id is invalid" })
        let emailCheck = await interModel.findOne({email:data.email})
        if(emailCheck){
            return res.status(400).send({status:false, msg:`This ${data.email} EamilID already exists`})
        }
        let mobileCheck = await interModel.findOne({mobile:data.mobile})
        if(mobileCheck){
            return res.status(400).send({status:false, msg:`this ${data.message} Mobile number is alreay in used `})
        }
        let clgName = data.collegeName.toLowerCase().trim()
        let collegeCheck =  await CollegeModel.findOne({name:clgName, isDeleted:false})
        console.log(collegeCheck)
        if(!collegeCheck){
            return res.status(400).send({status:false, msg:`${clgName} : No such college Name Not Found!`})
        }
        let collegeId = collegeCheck._id   
        console.log(collegeId)

        data.collegeId = collegeId 
        const savedInterData = await interModel.create(data)
        console.log(savedInterData)
        return res.status(201).send({status:true, data:savedInterData})
        
    } catch (err) {
        res.status(500).send({status:false, error:err.message})
    }
}

module.exports.createInter = createInter
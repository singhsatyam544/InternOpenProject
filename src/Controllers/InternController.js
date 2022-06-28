const interModel = require('../Models/InternModel')

const  createInter = async function(req, res){
    try {
        let data = req.body
        const savedInterData = await CollegeModel.create(data)
        return res.status(201).send({status:true, data:savedInterData})
        
    } catch (err) {
        res.status(500).send({status:false, error:err.message})
    }
}

module.exports.createInter = createInter
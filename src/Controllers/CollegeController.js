const CollegeModel = require('../Models/CollegeModel')

const createCollege = async function(req,res){
    try {
        let data = req.body
        let createdCollege = await CollegeModel.create(data)
        res.send(201).status({status:false, data:createdCollege})
    } catch (err) {
        res.status(500).send({status:false, error:err.message})
    }
}

module.exports.createCollege = createCollege
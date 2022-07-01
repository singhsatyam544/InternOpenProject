const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String,lowercase:true ,unique: true, required: true },
  fullName: { type: String, required: true },
  logoLink: { type: String, required: 'url no be empty' },
  isDeleted: { type: Boolean, default: false },
}, {timestamps:true});
module.exports = mongoose.model("College", collegeSchema);


const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    careerName: { type: String },
    careerLogo: { type: String },
  },
  { timestamps: true },
);

const Career = mongoose.model('Career', careerSchema);

module.exports = Career;

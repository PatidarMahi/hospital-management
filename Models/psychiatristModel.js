const mongoose = require('mongoose');

const psychiatristSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, 'Psychiatrist name is required'],
     },
     hospital: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hospital',
          required: true
     },
}, { timestamps: true });

const Psychiatrist = mongoose.model('Psychiatrist', psychiatristSchema);

module.exports = Psychiatrist;

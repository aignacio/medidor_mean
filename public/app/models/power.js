var mongoose = require('mongoose');

var power = {
  value: {
      type: Number
  }
  ,created: {
    type: Date
    ,default: Date.now
  }
};

// module.exports = new mongoose.Schema(alarmSchema);
// module.exports.alarmSchema = alarmSchema;
module.exports = mongoose.model('power', power);

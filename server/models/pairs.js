const mongoose = require('mongoose');


const mainSchema = new mongoose.Schema({
  classes: {type: Object},

});


const PairModel = mongoose.model("pairs", mainSchema);


module.exports = PairModel;

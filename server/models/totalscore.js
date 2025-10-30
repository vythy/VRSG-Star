const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  totalscore: Number
});

// compile model from schema
module.exports = mongoose.model("score", ScoreSchema);

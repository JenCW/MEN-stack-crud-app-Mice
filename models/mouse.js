const mongoose = require("mongoose");


const mouseSchema = new mongoose.Schema({
    name: String,
    isReadyToClick: Boolean,
    dropdown: String,
});

const Mouse = mongoose.model("Mouse", mouseSchema);

module.exports = Mouse;


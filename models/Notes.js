const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide note"],
        trim: true,
    }
})

module.exports = mongoose.model("Notes", NotesSchema);
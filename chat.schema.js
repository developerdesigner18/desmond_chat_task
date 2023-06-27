const mongoose = require("mongoose");

const Chat = new mongoose.Schema(
    {
        name: String,
        message: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Chat", Chat, "Chat");

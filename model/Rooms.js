const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = Schema({
    name: { type: String, require: true },
    openTime: { type: String, require: true },
}, );

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
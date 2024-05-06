const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true
  },
  students: {
    from: {
      type: Number,
      required: true
    },
    to: {
      type: Number,
      required: true
    }
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;

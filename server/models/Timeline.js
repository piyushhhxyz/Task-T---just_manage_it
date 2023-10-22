const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Timeline', timelineSchema);

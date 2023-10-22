const express = require('express');
const Task = require('../models/Task');
const Timeline = require('../models/Timeline');
const dateFns = require('date-fns');

const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });

    await task.save();
    res.json(task);
});

router.get('/:userId/timeline', async (req, res) => {
    const userId = req.params.userId;
    const tasks = await Task.find({ assignedTo: userId }).populate('assignedTo');
    
    const timelines = tasks.map(task => {
        return {
            task: task.title,
            startDate: dateFns.format(task.createdAt, 'MM/dd/yyyy'),
            endDate: dateFns.addDays(task.createdAt, 7)  // Example: Each task takes a week
        };
    });

    res.json(timelines);
});

module.exports = router;

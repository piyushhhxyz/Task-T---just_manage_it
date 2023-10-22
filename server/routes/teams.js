const express = require('express');
const Team = require('../models/Team');
const User = require('../models/user');

const router = express.Router();

// Create a team
router.post('/create', async (req, res) => {
    const { name, managerId } = req.body;

    const team = new Team({
        name,
        manager: managerId
    });

    await team.save();

    // Add manager to the team members
    const manager = await User.findById(managerId);
    manager.team = team._id;
    await manager.save();

    res.json(team);
});

// Add member to a team
router.post('/add_member', async (req, res) => {
    const { teamId, userId } = req.body;

    const team = await Team.findById(teamId);
    team.members.push(userId);

    const user = await User.findById(userId);
    user.team = team._id;

    await team.save();
    await user.save();

    res.json({ message: 'Member added to team.' });
});

module.exports = router;

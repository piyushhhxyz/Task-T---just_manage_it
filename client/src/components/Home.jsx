import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch users
        axios.get('http://localhost:3001/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));

        // Fetch teams
        axios.get('http://localhost:3001/api/teams')
            .then(response => setTeams(response.data))
            .catch(error => console.error("Error fetching teams:", error));

        // Fetch tasks
        axios.get('http://localhost:3001/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    return (
        <div>
            <h1>Task Management System</h1>

            <h2>Users</h2>
            <ul>
                {users.map(user => <li key={user._id}>{user.username} - {user.role}</li>)}
            </ul>

            <h2>Teams</h2>
            <ul>
                {teams.map(team => <li key={team._id}>{team.name}</li>)}
            </ul>

            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => <li key={task._id}>{task.title} assigned to {task.assignedTo.username}</li>)}
            </ul>
        </div>
    );
}

export default Home;

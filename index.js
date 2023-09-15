const express = require('express');
const cors = require('cors');
const { pool } = require('./dbConfig')

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: `http://localhost:${port}`,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
// Endpoint to get a list of all states
app.get('/states', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM states');
        const states = result.rows;
        client.release();

        res.status(200).json(states);
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to get people living in a specific state
app.get('/state/:stateId', async (req, res) => {
    const { stateId } = req.params;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM population_data WHERE state_id = $1', [stateId]);
        const peopleInState = result.rows;
        client.release();

        res.status(200).json(peopleInState);
    } catch (error) {
        console.error('Error fetching people in the state:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    try {
        const queryRes = await pool.query(
            'INSERT INTO users (email, hash) VALUES ($1, $2) RETURNING user_id',
            [email, hash]
        );
        res.json(queryRes.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
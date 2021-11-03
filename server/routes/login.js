const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const lowercaseEmail = email.toLowerCase();
    try {
        const userRes = await pool.query(
            'SELECT user_id, hash FROM users WHERE email=$1',
            [lowercaseEmail]
        );
        const { hash, user_id } = userRes.rows[0];
        const doesPasswordMatch = bcrypt.compareSync(password, hash);
        if (doesPasswordMatch) {
            res.json({user_id});
        }
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
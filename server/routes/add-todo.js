const router = require('express').Router();
const pool = require('../db');

router.post('/',async(req,res)=>{
    const {user_id} = req.query;
    const {title,description} = req.body;
    try{
        const queryRes = await pool.query(
            `
            INSERT INTO 
            todos (title, description, user_id) 
            VALUES ($1, $2, $3)
            RETURNING todo_id, title, description
            `,
            [title, description, user_id]
        ); 
        res.json(queryRes.rows[0]);
    } catch (err){
        console.error(err.message);
    }
})

module.exports = router;
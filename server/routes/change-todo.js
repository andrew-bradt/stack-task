const router = require('express').Router();
const pool = require('../db');

router.put('/',async(req,res)=>{
    const {todo_id} = req.query;
    const {title,description} = req.body;
    try{
        const queryRes = await pool.query(
            `UPDATE todos
            SET title = $2, description = $3
            WHERE todo_id=$1
            RETURNING todo_id, title, description`,
            [todo_id, title, description]
        ); 
        res.json(queryRes.rows[0]);
    } catch (err){
        console.error(err.message);
    }
})

module.exports = router;
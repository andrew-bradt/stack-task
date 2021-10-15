const router = require('express').Router();
const pool = require('../db');

router.delete('/',async(req,res)=>{
    const {todo_id} = req.query;
    try{
        const queryRes = await pool.query(
            'DELETE FROM todos WHERE todo_id=$1',
            [todo_id]
        )
        res.json('Task Deleted');
    } catch(err){
        console.error(err.message);
    }
})

module.exports = router;
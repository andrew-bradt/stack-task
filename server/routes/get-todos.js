const router = require('express').Router();
const pool = require('../db');

router.get('/',async(req,res)=>{
    const {user_id} = req.query;
    try{
        const todosRes = await pool.query(
            'SELECT todo_id, title, description FROM todos WHERE user_id=$1',
            [user_id]
        )        
        res.json(todosRes.rows);    
    } catch(err){
        console.error(err.message);
    }
})

module.exports = router;
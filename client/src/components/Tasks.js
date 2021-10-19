import React,{useState,useEffect} from 'react';
import Task from './Task';
import { Button } from '@material-ui/core';

export default function Tasks({user_id}) {    
    const [todos,setTodos] = useState([]);

    useEffect(()=>{
        (async()=>{
            const response = await fetch(`/get-todos?user_id=${user_id}`);
            const fetchedTodos = await response.json();
            setTodos(fetchedTodos);
        })();
    },[]);

    const onSubmit = (e, newTodo)=>{
        const modifiedTodos = todos.map(todo=>(todo.todo_id===newTodo.id)?todo=newTodo:todo);
        setTodos(modifiedTodos);
    }

    const onDelete = (id)=>{
        const modifiedTodos = todos.filter(todo=>todo.todo_id!==id);
        setTodos(modifiedTodos);
        deleteTodoFromDb(id);
    }

    const deleteTodoFromDb = async(id)=>{
        const response = await fetch(`/remove-todo?todo_id=${id}`,{method:'DELETE'});
        const data = await response.json();
        console.log(data);
    }

    const onEdit = ()=>{
        
    }

    const editTodoOnDb = async()=>{

    }

    return (
        <div>
            {
                todos.map(todo=>{
                    return(
                        <Task key={todo.todo_id} todoItem={todo} onSubmit={onSubmit} onDelete={onDelete} onEdit={onEdit}/>
                    )
                })
            }
        </div>
    )
}

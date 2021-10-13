const request = require('supertest');
const app = require('./app');
const currentUser = 'testuser@gmail.com';
const currentPassword = '9999';
const {newEmail, newPassword} = require('./chancetest');

describe('ACCOUNT',()=>{
    it('User Should Successfully Create Account',()=>{
            return request(app).post('/create-user').send({email:newEmail, password:newPassword})
            .then(res=>{
                expect(res.body).toEqual('User Created');
        });
    });

    it('User Should Successfully Log-In',()=>{
        return request(app).post('/login').send({email:currentUser, password:currentPassword})
        .then(res=>{
            const {todos} = res.body;
            if(todos.length === 0){
                expect(todos).toBe([]);
            } else {
                expect(todos).arrayContaining(expect=>{
                    expect.objectContaining({
                        user_id:expect.any(Number),
                        task:expect.any(String),
                        description:expect.any(String) || null
                    })
                })
            }
        })
    })
});

describe('TODOS',()=>{
    it('Add A TODO',()=>{
        return request(app).post('/add-todo/:user_id').send({title, description})
        .then(res=>{
            const newTodo = res.body[0];
            expect(newTodo).objectContaining({
                task_id:expect.any(Number),
                task:expect.any(String),
                description:expect.any(String) || null,
                user_id:expect.toBe(user_id)
            })
        })
    });

    it('Remove A TODO',()=>{
        return request(app).delete('/remove-todo/:user_id/:todo_id')
        .then(res=>{
            expect(res.body).toBe('Task Deleted');
        })
    });

    it('Modify A TODO',()=>{
        return request(app).put('/change-todo/:user_id/:todo_id').send({title, description})
        .then(res=>{
            const modifiedTodo = res.body[0];
            expect(modifiedTodo).objectContaining({
                task_id:expect.any(Number),
                task:expect.any(String),
                description:expect.any(String) || null,
                user_id:expect.toBe(user_id)
            })
        })
    });
})


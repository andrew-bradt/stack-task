const request = require('supertest');
const app = require('./app');
const currentUser = 'testuser@gmail.com';
const currentPassword = '9999';
const {newEmail, newPassword} = require('./chancetest');
const title = 'Wash Laundry';
const user_id = 19;
const description = "delicates only";
const existingTodo_id = 1;
const newTitle = 'Organize room'
const newDescription = 'closet items';  

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
            const todos = res.body
            expect(todos).toEqual(
                expect.objectContaining({
                    user_id:expect.any(Number)
                })
            )
        })
    })
});

describe('TODOS',()=>{
    it('Should Get All of a Users Todos',()=>{
        return request(app).get(`/get-todos?user_id=${user_id}`)
        .then(res=>{
            const todos = res.body;
            if(todos.length === 0){
                expect(todos).toBe([]);
            } else {
                expect(todos).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            todo_id:expect.any(Number),
                            title:expect.any(String),
                            description:expect.any(String) || null
                        })
                    ])
                )
            }
        })
    })

    it('Add A TODO',()=>{
        return request(app).post(`/add-todo?user_id=${user_id}`).send({title, description})
        .then(res=>{
            const newTodo = res.body;
            expect(newTodo).toEqual(expect.objectContaining({
                todo_id:expect.any(Number),
                title:expect.any(String),
                description:expect.any(String) || null
            }))
        })
    });

    it('Remove A TODO',()=>{
        return request(app).delete(`/remove-todo?todo_id=${4}`)
        .then(res=>{
            const deleteMessage = res.body;
            expect(deleteMessage).toBe('Task Deleted');
        })
    });

    it('Modify A TODO',()=>{
        return request(app).put(`/change-todo?todo_id=${20}`).send({title:newTitle, description:newDescription})
        .then(res=>{
            const modifiedTodo = res.body;
            expect(modifiedTodo).toEqual(expect.objectContaining({
                todo_id:expect.any(Number),
                title:expect.any(String),
                description:expect.any(String) || null
            }))
        })
    });
})


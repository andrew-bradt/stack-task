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
                        User_id:expect.any(Number),
                        Task:expect.any(String),
                        Description:expect.any(String) || null
                    })
                })
            }
        })
    })
});



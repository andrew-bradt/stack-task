const request = require('supertest');
const app = require('./app');

const email = 'user999912199@gmail.com';
const password = 'user999129199';

describe('USER',()=>{
    it('Should Create A User',()=>{
               return request(app).post('/create-user').send({email, password})
        .then(res=>{
            expect(res.body).toEqual('User Created');
        });
    });
})
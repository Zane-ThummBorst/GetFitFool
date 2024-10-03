const request = require('supertest')
const app = require("../app")
const { describe, test, it } = require('@jest/globals')
const {MongoClient} = require("mongodb");
require("dotenv").config();
const client = new MongoClient("mongodb://127.0.0.1:27017/GDead", { monitorCommands: true })
client.connect()

describe("tests for creating a User", () =>{
    test("successfully creating a user", async() =>{
        const response = await request(app).post('/users/createUser')
            .send({username: "Peter Griffin", password:" SecurePassword123!", email: "pgriffin@gmail.com"})
        expect(response.status).toBe(200)
    })
    test("no request body sent", async() =>{
        const response = await request(app).post('/users/createUser')
        expect(response.status).toBe(400)
    })
    test("bad input (wrong type)", async() =>{
        const response = await request(app).post('/users/createUser')
            .send({username: null, password:" SecurePassword123!", email: "pgriffin@gmail.com"})
        expect(response.status).toBe(400)
    })
    test("bad username (too short)", async() =>{
        const response = await request(app).post('/users/createUser')
            .send({username: "Jay", password:" SecurePassword123!", email: "pgriffin@gmail.com"})
        expect(response.status).toBe(400)
    })
    test("bad email (not an email)", async() =>{
        const response = await request(app).post('/users/createUser')
            .send({username: "Peter Griffin", password:" SecurePassword123!", email: "pgriffin EEEHHH I STOP SHORT"})
        expect(response.status).toBe(400)
    })
    test("bad password (no special characters)", async() =>{
        const response = await request(app).post('/users/createUser')
            .send({username: "Peter Griffin", password:" SecurePassword123", email: "pgriffin@gmail.com"})
        expect(response.status).toBe(400)
    })

    describe("test getting user info", () =>{
        let token
        beforeAll(async() =>{
            const response = await request(app).post('/users/createUser')
                .send({username: 'peter griffin', password:" SecurePassword123!", email: "pgriffin@gmail.com"})
            token = response.body
        })
        test("successfully get user info", async() =>{
            const response = await request(app).post('/users/getUser')
                .set('Authorization', `Bearer ${token}`)
            expect(response._body.username).toBe('peter griffin')
        })

        test("request without token", async() =>{
            const response = await request(app).post('/users/getUser')
            expect(response.status).toBe(401)
        })
        test("test with invalid token", async() =>{
            const response = await request(app).post('/users/getUser')
                .set('Authorization', `Bearer ${'this is a fake token, do not let this slide'}`)
            expect(response.status).toBe(405)
        })
    })
})

describe('tests for updating user info', () =>{
    let token
    beforeAll(async() =>{
        const response = await request(app).post('/users/createUser')
            .send({username: 'peter griffin', password:" SecurePassword123!", email: "pgriffin@gmail.com"})
        token = response.body
    })

    test('successfully update user info', async() =>{
        const response = await request(app).post('/users/updateUser')
            .set('Authorization', `Bearer ${token}`)
            .send({username: 'peter griffin 2', password:" SecurePassword123!", email: "pgriffin2@gmail.com"})
        expect(response._body.username).toBe('peter griffin 2')
    })
    test('bad token', async() =>{
        const response = await request(app).post('/users/updateUser')
            .send({username: 'peter griffin 2', password:"SecurePassword123!!!!", email: "pgriffin2@gmail.com"})
            .set('Authorization', `Bearer ${'phony hehe token'}`)
        expect(response.status).toBe(405)
    })
    test('no token', async() =>{
        const response = await request(app).post('/users/updateUser')
        .send({username: 'peter griffin 2', password:"SecurePassword123!!!!", email: "pgriffin2@gmail.com"})
        expect(response.status).toBe(401)
    })
    test('bad input (username too short)', async() =>{
        const response = await request(app).post('/users/updateUser')
        .set('Authorization', `Bearer ${token}`)
            .send({username: 'p', password:" SecurePassword123!", email: "pgriffin2@gmail.com"})
        expect(response.status).toBe(400)
    })
    test('no request body', async() =>{
        const response = await request(app).post('/users/updateUser')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(400)
    })
})

describe('test deleting users', () =>{
    let token
    beforeAll(async() =>{
        const response = await request(app).post('/users/createUser')
            .send({username: 'peter griffin', password:" SecurePassword123!", email: "pgriffin@gmail.com"})
        token = response.body
    })

    test('do not send token', async() =>{
        const response = await request(app).delete('/users/deleteUser')
        expect(response.status).toBe(401)
    })
    test('send a malformed token', async() =>{
        const response = await request(app).delete('/users/deleteUser')
            .set('Authorization', `Bearer ${'Bird is the word'}`)
        expect(response.status).toBe(405)
    })
    test('successfully delete account', async() =>{
        const response = await request(app).delete('/users/deleteUser')
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
    test('delete after deletion', async() =>{
        const response = await request(app).delete('/users/deleteUser')
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(404)
    })
})

describe('test adding and removing likes and clones', () =>{
    let token
    beforeAll(async() =>{
        const response = await request(app).post('/users/createUser')
            .send({username: 'peter griffin', password:" SecurePassword123!", email: "pgriffin@gmail.com"})
        token = response.body
    })

    test('add to likes', async() =>{
        const response = await request(app).put('/users/LikesAndClones')
            .set('Authorization', `Bearer ${token}`)
            .send({routineId:'someRoutineId', operation: '$push', operationField: 'liked_routines'})
        expect(response._body.liked_routines.length).toBe(1)
    })
    test('remove from likes', async() =>{
        const response = await request(app).put('/users/LikesAndClones')
            .set('Authorization', `Bearer ${token}`)
            .send({routineId:'someRoutineId', operation: '$pull', operationField: 'liked_routines'})
        expect(response._body.liked_routines.length).toBe(0)
    })
    test('add to personal', async() =>{
        const response = await request(app).put('/users/LikesAndClones')
            .set('Authorization', `Bearer ${token}`)
            .send({routineId:'someRoutineId', operation: '$push', operationField: 'personal_routines'})
        expect(response._body.personal_routines.length).toBe(1)
    })
    test('remove from personal', async() =>{
        const response = await request(app).put('/users/LikesAndClones')
            .set('Authorization', `Bearer ${token}`)
            .send({routineId:'someRoutineId', operation: '$pull', operationField: 'personal_routines'})
        expect(response._body.personal_routines.length).toBe(0)
    })
    test('bad input (wrong type)', async() =>{
        const response = await request(app).put('/users/LikesAndClones')
            .set('Authorization', `Bearer ${token}`)
            .send({routineId:'someRoutineId', operation: '$pull', operationField: null})
        expect(response.status).toBe(400)
    })
    test('bad input (not in list of recognized values)', async() =>{
        const response = await request(app).put('/users/LikesAndClones')
        .set('Authorization', `Bearer ${token}`)
            .send({routineId:'someRoutineId', operation: '$pull', operationField: 'cloned_routines'})
        expect(response.status).toBe(400)
    })
    test( 'no request body', async() =>{
        const response = await request(app).put('/users/LikesAndClones')
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(400)
    })
})
